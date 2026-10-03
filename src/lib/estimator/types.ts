/**
 * Wire types for the Construction Estimator Agent API (`/api/v1`).
 * Mirrors the backend's domain models and SSE events.
 */

export type Language = 'en' | 'te' | 'hi';
export type InputMode = 'text' | 'voice';
export type Intent = 'estimate' | 'question' | 'modify' | 'contact' | 'chit_chat' | 'off_topic';
export type QualityTier = 'basic' | 'standard' | 'premium';

export interface LineItem {
    code: string;
    label: string;
    amount_inr: number;
    quantity: number | null;
    unit: string | null;
}

export interface Estimate {
    city: string;
    tier: QualityTier;
    built_up_area_sqft: number;
    line_items: LineItem[];
    construction_cost_inr: number;
    approval_fees_inr: number;
    extras_inr: number;
    contingency_inr: number;
    total_inr: number;
    range_low_inr: number;
    range_high_inr: number;
    cost_per_sqft_inr: number;
    rates_source: string;
    approval_authority: string | null;
    validation_flag: string | null;
    summary: string | null;
    disclaimer: string;
}

export interface ProjectSpec {
    project_type: string | null;
    location: string | null;
    plot_area_sqft: number | null;
    built_up_area_sqft: number | null;
    floors: number | null;
    tier: QualityTier | null;
    timeline_months: number | null;
    budget_ceiling_inr: number | null;
    extras: string[];
}

export interface Lead {
    name: string | null;
    phone: string | null;
    channel: string | null;
    preferred_slot: string | null;
    booking_id: string | null;
    owner_notified: boolean;
}

export type Interrupt =
    | { type: 'ask_user'; question: string; missing_fields: string[]; language: Language }
    | { type: 'confirm_action'; action: string; details: Record<string, unknown>; language: Language }
    | { type: 'owner_approval'; message: string; language: Language };

export interface FinalPayload {
    thread_id: string;
    reply: string;
    language: Language;
    intent: Intent | null;
    estimate: Estimate | null;
    sources: string[];
    audio_url: string | null;
}

export type TurnEvent =
    | { event: 'progress'; data: { stage: string; label: string } }
    | { event: 'token'; data: { text: string } }
    | { event: 'interrupt'; data: Interrupt & { thread_id: string } }
    | { event: 'final'; data: FinalPayload }
    | { event: 'error'; data: { title: string; detail?: string } };

export interface ThreadView {
    thread_id: string;
    language: Language;
    spec: ProjectSpec | null;
    missing_fields: string[];
    estimate: Estimate | null;
    variants: Estimate[];
    approval: string | null;
    lead: Lead | null;
    messages: { role: 'user' | 'assistant'; content: string }[];
    pending: Interrupt | null;
}
