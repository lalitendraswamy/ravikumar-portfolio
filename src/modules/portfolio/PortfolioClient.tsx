'use client';

import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const showcaseItems = [
    {
        type: 'facebook' as const,
        iframeSrc:
            'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02o42VwxPvh2NwAJ1TGSpkeNcpVrtLADvi5GfzoeHBthRL1zonRo7VLHjmECfqq5nul%26id%3D100004208250749&show_text=true&width=500',
        category: 'Client Testimonial',
        title: 'Real Feedback, Real Results',
        description:
            'Our clients speak for themselves. This Facebook post highlights the satisfaction of one of our valued clients after the successful completion of their project — a testament to our commitment to quality, transparency, and timely delivery.',
    },
    {
        type: 'facebook' as const,
        iframeSrc: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0p6kNFrvnJ3VLT2dRXWKhiU1ANsnqHRDsaPFaX5nid6rAH4UoJTk1nNUdbjME3uYHl%26id%3D100004208250749&show_text=true&width=500',
        category: 'Client Appreciation',
        title: 'Trust Built Over Decades',
        description:
            'Every project we complete is a reflection of the trust our clients place in us. This heartfelt appreciation from a satisfied homeowner underscores our dedication to craftsmanship, Vaastu-aligned design, and seamless project management from start to finish.',
    },
    {
        type: 'facebook' as const,
        iframeSrc: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid036tgae2kk4YqmURb5uQjBWxT5bD5AqHexHFVrKCQQghUSkmwA8FRfmTe3NvAc3kCnl%26id%3D100004208250749&show_text=true&width=500',
        category: 'Project Milestone',
        title: 'A Milestone Worth Celebrating',
        description:
            'Another successful handover marks yet another chapter in our journey of excellence. From foundation to finishing, this project stands as a proud symbol of what happens when expertise, dedication, and client collaboration come together.',
    },
    {
        type: 'facebook' as const,
        iframeSrc: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid0iFsQrDdDQJaxkx3noQVeYKaHV8387rnGUCjq5VB1rZfbhLLuCiDUBENry6sVReEQl%26id%3D100004208250749&show_text=true&width=500',
        category: 'Happy Client',
        title: 'Smiles at Every Handover',
        description:
            'Nothing defines our success better than a happy client at the end of every project. This post captures the joy and satisfaction of a homeowner who experienced our end-to-end service — from Vaastu-aligned planning right through to the final handover.',
    },
    {
        type: 'facebook' as const,
        iframeSrc: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02iBHHsFPR9B2YKaTZfR1d1qfzHrGqtECnkaUpq3vaANMw4XpfdVsry8T8GEVfT3zDl%26id%3D100004208250749&show_text=true&width=500',
        category: 'Community Recognition',
        title: 'Recognised by Our Community',
        description:
            'Word of mouth is the greatest honour in our industry. This post reflects the community recognition we have earned through years of principled, transparent, and high-quality civil engineering and construction work across Andhra Pradesh.',
    },
    {
        type: 'facebook' as const,
        iframeSrc: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid06QjB1pys73tUeraS3dwG39cbUYXroMrGYk7TQmNoPQjfoeZ6kQcAkVUV2FugmKdol%26id%3D100004208250749&show_text=true&width=500',
        category: 'Personal Project',
        title: 'A Home Built with Love — For His Parents',
        description:
            "Some projects are close to the heart. Ravi Kumar designed and constructed this beautiful home in his parents\u2019 village — a personal labour of love that blends traditional aesthetics with modern structural standards, a timeless gift to the family that made him who he is.",
    },

];

const stats = [
    { number: '25+', label: 'Years of Experience' },
    { number: '50+', label: 'Projects Completed' },
    { number: '100%', label: 'Client Satisfaction' },
    { number: '4', label: 'Core Specialisations' },
];

const VISIBLE = 3;

export default function PortfolioClient() {
    const [startIndex, setStartIndex] = useState(0);
    const total = showcaseItems.length;

    const prev = () => setStartIndex((i) => (i - 1 + total) % total);
    const next = () => setStartIndex((i) => (i + 1) % total);

    // Build the 3 visible items (wrapping around)
    const visibleItems = Array.from({ length: VISIBLE }, (_, offset) =>
        showcaseItems[(startIndex + offset) % total]
    );

    return (
        <>
            {/* Page Hero */}
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-badge">Our Work</div>
                    <h1 className="page-hero-title">Portfolio</h1>
                    <p className="page-hero-subtitle">
                        A glimpse into our signature approach — where meticulous planning, structural integrity,
                        and timeless design principles converge.
                    </p>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="section" style={{ padding: '3rem 0' }}>
                <div className="container">
                    <div className="grid grid-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="stat-box">
                                <div className="stat-number">{stat.number}</div>
                                <div className="text-muted">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Showcase Carousel — 3 cards visible */}
            <section className="section bg-gradient">
                <div className="container">
                    <h2 className="section-title">Signature Approach</h2>
                    <p className="section-subtitle">
                        Showcasing the meticulous planning and structural design execution embedded in every
                        project we undertake.
                    </p>

                    {/* Outer wrapper holds arrows + track */}
                    <div style={{ position: 'relative', padding: '0 2.5rem' }}>
                        {/* Prev arrow */}
                        <button
                            onClick={prev}
                            aria-label="Previous slide"
                            style={{
                                position: 'absolute',
                                left: 0,
                                top: '45%',
                                transform: 'translateY(-50%)',
                                background: '#1c3a6e',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '50%',
                                width: '2.75rem',
                                height: '2.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 4px 14px rgba(28,58,110,0.35)',
                                transition: 'background 0.2s ease, transform 0.2s ease',
                                zIndex: 10,
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = '#2d55a0';
                                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = '#1c3a6e';
                                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1)';
                            }}
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {/* 3-card grid — same proportions as original grid */}
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '1.5rem',
                            }}
                        >
                            {visibleItems.map((item: any, idx) => (
                                <div
                                    key={`${startIndex}-${idx}`}
                                    className="glass-card"
                                    style={{ padding: 0, overflow: 'hidden' }}
                                >
                                    {/* Media */}
                                    {item.type === 'facebook' ? (
                                        <div
                                            style={{
                                                width: '100%',
                                                height: '220px',
                                                overflow: 'hidden',
                                                background: 'linear-gradient(135deg, #e8f0fe 0%, #f0f4ff 100%)',
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <iframe
                                                src={item.iframeSrc}
                                                width="340"
                                                height="507"
                                                style={{
                                                    border: 'none',
                                                    overflow: 'hidden',
                                                    transform: 'scale(0.65)',
                                                    transformOrigin: 'top center',
                                                    marginTop: '-8px',
                                                    pointerEvents: 'none',
                                                }}
                                                scrolling="no"
                                                frameBorder="0"
                                                allowFullScreen
                                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                            />
                                        </div>
                                    ) : (
                                        <img
                                            src={item.image}
                                            alt={item.alt}
                                            style={{
                                                width: '100%',
                                                height: '220px',
                                                objectFit: 'cover',
                                                display: 'block',
                                            }}
                                        />
                                    )}

                                    {/* Text */}
                                    <div style={{ padding: '1.75rem' }}>
                                        <span
                                            style={{
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                letterSpacing: '0.5px',
                                                textTransform: 'uppercase',
                                                color: '#1c3a6e',
                                                display: 'block',
                                                marginBottom: '0.5rem',
                                            }}
                                        >
                                            {item.category}
                                        </span>
                                        <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem' }}>
                                            {item.title}
                                        </h3>
                                        <p
                                            className="text-muted"
                                            style={{ fontSize: '0.95rem', lineHeight: 1.7 }}
                                        >
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Next arrow */}
                        <button
                            onClick={next}
                            aria-label="Next slide"
                            style={{
                                position: 'absolute',
                                right: 0,
                                top: '45%',
                                transform: 'translateY(-50%)',
                                background: '#1c3a6e',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '50%',
                                width: '2.75rem',
                                height: '2.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 4px 14px rgba(28,58,110,0.35)',
                                transition: 'background 0.2s ease, transform 0.2s ease',
                                zIndex: 10,
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = '#2d55a0';
                                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.background = '#1c3a6e';
                                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-50%) scale(1)';
                            }}
                        >
                            <ChevronRight size={20} />
                        </button>

                        {/* Dot indicators */}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                marginTop: '1.75rem',
                            }}
                        >
                            {showcaseItems.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setStartIndex(i)}
                                    aria-label={`Go to position ${i + 1}`}
                                    style={{
                                        width: i === startIndex ? '2rem' : '0.55rem',
                                        height: '0.55rem',
                                        borderRadius: '1rem',
                                        background: i === startIndex ? '#1c3a6e' : '#b0bcd4',
                                        border: 'none',
                                        cursor: 'pointer',
                                        transition: 'width 0.3s ease, background 0.3s ease',
                                        padding: 0,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Approach Section */}
            <section className="section">
                <div className="container">
                    <div className="about-wrapper">
                        <div className="about-image">
                            <img
                                src="/infrastructure_pmc.png"
                                alt="Ravi Kumar overseeing a civil engineering project"
                            />
                        </div>
                        <div className="about-content">
                            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', letterSpacing: '-0.5px' }}>
                                How We Approach Every Project
                            </h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.8 }}>
                                Every project begins with a thorough site visit, detailed client consultation, and a
                                structured scope definition. We believe that excellence on site starts with a
                                flawless plan on paper.
                            </p>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.8 }}>
                                Our process integrates structural design, locality regulations, client vision, and
                                — where applicable — traditional Vaastu principles into a cohesive, executable plan
                                that stands the test of time.
                            </p>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.8 }}>
                                The result? Projects that are delivered on time, within budget, and to a standard
                                our clients proudly recommend to others.
                            </p>
                            <Link href="/schedule-meeting" className="btn btn-primary">
                                Start Your Project <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
