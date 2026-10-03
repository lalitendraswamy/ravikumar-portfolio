import type { Language } from './types';

const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

/** 1234567 -> ₹12,34,567 */
export function formatInr(amount: number): string {
    return inr.format(Math.round(amount));
}

/** 6129000 -> ₹61.3 L, 12500000 -> ₹1.25 Cr (same rule as the backend). */
export function formatLakhs(amount: number): string {
    if (amount >= 1_00_00_000) return `₹${(amount / 1_00_00_000).toFixed(2)} Cr`;
    return `₹${(amount / 1_00_000).toFixed(1)} L`;
}

/**
 * The backend appends a markdown price table + disclaimer to estimate replies. The UI
 * shows those as an estimate card instead, so keep only the prose before the table.
 */
export function stripEstimateTable(reply: string): string {
    const idx = reply.search(/^\|/m);
    return (idx === -1 ? reply : reply.slice(0, idx)).trim();
}

/** Plain text for speechSynthesis: no tables, links, markdown or long digit strings. */
export function toSpeechText(text: string): string {
    return stripEstimateTable(text)
        .replace(/https?:\/\/\S+/g, '')
        .replace(/[*_`#>|]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

export const SPEECH_LOCALES: Record<Language, string> = { en: 'en-IN', te: 'te-IN', hi: 'hi-IN' };

/** Valid backend thread id (^[A-Za-z0-9_-]{8,64}$). */
export function newThreadId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID().replace(/-/g, '');
    return `t${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
}
