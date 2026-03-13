import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Award, GraduationCap, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'About Ravi Kumar | Sadhguru Associates',
    description:
        'Learn about Ravi Kumar, a civil engineering expert with 25+ years of experience in Construction, PMC, Architectural Planning, and Vaastu Consultancy in Andhra Pradesh.',
    keywords:
        'Ravi Kumar civil engineer, Sadhguru Associates founder, PMC consultant Andhra Pradesh, civil engineer biography',
};

const credentials = [
    { icon: GraduationCap, label: 'AMICE – Associate Member, Institution of Civil Engineers' },
    { icon: GraduationCap, label: 'Diploma in Civil Engineering' },
    { icon: GraduationCap, label: 'M.Sc in Real Estate Valuation' },
];

const highlights = [
    'Progressed from Site Supervisor to Project Manager on large-scale infrastructure projects',
    'Proficient in Revit 2026 for construction documentation and site planning',
    'Deep expertise in structural design analysis, estimation, and quality assurance',
    'Integrates traditional Vaastu Shastra principles into contemporary architectural designs',
    'Extensive experience in Real Estate Valuation and advisory services',
    'Built Sadhguru Associates entirely on word-of-mouth and client trust',
];

export default function AboutPage() {
    return (
        <>
            {/* Page Hero */}
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-badge">Our Story</div>
                    <h1 className="page-hero-title">About Sadhguru Associates</h1>
                    <p className="page-hero-subtitle">
                        A two-decade journey from site supervisor to principal consultant — built entirely on
                        quality, integrity, and client trust.
                    </p>
                </div>
            </section>

            {/* Founder Section */}
            <section className="section">
                <div className="container">
                    <div className="about-wrapper">
                        <div className="about-image">
                            <img src="/ravikumar.png" alt="Ravi Kumar — Principal Consultant at Sadhguru Associates" />
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '2rem',
                                    right: '0rem',
                                    background: '#0b132b',
                                    color: '#f4f4f8',
                                    padding: '1.5rem',
                                    borderRadius: '12px',
                                    fontWeight: 'bold',
                                    fontSize: '1.5rem',
                                    boxShadow: '0 10px 30px rgba(11,19,43,0.35)',
                                }}
                            >
                                25+ Years
                                <div style={{ fontSize: '1rem', fontWeight: 'normal' }}>of Industry Experience</div>
                            </div>
                        </div>

                        <div className="about-content">
                            <h2 className="section-title" style={{ textAlign: 'left' }}>
                                About The Founder
                            </h2>
                            <p className="subtitle" style={{ textAlign: 'left' }}>
                                Ravi Kumar — Principal Consultant
                            </p>
                            <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                                Starting as a Site Supervisor, Ravi Kumar steadily climbed the ranks to Project
                                Manager by demonstrating relentless dedication to quality and precision on large-scale
                                infrastructure projects across India.
                            </p>
                            <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
                                Finding the corporate environment too restrictive for his vision of client-focused
                                excellence, he founded <strong>Sadhguru Associates</strong> to deliver deeply
                                personalised civil engineering, planning, PMC, and Vaastu services. The firm has
                                thrived purely on word-of-mouth — a testament to the quality of his work.
                            </p>

                            {/* Stats */}
                            <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '2rem' }}>
                                <div className="stat-box">
                                    <div className="stat-number">25+</div>
                                    <div className="text-muted">Years Experience</div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-number">50+</div>
                                    <div className="text-muted">Projects Completed</div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-number">100%</div>
                                    <div className="text-muted">Client Satisfaction</div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-number">4</div>
                                    <div className="text-muted">Core Services</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Credentials Section */}
            <section className="section bg-gradient">
                <div className="container">
                    <h2 className="section-title">Education &amp; Credentials</h2>
                    <p className="section-subtitle">
                        A strong academic foundation complementing decades of hands-on field expertise.
                    </p>
                    <div className="grid grid-3">
                        {credentials.map((cred) => (
                            <div key={cred.label} className="glass-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                                <div className="service-icon-wrapper" style={{ flexShrink: 0, marginBottom: 0 }}>
                                    <cred.icon size={24} />
                                </div>
                                <p style={{ fontWeight: 500, lineHeight: 1.5 }}>{cred.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Key Strengths */}
            <section className="section">
                <div className="container" style={{ maxWidth: '800px' }}>
                    <h2 className="section-title">What Sets Us Apart</h2>
                    <p className="section-subtitle">
                        A profile built on technical mastery, personal integrity, and genuine care for client
                        outcomes.
                    </p>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {highlights.map((point) => (
                            <li
                                key={point}
                                style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}
                            >
                                <CheckCircle size={20} style={{ color: '#1c3a6e', flexShrink: 0, marginTop: '2px' }} />
                                <span style={{ color: 'var(--text-muted)' }}>{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-gradient">
                <div className="container" style={{ textAlign: 'center' }}>
                    <Award size={40} style={{ color: '#1c3a6e', margin: '0 auto 1rem' }} />
                    <h2 className="section-title">Ready to Work Together?</h2>
                    <p className="section-subtitle">
                        Bring your project vision to life with 25+ years of civil engineering expertise behind
                        it.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/schedule-meeting" className="btn btn-primary">
                            Schedule a Meeting <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                        </Link>
                        <Link href="/services" className="btn btn-outline">
                            View Our Services
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
