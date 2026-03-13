import type { Metadata } from 'next';
import { Calendar, Phone, Mail, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Schedule a Meeting | Sadhguru Associates',
    description:
        'Book a free consultation meeting with Ravi Kumar — Principal Consultant at Sadhguru Associates. We serve clients across Andhra Pradesh for civil engineering, PMC, and Vaastu services.',
    keywords:
        'schedule civil engineer meeting, book Vaastu consultation, PMC consultant contact Andhra Pradesh, civil engineering appointment',
};

const steps = [
    { step: '01', title: 'Fill the Form', desc: 'Share your name, contact, and project details.' },
    { step: '02', title: 'Confirmation Call', desc: 'We confirm your appointment within 24 hours.' },
    { step: '03', title: 'Meet & Discuss', desc: 'Physical or virtual meeting to understand your vision.' },
    { step: '04', title: 'Proposal & Plan', desc: 'Receive a structured project proposal from us.' },
];

export default function ScheduleMeetingPage() {
    return (
        <>
            {/* Page Hero */}
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-badge">Get in Touch</div>
                    <h1 className="page-hero-title">Schedule a Meeting</h1>
                    <p className="page-hero-subtitle">
                        Book a free consultation with Ravi Kumar to discuss your civil engineering,
                        architectural, or Vaastu project requirements.
                    </p>
                </div>
            </section>

            {/* Process Steps */}
            <section className="section" style={{ padding: '4rem 0 2rem' }}>
                <div className="container">
                    <div className="grid grid-4">
                        {steps.map((s) => (
                            <div key={s.step} style={{ textAlign: 'center' }}>
                                <div
                                    style={{
                                        width: 56,
                                        height: 56,
                                        background: '#0b132b',
                                        color: '#f4f4f8',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontFamily: 'var(--font-heading)',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        margin: '0 auto 1rem',
                                    }}
                                >
                                    {s.step}
                                </div>
                                <h3 style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>{s.title}</h3>
                                <p className="text-muted" style={{ fontSize: '0.9rem' }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section bg-gradient">
                <div className="container">
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1.5fr',
                            gap: '3rem',
                            alignItems: 'start',
                        }}
                    >
                        {/* Contact Info */}
                        <div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', letterSpacing: '-0.5px' }}>
                                Let&apos;s Build Together
                            </h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.8 }}>
                                Whether you have an exciting new project or just want to explore possibilities,
                                Ravi Kumar is ready to listen and guide you with 25+ years of expertise.
                            </p>

                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div className="service-icon-wrapper" style={{ width: 44, height: 44, flexShrink: 0, marginBottom: 0 }}>
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>Phone</div>
                                        <div className="text-muted">+91 98856 95595</div>
                                    </div>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div className="service-icon-wrapper" style={{ width: 44, height: 44, flexShrink: 0, marginBottom: 0 }}>
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>Email</div>
                                        <div className="text-muted">rkkonna@gmail.com</div>
                                    </div>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div className="service-icon-wrapper" style={{ width: 44, height: 44, flexShrink: 0, marginBottom: 0 }}>
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>Location</div>
                                        <div className="text-muted">Andhra Pradesh, India</div>
                                    </div>
                                </li>
                                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div className="service-icon-wrapper" style={{ width: 44, height: 44, flexShrink: 0, marginBottom: 0 }}>
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>Working Hours</div>
                                        <div className="text-muted">Mon – Sat: 9:00 AM – 6:00 PM</div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form" style={{ margin: 0 }}>
                            <form action="#">
                                <div className="grid grid-2" style={{ gap: '1rem', marginBottom: 0 }}>
                                    <div className="input-group">
                                        <label className="input-label" htmlFor="fullName">Full Name *</label>
                                        <input id="fullName" type="text" className="input-field" placeholder="Your full name" required />
                                    </div>
                                    <div className="input-group">
                                        <label className="input-label" htmlFor="phone">Phone Number *</label>
                                        <input id="phone" type="tel" className="input-field" placeholder="+91 98856 95595" required />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label className="input-label" htmlFor="email">Email Address</label>
                                    <input id="email" type="email" className="input-field" placeholder="you@example.com" />
                                </div>
                                <div className="input-group">
                                    <label className="input-label" htmlFor="service">Service Required</label>
                                    <select id="service" className="input-field" style={{ appearance: 'none' }}>
                                        <option value="">Select a service...</option>
                                        <option value="pmc">Construction &amp; PMC</option>
                                        <option value="planning">Architectural Planning</option>
                                        <option value="vaastu">Vaastu Consultancy</option>
                                        <option value="valuation">Real Estate Valuation</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label className="input-label" htmlFor="meetingType">Preferred Meeting Type</label>
                                    <select id="meetingType" className="input-field" style={{ appearance: 'none' }}>
                                        <option value="physical">Physical Meeting</option>
                                        <option value="virtual">Virtual / Online Meeting</option>
                                        <option value="phone">Phone Call</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label className="input-label" htmlFor="details">Project Details *</label>
                                    <textarea
                                        id="details"
                                        className="input-field"
                                        placeholder="Tell us about your project — location, type of construction, timeline, etc."
                                        required
                                        style={{ minHeight: '140px' }}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                    <Calendar size={18} style={{ marginRight: '0.5rem' }} />
                                    Request Appointment
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
