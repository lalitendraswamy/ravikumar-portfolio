/**
 * Browser client for the Construction Estimator Agent API.
 *
 * `/chat` and `/chat/resume` are POST + Server-Sent Events, which EventSource cannot do,
 * so the stream is read with fetch and parsed here.
 */

import type { InputMode, Language, ThreadView, TurnEvent } from './types';

export const API_BASE = (process.env.NEXT_PUBLIC_ESTIMATOR_API_URL ?? 'http://localhost:8000/api/v1').replace(/\/$/, '');

export class ApiError extends Error {
    constructor(message: string, readonly status: number) {
        super(message);
    }
}

async function toApiError(res: Response): Promise<ApiError> {
    let message = `Request failed (${res.status})`;
    try {
        const body = await res.json();
        message = body.detail && typeof body.detail === 'string' ? body.detail : body.title ?? body.error ?? message;
    } catch {
        // non-JSON error body: keep the generic message
    }
    return new ApiError(message, res.status);
}

/** Yields each SSE event from a streaming response body. */
async function* readSse(res: Response): AsyncGenerator<TurnEvent> {
    const reader = res.body!.pipeThrough(new TextDecoderStream()).getReader();
    let buffer = '';
    while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += value.replace(/\r\n/g, '\n');
        let boundary;
        while ((boundary = buffer.indexOf('\n\n')) !== -1) {
            const raw = buffer.slice(0, boundary);
            buffer = buffer.slice(boundary + 2);
            let event = 'message';
            const data: string[] = [];
            for (const line of raw.split('\n')) {
                if (line.startsWith('event:')) event = line.slice(6).trim();
                else if (line.startsWith('data:')) data.push(line.slice(5).trimStart());
            }
            if (!data.length) continue; // keep-alive comment
            yield { event, data: JSON.parse(data.join('\n')) } as TurnEvent;
        }
    }
}

async function* post(path: string, body: unknown, signal?: AbortSignal): AsyncGenerator<TurnEvent> {
    const res = await fetch(`${API_BASE}${path}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'text/event-stream' },
        body: JSON.stringify(body),
        signal,
    });
    if (!res.ok) throw await toApiError(res);
    yield* readSse(res);
}

export function streamChat(
    args: { threadId: string; message: string; inputMode: InputMode; language: Language | null },
    signal?: AbortSignal,
) {
    return post(
        '/chat',
        { thread_id: args.threadId, message: args.message, input_mode: args.inputMode, language: args.language },
        signal,
    );
}

/** Answers a pending interrupt (e.g. a Yes/No confirmation) explicitly. */
export function streamResume(threadId: string, value: unknown, signal?: AbortSignal) {
    return post('/chat/resume', { thread_id: threadId, value }, signal);
}

/** Checkpointed thread state, or null when the thread does not exist yet. */
export async function getThread(threadId: string): Promise<ThreadView | null> {
    const res = await fetch(`${API_BASE}/threads/${threadId}`);
    if (res.status === 404) return null;
    if (!res.ok) throw await toApiError(res);
    return res.json();
}
