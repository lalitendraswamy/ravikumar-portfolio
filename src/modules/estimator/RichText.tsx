import { Fragment, type ReactNode } from 'react';

/**
 * Renders the small markdown subset the agent produces: paragraphs, bullet lists,
 * pipe tables, **bold**, _italic_, [links](url) and bare URLs (e.g. WhatsApp links).
 * Everything is rendered as React text, never as raw HTML.
 */

const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^)\s]+\)|https?:\/\/[^\s)]+|(?<![\w])_[^_\n]+_(?![\w]))/g;

function inline(text: string): ReactNode[] {
    return text.split(INLINE).map((part, i) => {
        if (!part) return null;
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>;
        const md = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
        if (md) return <a key={i} href={md[2]} target="_blank" rel="noopener noreferrer">{md[1]}</a>;
        if (/^https?:\/\//.test(part)) {
            const label = part.includes('wa.me') ? 'Open WhatsApp' : part;
            return <a key={i} href={part} target="_blank" rel="noopener noreferrer">{label}</a>;
        }
        if (part.length > 2 && part.startsWith('_') && part.endsWith('_')) return <em key={i}>{part.slice(1, -1)}</em>;
        return <Fragment key={i}>{part}</Fragment>;
    });
}

const BULLET = /^\s*[-*•]\s+/;

const cells =(row: string) => row.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());

export default function RichText({ text }: { text: string }) {
    const blocks = text.trim().split(/\n{2,}/);
    return (
        <>
            {blocks.map((block, bi) => {
                const lines = block.split('\n');
                if (lines.every((l) => l.trim().startsWith('|'))) {
                    const rows = lines.filter((l) => !/^\s*\|?\s*:?-{2,}/.test(l));
                    const [head, ...body] = rows;
                    return (
                        <div key={bi} className="est-table-wrap">
                            <table className="est-md-table">
                                <thead>
                                    <tr>{cells(head).map((c, i) => <th key={i}>{inline(c)}</th>)}</tr>
                                </thead>
                                <tbody>
                                    {body.map((r, ri) => (
                                        <tr key={ri}>{cells(r).map((c, i) => <td key={i}>{inline(c)}</td>)}</tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                }
                // Group runs of bullet lines into lists; other lines stay as text with line breaks.
                const groups: { bullets: boolean; lines: string[] }[] = [];
                for (const l of lines) {
                    const bullets = BULLET.test(l);
                    const last = groups[groups.length - 1];
                    if (last && last.bullets === bullets) last.lines.push(l);
                    else groups.push({ bullets, lines: [l] });
                }
                return (
                    <Fragment key={bi}>
                        {groups.map((g, gi) =>
                            g.bullets ? (
                                <ul key={gi}>
                                    {g.lines.map((l, i) => <li key={i}>{inline(l.replace(BULLET, ''))}</li>)}
                                </ul>
                            ) : (
                                <p key={gi}>
                                    {g.lines.map((l, i) => (
                                        <Fragment key={i}>
                                            {i > 0 && <br />}
                                            {inline(l)}
                                        </Fragment>
                                    ))}
                                </p>
                            ),
                        )}
                    </Fragment>
                );
            })}
        </>
    );
}
