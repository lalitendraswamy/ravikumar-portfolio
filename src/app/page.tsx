import Link from 'next/link';
import { Compass, HardHat, ClipboardList, FileCheck, Building2, ArrowRight, Calendar } from 'lucide-react';

export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg"></div>
                <div className="hero-overlay"></div>
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-badge animate-fade-in">25+ Years of Trust</div>
                        <h1
                            className="title animate-fade-in delay-1"
                            style={{ color: '#f4f4f8' }}
                        >
                            Building Visions,
                            <br />
                            <span style={{ color: '#c8d6f0' }}>Engineering Excellence.</span>
                        </h1>
                        <p
                            className="subtitle animate-fade-in delay-2"
                            style={{ maxWidth: '600px', color: 'rgba(244,244,248,0.75)' }}
                        >
                            Led by Ravi Kumar, a Principal Consultant with over two decades of experience
                            delivering extensive civil engineering, architectural planning, and Vaastu solutions
                            across Andhra Pradesh.
                        </p>
                        <div className="hero-actions animate-fade-in delay-3">
                            <Link href="/portfolio" className="btn btn-primary">
                                Explore Our Work{' '}
                                <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
                            </Link>
                            <Link href="/schedule-meeting" className="btn btn-outline" style={{ color: '#f4f4f8', borderColor: 'rgba(244,244,248,0.4)' }}>
                                Book a Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="section bg-gradient">
                <div className="container">
                    <div className="about-wrapper">
                        <div className="about-image">
                            <img src="/ravikumar.png" alt="Infrastructure Project Management by Ravi Kumar" />
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
                                Starting his career as a Site Supervisor, Ravi Kumar steadily climbed the ranks to
                                Project Manager by demonstrating relentless dedication to quality and precision on
                                large-scale infrastructure projects.
                            </p>
                            <p style={{ marginBottom: '2rem', color: 'var(--text-muted)' }}>
                                Believing in deeper client impact, he established Sadhguru Associates — built
                                purely on reputation and word-of-mouth, with an unyielding standard of excellence.
                            </p>
                            <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '2rem' }}>
                                <div className="stat-box">
                                    <div className="stat-number">150+</div>
                                    <div className="text-muted">Projects Completed</div>
                                </div>
                                <div className="stat-box">
                                    <div className="stat-number">100%</div>
                                    <div className="text-muted">Client Satisfaction</div>
                                </div>
                            </div>
                            <Link href="/about" className="btn btn-primary">
                                Read Our Story <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="section">
                <div className="container">
                    <h2 className="section-title">Our Expertise.</h2>
                    <p className="section-subtitle">
                        Comprehensive civil engineering and design services meticulously tailored to build the
                        structures of tomorrow.
                    </p>

                    <div className="grid grid-3">
                        <div className="glass-card">
                            <div className="service-icon-wrapper">
                                <Compass />
                            </div>
                            <h3>Architectural Planning</h3>
                            <p className="text-muted">
                                Detailed floor plans, working drawings, and construction documentation crafted
                                with precision using modern design tools.
                            </p>
                        </div>

                        <div className="glass-card">
                            <div className="service-icon-wrapper">
                                <Building2 />
                            </div>
                            <h3>Structural Designs</h3>
                            <p className="text-muted">
                                Safe, code-compliant RCC structural designs with load analysis, reinforcement
                                detailing, and earthquake-resistant planning.
                            </p>
                        </div>

                        <div className="glass-card">
                            <div className="service-icon-wrapper">
                                <ClipboardList />
                            </div>
                            <h3>PMC Services</h3>
                            <p className="text-muted">
                                End-to-end project management from inception to commissioning — on time,
                                within budget, and to the highest quality standards.
                            </p>
                        </div>

                        <div className="glass-card">
                            <div className="service-icon-wrapper">
                                <FileCheck />
                            </div>
                            <h3>GVMC &amp; VUDA Approvals</h3>
                            <p className="text-muted">
                                Hassle-free handling of statutory building plan sanctions and compliance
                                with municipal and urban development authorities.
                            </p>
                        </div>

                        <div className="glass-card">
                            <div className="service-icon-wrapper">
                                <HardHat />
                            </div>
                            <h3>Constructions &amp; Development</h3>
                            <p className="text-muted">
                                Quality construction of residential villas, commercial complexes, and
                                institutional buildings with turnkey solutions.
                            </p>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                        <Link href="/services" className="btn btn-outline">
                            View All Services <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section id="portfolio" className="section bg-gradient">
                <div className="container">
                    <h2 className="section-title">Signature Approach</h2>
                    <p className="section-subtitle">
                        Showcasing the meticulous planning and structural design execution embedded in our
                        projects.
                    </p>

                    <div className="grid grid-2">
                        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                            <img
                                src="/vaastu_blueprint.png"
                                alt="Vaastu Architectural Blueprint"
                                style={{ width: '100%', display: 'block' }}
                            />
                            <div style={{ padding: '2rem' }}>
                                <h3>Traditional Meets Modern</h3>
                                <p className="text-muted">
                                    Our custom Vaastu-integrated blueprints bring together age-old spatial wisdom and
                                    contemporary aesthetics.
                                </p>
                            </div>
                        </div>
                        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                            <img
                                src="/infrastructure_pmc.png"
                                alt="PMC Management"
                                style={{ width: '100%', display: 'block' }}
                            />
                            <div style={{ padding: '2rem' }}>
                                <h3>Extensive PMC</h3>
                                <p className="text-muted">
                                    Guiding structural design, vendor management, and strict quality control on
                                    grand-scale infrastructure.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                        <Link href="/portfolio" className="btn btn-outline">
                            View Full Portfolio <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Contact / CTA Section */}
            <section id="contact" className="section">
                <div className="container">
                    <h2 className="section-title">Let&apos;s Build Together</h2>
                    <p className="section-subtitle">
                        Schedule a personalized physical or virtual meeting with Ravi Kumar to discuss your next
                        big project.
                    </p>

                    <div className="contact-form">
                        <form action="#">
                            <div className="grid grid-2" style={{ gap: '1rem', marginBottom: 0 }}>
                                <div className="input-group">
                                    <label className="input-label" htmlFor="name">Full Name</label>
                                    <input id="name" type="text" className="input-field" placeholder="Full Name" required />
                                </div>
                                <div className="input-group">
                                    <label className="input-label" htmlFor="phone">Phone Number</label>
                                    <input id="phone" type="tel" className="input-field" placeholder="+91" required />
                                </div>
                            </div>
                            <div className="input-group">
                                <label className="input-label" htmlFor="email">Email Address</label>
                                <input id="email" type="email" className="input-field" placeholder="Email" />
                            </div>
                            <div className="input-group">
                                <label className="input-label" htmlFor="service">Service Required</label>
                                <select id="service" className="input-field" style={{ appearance: 'none' }}>
                                    <option value="pmc">Construction &amp; PMC</option>
                                    <option value="planning">Architectural Planning</option>
                                    <option value="vaastu">Vaastu Consultancy</option>
                                    <option value="valuation">Real Estate Valuation</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label className="input-label" htmlFor="message">Project Details</label>
                                <textarea
                                    id="message"
                                    className="input-field"
                                    placeholder="Tell us about your project requirements..."
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                <Calendar size={18} style={{ marginRight: '0.5rem' }} /> Request Appointment
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
