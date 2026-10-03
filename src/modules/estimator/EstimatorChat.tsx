'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import Link from 'next/link';
import { Bot, CalendarCheck, Check, Circle, Loader2, Mic, RotateCcw, Send, ShieldCheck, Square, Volume2, VolumeX } from 'lucide-react';
import { ApiError, getThread, streamChat, streamResume } from '@/lib/estimator/client';
import { formatLakhs, newThreadId, stripEstimateTable } from '@/lib/estimator/format';
import { COPY, LANGUAGE_OPTIONS, QUICK_REPLIES, TIER_LABELS, type Copy } from '@/lib/estimator/i18n';
import type { Estimate, InputMode, Interrupt, Language, ThreadView, TurnEvent } from '@/lib/estimator/types';
import EstimateCard from './EstimateCard';
import RichText from './RichText';
import { useSpeech } from './useSpeech';
import '../../styles/estimator.css';

const THREAD_KEY = 'estimator.thread_id';

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    text: string;
    mode?: InputMode;
    estimate?: Estimate | null;
    sources?: string[];
    interrupt?: Interrupt;
}

type LanguageChoice = Language | 'auto';

const msgId = () => Math.random().toString(36).slice(2);

export default function EstimatorChat() {
    const threadIdRef = useRef('');
    const abortRef = useRef<AbortController | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const lastModeRef = useRef<InputMode>('text');

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [draft, setDraft] = useState('');
    const [busy, setBusy] = useState(false);
    const [progress, setProgress] = useState('');
    const [streamText, setStreamText] = useState('');
    const [pending, setPending] = useState<Interrupt | null>(null);
    const [thread, setThread] = useState<ThreadView | null>(null);
    const [choice, setChoice] = useState<LanguageChoice>('auto');
    const [conversationLang, setConversationLang] = useState<Language>('en');
    const [speakReplies, setSpeakReplies] = useState(false);
    const [error, setError] = useState<{ message: string; retry?: () => void } | null>(null);

    const uiLang: Language = choice === 'auto' ? conversationLang : choice;
    const copy: Copy = COPY[uiLang];

    const refreshThread = useCallback(async () => {
        try {
            setThread(await getThread(threadIdRef.current));
        } catch {
            // the side panel is a nice-to-have; the chat keeps working without it
        }
    }, []);

    // Restore the visitor's conversation (the backend checkpointer keeps it per thread_id).
    useEffect(() => {
        let id = '';
        try {
            id = localStorage.getItem(THREAD_KEY) ?? '';
        } catch {
            // storage blocked: run with a fresh, unsaved thread
        }
        if (!id) {
            id = newThreadId();
            try {
                localStorage.setItem(THREAD_KEY, id);
            } catch {}
            threadIdRef.current = id;
            return;
        }
        threadIdRef.current = id;
        getThread(id)
            .then((view) => {
                if (!view) return;
                setThread(view);
                setConversationLang(view.language);
                setPending(view.pending);
                const restored: ChatMessage[] = view.messages.map((m) => ({ id: msgId(), role: m.role, text: m.content }));
                // Show the latest estimate as a card again instead of its markdown table.
                const lastTable = restored.findLastIndex((m) => m.role === 'assistant' && /^\|/m.test(m.text));
                if (view.estimate && lastTable !== -1) {
                    const m = restored[lastTable];
                    restored[lastTable] = { ...m, text: stripEstimateTable(m.text), estimate: view.estimate };
                }
                setMessages(restored);
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }, [messages, streamText, progress]);

    const speech = useSpeech((transcript) => send(transcript, { mode: 'voice' }));

    const runTurn = useCallback(
        async (start: (signal: AbortSignal) => AsyncGenerator<TurnEvent>, retry: () => void) => {
            abortRef.current?.abort();
            const controller = new AbortController();
            abortRef.current = controller;
            setBusy(true);
            setError(null);
            setProgress(COPY[uiLang].thinking);
            setStreamText('');
            try {
                for await (const ev of start(controller.signal)) {
                    if (ev.event === 'progress') {
                        setProgress(ev.data.label);
                    } else if (ev.event === 'token') {
                        // The last token repeats the whole reply: replace instead of appending.
                        const text = ev.data.text;
                        setStreamText((prev) => (prev && text.startsWith(prev) ? text : prev + text));
                    } else if (ev.event === 'interrupt') {
                        const { thread_id: _ignored, ...interrupt } = ev.data;
                        void _ignored;
                        setConversationLang(interrupt.language);
                        setPending(interrupt);
                        const text =
                            interrupt.type === 'ask_user' ? interrupt.question : interrupt.type === 'owner_approval' ? interrupt.message : '';
                        setMessages((m) => [...m, { id: msgId(), role: 'assistant', text, interrupt }]);
                        if (text && (speakReplies || lastModeRef.current === 'voice')) speech.speak(text, interrupt.language);
                    } else if (ev.event === 'final') {
                        const { reply, estimate, sources, language } = ev.data;
                        setConversationLang(language);
                        setPending(null);
                        setMessages((m) => [
                            ...m,
                            { id: msgId(), role: 'assistant', text: estimate ? stripEstimateTable(reply) : reply, estimate, sources },
                        ]);
                        if (speakReplies || lastModeRef.current === 'voice') speech.speak(reply, language);
                    } else if (ev.event === 'error') {
                        setError({ message: ev.data.detail ?? ev.data.title, retry });
                    }
                }
            } catch (err) {
                if (controller.signal.aborted) return;
                const message =
                    err instanceof ApiError
                        ? err.status === 429
                            ? 'Too many messages in a short time. Please wait a minute and try again.'
                            : err.message
                        : COPY[uiLang].offline;
                setError({ message, retry });
            } finally {
                if (abortRef.current === controller) {
                    setBusy(false);
                    setProgress('');
                    setStreamText('');
                    void refreshThread();
                }
            }
        },
        [uiLang, speakReplies, speech, refreshThread],
    );

    function send(text: string, opts: { mode?: InputMode; forceLanguage?: Language; display?: string } = {}) {
        const message = text.trim();
        if (!message || busy) return;
        const mode = opts.mode ?? 'text';
        lastModeRef.current = mode;
        speech.cancelSpeech();
        setDraft('');
        setMessages((m) => [...m, { id: msgId(), role: 'user', text: opts.display ?? message, mode }]);
        const language = choice === 'auto' ? (opts.forceLanguage ?? null) : choice;
        const start = (signal: AbortSignal) =>
            streamChat({ threadId: threadIdRef.current, message, inputMode: mode, language }, signal);
        void runTurn(start, () => void runTurn(start, () => {}));
    }

    function confirm(yes: boolean) {
        if (busy) return;
        lastModeRef.current = 'text';
        setMessages((m) => [...m, { id: msgId(), role: 'user', text: yes ? copy.yes : copy.no }]);
        const start = (signal: AbortSignal) => streamResume(threadIdRef.current, yes ? 'yes' : 'no', signal);
        void runTurn(start, () => void runTurn(start, () => {}));
    }

    function newConversation() {
        abortRef.current?.abort();
        speech.cancelSpeech();
        const id = newThreadId();
        threadIdRef.current = id;
        try {
            localStorage.setItem(THREAD_KEY, id);
        } catch {}
        setMessages([]);
        setPending(null);
        setThread(null);
        setError(null);
        setBusy(false);
        setProgress('');
        setStreamText('');
    }

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        send(draft);
    }

    function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            send(draft);
        }
    }

    function toggleMic() {
        if (speech.listening) speech.stop();
        else if (speech.supported) speech.start(uiLang);
        else setError({ message: copy.micUnsupported });
    }

    // The agent asks about the first two missing fields; offer chips only for those.
    const quickReplyFields =
        pending?.type === 'ask_user' ? pending.missing_fields.slice(0, 2).filter((f) => QUICK_REPLIES[f]) : [];
    const lastEstimateId = [...messages].reverse().find((m) => m.estimate)?.id;

    return (
        <div className="est-layout">
            <section className="est-chat" aria-label="Construction cost estimator chat">
                <div className="est-toolbar">
                    <div className="est-agent">
                        <span className="est-avatar"><Bot size={18} /></span>
                        <div>
                            <div className="est-agent-name">Sadhguru Estimator</div>
                            <div className="est-agent-status">
                                <span className={`est-dot${busy ? ' est-dot-busy' : ''}`} /> {busy ? progress || copy.thinking : 'Online'}
                            </div>
                        </div>
                    </div>
                    <div className="est-toolbar-actions">
                        <label className="est-select-label">
                            <span className="est-visually-hidden">{copy.replyLanguage}</span>
                            <select
                                className="est-select"
                                value={choice}
                                onChange={(e) => setChoice(e.target.value as LanguageChoice)}
                                aria-label={copy.replyLanguage}
                            >
                                {LANGUAGE_OPTIONS.map((o) => (
                                    <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                            </select>
                        </label>
                        <button
                            type="button"
                            className={`est-icon-btn${speakReplies ? ' est-icon-btn-on' : ''}`}
                            onClick={() => {
                                if (speakReplies) speech.cancelSpeech();
                                setSpeakReplies((v) => !v);
                            }}
                            aria-pressed={speakReplies}
                            title={speakReplies ? copy.speakerOff : copy.speakerOn}
                            aria-label={speakReplies ? copy.speakerOff : copy.speakerOn}
                        >
                            {speakReplies ? <Volume2 size={18} /> : <VolumeX size={18} />}
                        </button>
                        <button type="button" className="est-icon-btn" onClick={newConversation} title={copy.newChat} aria-label={copy.newChat}>
                            <RotateCcw size={18} />
                        </button>
                    </div>
                </div>

                <div className="est-messages" ref={scrollRef} aria-live="polite">
                    <div className="est-msg est-msg-assistant">
                        <div className="est-bubble"><p>{copy.greeting}</p></div>
                    </div>

                    {messages.length === 0 && (
                        <div className="est-starters">
                            {copy.starters.map((s) => (
                                <button key={s} type="button" className="est-chip" onClick={() => send(s)}>{s}</button>
                            ))}
                        </div>
                    )}

                    {messages.map((m) => (
                        <div key={m.id} className={`est-msg est-msg-${m.role}`}>
                            {m.interrupt?.type === 'confirm_action' ? (
                                <ConfirmCard
                                    interrupt={m.interrupt}
                                    copy={copy}
                                    active={pending?.type === 'confirm_action' && m === messages[messages.length - 1] && !busy}
                                    onConfirm={confirm}
                                />
                            ) : m.interrupt?.type === 'owner_approval' ? (
                                <div className="est-bubble est-review"><ShieldCheck size={18} /> <span><strong>{copy.underReview}</strong><br />{m.text}</span></div>
                            ) : (
                                m.text && (
                                    <div className="est-bubble">
                                        {m.role === 'user' ? <p>{m.text}</p> : <RichText text={m.text} />}
                                        {m.mode === 'voice' && <span className="est-voice-tag"><Mic size={11} /> {copy.voiceSent}</span>}
                                        {m.sources && m.sources.length > 0 && (
                                            <div className="est-sources">
                                                {copy.sources}: {m.sources.map((s) => <span key={s} className="est-source">{s.replace(/\.md$/, '').replace(/_/g, ' ')}</span>)}
                                            </div>
                                        )}
                                    </div>
                                )
                            )}
                            {m.estimate && (
                                <EstimateCard
                                    estimate={m.estimate}
                                    language={uiLang}
                                    copy={copy}
                                    disabled={busy || m.id !== lastEstimateId}
                                    onAsk={(text) => send(text)}
                                />
                            )}
                        </div>
                    ))}

                    {busy && (
                        <div className="est-msg est-msg-assistant">
                            <div className="est-bubble">
                                {streamText ? (
                                    <RichText text={stripEstimateTable(streamText)} />
                                ) : (
                                    <p className="est-progress"><Loader2 size={16} className="est-spin" /> {progress || copy.thinking}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="est-error" role="alert">
                            <span>{error.message}</span>
                            {error.retry && (
                                <button type="button" className="est-chip" onClick={error.retry} disabled={busy}>{copy.retry}</button>
                            )}
                        </div>
                    )}
                </div>

                {quickReplyFields.length > 0 && !busy && (
                    <div className="est-quick" aria-label={copy.quickReplies}>
                        {quickReplyFields.flatMap((field) =>
                            QUICK_REPLIES[field].map((q) => (
                                <button
                                    key={`${field}-${q.value}`}
                                    type="button"
                                    className="est-chip"
                                    onClick={() => send(q.value, { forceLanguage: conversationLang, display: q.label[uiLang] })}
                                >
                                    {q.label[uiLang]}
                                </button>
                            )),
                        )}
                    </div>
                )}

                <form className="est-composer" onSubmit={onSubmit}>
                    <button
                        type="button"
                        className={`est-mic${speech.listening ? ' est-mic-on' : ''}`}
                        onClick={toggleMic}
                        disabled={busy}
                        aria-pressed={speech.listening}
                        aria-label={speech.listening ? copy.micStop : copy.micStart}
                        title={speech.listening ? copy.micStop : copy.micStart}
                    >
                        {speech.listening ? <Square size={16} /> : <Mic size={18} />}
                    </button>
                    <textarea
                        className="est-input"
                        rows={1}
                        value={speech.listening ? speech.interim || copy.listening : draft}
                        onChange={(e) => setDraft(e.target.value)}
                        onKeyDown={onKeyDown}
                        placeholder={copy.placeholder}
                        readOnly={speech.listening}
                        maxLength={2000}
                        aria-label={copy.placeholder}
                    />
                    <button type="submit" className="est-send" disabled={busy || !draft.trim() || speech.listening} aria-label={copy.send}>
                        <Send size={17} />
                    </button>
                </form>
            </section>

            <ProjectPanel thread={thread} copy={copy} language={uiLang} />
        </div>
    );
}

function ConfirmCard({
    interrupt,
    copy,
    active,
    onConfirm,
}: {
    interrupt: Extract<Interrupt, { type: 'confirm_action' }>;
    copy: Copy;
    active: boolean;
    onConfirm: (yes: boolean) => void;
}) {
    const details = Object.entries(interrupt.details).filter(([, v]) => v !== '' && v != null);
    const show = (k: string, v: unknown) => {
        if (k === 'slot' && typeof v === 'string') {
            const d = new Date(v);
            if (!Number.isNaN(d.getTime())) return d.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
        }
        if (k === 'phone') return `+${v}`;
        return String(v);
    };
    return (
        <div className="est-confirm">
            <div className="est-confirm-title"><CalendarCheck size={17} /> {copy.confirmTitle[interrupt.action] ?? copy.confirmFallback}</div>
            <dl>
                {details.map(([k, v]) => (
                    <div key={k}>
                        <dt>{k.replace(/_/g, ' ')}</dt>
                        <dd className="est-capitalize">{show(k, v)}</dd>
                    </div>
                ))}
            </dl>
            {active && (
                <div className="est-confirm-actions">
                    <button type="button" className="btn btn-primary est-btn" onClick={() => onConfirm(true)}>{copy.yes}</button>
                    <button type="button" className="btn btn-outline est-btn" onClick={() => onConfirm(false)}>{copy.no}</button>
                </div>
            )}
        </div>
    );
}

function ProjectPanel({ thread, copy, language }: { thread: ThreadView | null; copy: Copy; language: Language }) {
    const spec = thread?.spec;
    const missing = new Set(thread?.missing_fields ?? []);
    const floors = spec?.floors ? (spec.floors === 1 ? 'G' : `G+${spec.floors - 1}`) : null;
    const plot = spec?.plot_area_sqft
        ? `${Math.round(spec.plot_area_sqft).toLocaleString('en-IN')} sq ft (${Math.round(spec.plot_area_sqft / 9)} sq yd)`
        : spec?.built_up_area_sqft
          ? `${Math.round(spec.built_up_area_sqft).toLocaleString('en-IN')} sq ft built-up`
          : null;
    const rows: { key: string; value: string | null }[] = [
        { key: 'project_type', value: spec?.project_type?.replace(/_/g, ' ') ?? null },
        { key: 'location', value: spec?.location ?? null },
        { key: 'plot_area', value: plot },
        { key: 'floors', value: floors },
        { key: 'tier', value: spec?.tier ? (TIER_LABELS[spec.tier]?.[language] ?? spec.tier) : null },
    ];
    const lead = thread?.lead;
    const earlier = (thread?.variants ?? []).slice(-3);

    return (
        <aside className="est-panel" aria-label={copy.projectTitle}>
            <h3>{copy.projectTitle}</h3>
            {!spec && <p className="est-panel-empty">{copy.projectEmpty}</p>}
            <ul className="est-spec">
                {rows.map((r) => {
                    const done = Boolean(r.value) && !missing.has(r.key);
                    return (
                        <li key={r.key} className={done ? 'est-spec-done' : ''}>
                            {done ? <Check size={15} /> : <Circle size={15} />}
                            <span className="est-spec-name">{copy.fields[r.key]}</span>
                            <span className="est-spec-value est-capitalize">{r.value ?? '—'}</span>
                        </li>
                    );
                })}
            </ul>

            {thread?.estimate && (
                <div className="est-panel-total">
                    <span>{copy.total}</span>
                    <strong>{formatLakhs(thread.estimate.total_inr)}</strong>
                </div>
            )}

            {earlier.length > 0 && (
                <div className="est-panel-block">
                    <div className="est-label">{copy.previousEstimates}</div>
                    <ul className="est-variants">
                        {earlier.map((v, i) => (
                            <li key={i}>
                                <span>{TIER_LABELS[v.tier]?.[language] ?? v.tier} · {Math.round(v.built_up_area_sqft).toLocaleString('en-IN')} sq ft</span>
                                <strong>{formatLakhs(v.total_inr)}</strong>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {lead && (lead.booking_id || lead.owner_notified) && (
                <div className="est-panel-block est-lead">
                    <Check size={15} /> {lead.booking_id ? copy.leadBooked : copy.leadNotified}
                </div>
            )}

            <Link href="/schedule-meeting" className="btn btn-outline est-btn est-panel-cta">
                <CalendarCheck size={16} /> {copy.talkToOwner}
            </Link>
        </aside>
    );
}
