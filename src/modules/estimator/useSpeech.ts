'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SPEECH_LOCALES, toSpeechText } from '@/lib/estimator/format';
import type { Language } from '@/lib/estimator/types';

/* Minimal typings: the Web Speech recognition API is not in lib.dom yet. */
interface RecognitionResultEvent {
    resultIndex: number;
    results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
}
interface Recognition {
    lang: string;
    interimResults: boolean;
    continuous: boolean;
    onresult: ((e: RecognitionResultEvent) => void) | null;
    onend: (() => void) | null;
    onerror: ((e: { error: string }) => void) | null;
    start(): void;
    stop(): void;
}
type RecognitionCtor = new () => Recognition;

function recognitionCtor(): RecognitionCtor | null {
    if (typeof window === 'undefined') return null;
    const w = window as unknown as { SpeechRecognition?: RecognitionCtor; webkitSpeechRecognition?: RecognitionCtor };
    return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/**
 * Browser speech-to-text (voice in) and text-to-speech (voice out), per PRD F9.
 * `onFinal` receives the full transcript when the user stops talking.
 */
export function useSpeech(onFinal: (transcript: string) => void) {
    const [listening, setListening] = useState(false);
    const [interim, setInterim] = useState('');
    const [supported, setSupported] = useState(false);
    const recognitionRef = useRef<Recognition | null>(null);
    const transcriptRef = useRef('');
    const onFinalRef = useRef(onFinal);

    useEffect(() => {
        onFinalRef.current = onFinal;
    }, [onFinal]);

    useEffect(() => {
        // Feature detection must wait for the browser; the server render has no window.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSupported(recognitionCtor() !== null);
        return () => {
            recognitionRef.current?.stop();
            window.speechSynthesis?.cancel();
        };
    }, []);

    const start = useCallback((language: Language) => {
        const Ctor = recognitionCtor();
        if (!Ctor) return;
        window.speechSynthesis?.cancel();
        const rec = new Ctor();
        rec.lang = SPEECH_LOCALES[language];
        rec.interimResults = true;
        rec.continuous = false;
        transcriptRef.current = '';
        rec.onresult = (e) => {
            let finalText = '';
            let interimText = '';
            for (let i = 0; i < e.results.length; i++) {
                const r = e.results[i];
                if (r.isFinal) finalText += r[0].transcript;
                else interimText += r[0].transcript;
            }
            transcriptRef.current = finalText || transcriptRef.current;
            setInterim(finalText || interimText);
        };
        rec.onerror = () => setListening(false);
        rec.onend = () => {
            setListening(false);
            setInterim('');
            const text = transcriptRef.current.trim();
            if (text) onFinalRef.current(text);
        };
        recognitionRef.current = rec;
        rec.start();
        setListening(true);
    }, []);

    const stop = useCallback(() => recognitionRef.current?.stop(), []);

    const speak = useCallback((text: string, language: Language) => {
        const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined;
        const spoken = toSpeechText(text);
        if (!synth || !spoken) return;
        synth.cancel();
        const utterance = new SpeechSynthesisUtterance(spoken);
        const locale = SPEECH_LOCALES[language];
        utterance.lang = locale;
        const voice =
            synth.getVoices().find((v) => v.lang === locale) ??
            synth.getVoices().find((v) => v.lang.startsWith(locale.slice(0, 2)));
        if (voice) utterance.voice = voice;
        synth.speak(utterance);
    }, []);

    const cancelSpeech = useCallback(() => window.speechSynthesis?.cancel(), []);

    return { supported, listening, interim, start, stop, speak, cancelSpeech };
}
