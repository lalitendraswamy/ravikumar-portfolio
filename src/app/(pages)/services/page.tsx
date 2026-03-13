import type { Metadata } from 'next';
import Link from 'next/link';
import { Compass, HardHat, ClipboardList, FileCheck, Building2, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Our Services | Sadhguru Associates',
    description:
        'Expert civil engineering services including Architectural Planning, Structural Designs, PMC Services, GVMC & VUDA Approvals, and Constructions & Development across Andhra Pradesh.',
    keywords:
        'architectural planning Andhra Pradesh, structural designs, PMC services, GVMC approvals, VUDA approvals, construction development Andhra Pradesh',
};

const services = [
    {
        id: 'planning',
        icon: Compass,
        title: 'Architectural Planning',
        tagline: 'Precision-driven design and documentation',
        description:
            'Detailed structural and architectural planning backed by 25+ years of field experience. We create thorough working drawings, floor plans, and technical reports using modern tools like Revit 2026 to ensure flawless execution on site.',
        points: [
            'Residential and commercial floor plan design',
            'Working drawings and construction documentation',
            'Site assessment and feasibility reports',
            'BOQ (Bill of Quantities) and estimation',
            'Compliance with local NBC and building codes',
            'BIM documentation using Revit 2026',
        ],
    },
    {
        id: 'structural',
        icon: Building2,
        title: 'Structural Designs',
        tagline: 'Safe, robust structures that stand the test of time',
        description:
            'From load analysis to reinforcement detailing, our structural designs ensure the highest safety standards and structural integrity. We engineer every component to be code-compliant, durable, and optimised for cost.',
        points: [
            'RCC structural design and analysis',
            'Load calculation and structural safety assessment',
            'Reinforcement detailing drawings',
            'Foundation design for varied soil conditions',
            'Earthquake-resistant structural planning',
            'Retrofitting and structural audit services',
        ],
    },
    {
        id: 'pmc',
        icon: ClipboardList,
        title: 'PMC Services',
        tagline: 'End-to-end project delivery with precision',
        description:
            'Our Project Management Consultancy (PMC) oversees every phase of your project from inception to commissioning — ensuring on-time delivery, within budget, and to the highest quality standards.',
        points: [
            'Project planning, scheduling, and monitoring',
            'Vendor and contractor coordination',
            'Quality assurance and control at every stage',
            'Budget tracking and cost optimisation',
            'Progress reporting and stakeholder communication',
            'Large-scale residential and commercial PMC',
        ],
    },
    {
        id: 'approvals',
        icon: FileCheck,
        title: 'GVMC & VUDA Approvals',
        tagline: 'Hassle-free statutory approvals and compliance',
        description:
            'Navigating government approvals can be complex. We handle the complete process of obtaining GVMC (Greater Visakhapatnam Municipal Corporation) and VUDA (Visakhapatnam Urban Development Authority) sanctions, ensuring your project is 100% legally compliant.',
        points: [
            'GVMC building plan approval submissions',
            'VUDA layout and construction sanctions',
            'Preparation of all required statutory documents',
            'Liaison with municipal and planning authorities',
            'Occupancy certificate and completion certificate support',
            'Regularisation of existing constructions',
        ],
    },
    {
        id: 'construction',
        icon: HardHat,
        title: 'Constructions & Development',
        tagline: "Building tomorrow's spaces, today",
        description:
            'From residential villas to commercial complexes, we execute construction projects with uncompromising quality. Every brick is laid with careful attention to design intent, material standards, and delivery timelines.',
        points: [
            'Residential construction — villas, apartments, individual houses',
            'Commercial and institutional building construction',
            'Site supervision and quality control',
            'Material procurement and vendor management',
            'Finishing works — tiling, painting, electrical, and plumbing',
            'Turnkey construction solutions',
        ],
    },
];


export default function ServicesPage() {
    return (
        <>
            {/* Page Hero */}
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-badge">What We Offer</div>
                    <h1 className="page-hero-title">Our Services</h1>
                    <p className="page-hero-subtitle">
                        Comprehensive civil engineering and consulting services tailored to bring your project
                        from concept to completion with 25+ years of expertise.
                    </p>
                </div>
            </section>

            {/* Services */}
            {services.map((service, index) => (
                <section
                    key={service.id}
                    id={service.id}
                    className={`section${index % 2 !== 0 ? ' bg-gradient' : ''}`}
                >
                    <div className="container">
                        <div
                            className={`service-row${index % 2 !== 0 ? ' service-row-reverse' : ''}`}
                        >
                            {/* Icon & Visual Side */}
                            <div className="service-visual">
                                <div
                                    className="glass-card"
                                    style={{ textAlign: 'center', width: '100%', maxWidth: '360px' }}
                                >
                                    <div
                                        className="service-icon-wrapper"
                                        style={{ width: 80, height: 80, margin: '0 auto 1.5rem', borderRadius: '20px' }}
                                    >
                                        <service.icon size={40} />
                                    </div>
                                    <h3 style={{ marginBottom: '0.5rem' }}>{service.title}</h3>
                                    <p className="text-muted" style={{ fontSize: '0.95rem' }}>
                                        {service.tagline}
                                    </p>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="service-content">
                                <h2>{service.title}</h2>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.8 }}>
                                    {service.description}
                                </p>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {service.points.map((point) => (
                                        <li
                                            key={point}
                                            style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}
                                        >
                                            <CheckCircle size={18} style={{ color: '#1c3a6e', flexShrink: 0, marginTop: '3px' }} />
                                            <span style={{ color: 'var(--text-muted)' }}>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/schedule-meeting"
                                    className="btn btn-primary"
                                    style={{ marginTop: '2rem' }}
                                >
                                    Get a Consultation <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* Bottom CTA */}
            <section className="section" style={{ textAlign: 'center' }}>
                <div className="container">
                    <h2 className="section-title">Not Sure Where to Start?</h2>
                    <p className="section-subtitle">
                        Schedule a free consultation with Ravi Kumar and we&apos;ll help identify which services
                        best fit your project goals.
                    </p>
                    <Link href="/schedule-meeting" className="btn btn-primary">
                        Book a Free Consultation <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                    </Link>
                </div>
            </section>
        </>
    );
}
