'use client';

import { AlertTriangle, MessageCircle, Phone, Scale } from 'lucide-react';
import { formatInr, formatLakhs } from '@/lib/estimator/format';
import { TIER_LABELS, type Copy } from '@/lib/estimator/i18n';
import type { Estimate, Language } from '@/lib/estimator/types';

const OWNER_WHATSAPP = '919885695595'; // same number as the floating WhatsApp button

interface Props {
    estimate: Estimate;
    language: Language;
    copy: Copy;
    disabled: boolean;
    onAsk: (message: string) => void;
}

export default function EstimateCard({ estimate, language, copy, disabled, onAsk }: Props) {
    const rows = [
        ...estimate.line_items.map((li) => ({ key: li.code, label: li.label, amount: li.amount_inr, qty: li.quantity, unit: li.unit })),
        { key: 'approvals', label: `${copy.approvals}${estimate.approval_authority ? ` (${estimate.approval_authority})` : ''}`, amount: estimate.approval_fees_inr, qty: null, unit: null },
        { key: 'extras', label: copy.extras, amount: estimate.extras_inr, qty: null, unit: null },
        { key: 'contingency', label: copy.contingency, amount: estimate.contingency_inr, qty: null, unit: null },
    ]
        .filter((r) => r.amount > 0)
        .sort((a, b) => b.amount - a.amount);
    const max = rows[0]?.amount ?? 1;
    const otherTiers = (['basic', 'standard', 'premium'] as const).filter((t) => t !== estimate.tier);
    const tierLabel = (t: string) => TIER_LABELS[t]?.[language] ?? t;

    const whatsappText =
        `Hello Ravi garu, I used the Construction Estimater on your website.\n` +
        `Estimate: ${formatLakhs(estimate.total_inr)} (${formatLakhs(estimate.range_low_inr)} – ${formatLakhs(estimate.range_high_inr)}), ` +
        `${Math.round(estimate.built_up_area_sqft)} sq ft built-up, ${estimate.tier} tier, ${estimate.city}.\n` +
        `I'd like to discuss this project.`;

    return (
        <article className="est-card" aria-label={copy.estimateTitle}>
            <header className="est-card-head">
                <span className="est-card-eyebrow">{copy.estimateTitle}</span>
                <div className="est-card-meta">
                    <span>{tierLabel(estimate.tier)} {copy.tier}</span>
                    <span>{Math.round(estimate.built_up_area_sqft).toLocaleString('en-IN')} sq ft {copy.builtUp}</span>
                    <span className="est-capitalize">{estimate.city}</span>
                </div>
            </header>

            <div className="est-card-total">
                <div>
                    <div className="est-label">{copy.total}</div>
                    <div className="est-total">{formatLakhs(estimate.total_inr)}</div>
                    <div className="est-sub">{formatInr(estimate.total_inr)}</div>
                </div>
                <div className="est-card-stats">
                    <div>
                        <div className="est-label">{copy.range}</div>
                        <div className="est-stat">{formatLakhs(estimate.range_low_inr)} – {formatLakhs(estimate.range_high_inr)}</div>
                    </div>
                    <div>
                        <div className="est-label">{copy.perSqft}</div>
                        <div className="est-stat">{formatInr(estimate.cost_per_sqft_inr)}</div>
                    </div>
                </div>
            </div>

            <div className="est-label est-breakdown-title">{copy.breakdown}</div>
            <ul className="est-breakdown">
                {rows.map((r) => (
                    <li key={r.key}>
                        <div className="est-breakdown-row">
                            <span>
                                {r.label}
                                {r.qty ? <span className="est-qty"> · {Math.round(r.qty).toLocaleString('en-IN')} {r.unit}</span> : null}
                            </span>
                            <span className="est-amount">{formatInr(r.amount)}</span>
                        </div>
                        <div className="est-bar" aria-hidden="true">
                            <span style={{ width: `${Math.max(2, (r.amount / max) * 100)}%` }} />
                        </div>
                    </li>
                ))}
            </ul>

            {estimate.rates_source === 'placeholder' && (
                <p className="est-notice"><AlertTriangle size={15} /> {copy.sampleRates}</p>
            )}
            {estimate.validation_flag && (
                <p className="est-notice est-notice-warn"><AlertTriangle size={15} /> {copy.validationFlag}</p>
            )}
            <p className="est-disclaimer">{language === 'en' ? estimate.disclaimer : copy.disclaimer}</p>

            <div className="est-card-actions">
                <button type="button" className="btn btn-primary est-btn" disabled={disabled} onClick={() => onAsk(copy.talkToOwnerMessage)}>
                    <Phone size={16} /> {copy.talkToOwner}
                </button>
                <a
                    className="btn btn-outline est-btn"
                    href={`https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(whatsappText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <MessageCircle size={16} /> {copy.shareWhatsApp}
                </a>
                {otherTiers.map((t) => (
                    <button
                        key={t}
                        type="button"
                        className="est-chip"
                        disabled={disabled}
                        onClick={() => onAsk(copy.compareMessage(tierLabel(t)))}
                    >
                        <Scale size={14} /> {copy.compare(tierLabel(t))}
                    </button>
                ))}
            </div>
        </article>
    );
}
