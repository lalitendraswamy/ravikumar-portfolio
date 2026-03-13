import { Building, Phone, Mail, MapPin, Linkedin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer" aria-label="Site footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand Column */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            {/* <Building size={22} /> */}
                            {/* <img src="/logo.png" alt="Logo" style={{ height: '24px', width: 'auto' }} /> */}
                            Sadhguru Associates
                        </div>
                        <p className="footer-tagline">
                            25+ years of trusted civil engineering and project management expertise across
                            Andhra Pradesh. Building visions, engineering excellence.
                        </p>
                        <div className="footer-socials" style={{ marginTop: '1.5rem' }}>
                            <a
                                href="https://www.linkedin.com/in/ravi-kumar-233a99152/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-social-link"
                                aria-label="LinkedIn profile of Ravi Kumar"
                            >
                                <Linkedin size={18} />
                            </a>
                            <a href="tel:+919885695595" className="footer-social-link" aria-label="Call us">
                                <Phone size={18} />
                            </a>
                            <a href="mailto:rkkonna@gmail.com" className="footer-social-link" aria-label="Email us">
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/services">Our Services</Link></li>
                            <li><Link href="/portfolio">Portfolio</Link></li>
                            <li><Link href="/schedule-meeting">Schedule Meeting</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Services</h4>
                        <ul className="footer-links">
                            <li><Link href="/services#planning">Architectural Planning</Link></li>
                            <li><Link href="/services#structural">Structural Designs</Link></li>
                            <li><Link href="/services#pmc">PMC Services</Link></li>
                            <li><Link href="/services#approvals">GVMC &amp; VUDA Approvals</Link></li>
                            <li><Link href="/services#construction">Constructions &amp; Development</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Contact Us</h4>
                        <ul className="footer-contact-list">
                            <li>
                                <Phone size={15} />
                                <span>+91 98856 95595</span>
                            </li>
                            <li>
                                <Mail size={15} />
                                <span>rkkonna@gmail.com</span>
                            </li>
                            <li>
                                <MapPin size={15} />
                                <span>Andhra Pradesh, India</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom Bar */}
                <div className="footer-bottom">
                    <p className="footer-copy">
                        &copy; {new Date().getFullYear()} Sadhguru Associates. All Rights Reserved.
                        &nbsp;|&nbsp; Serving Andhra Pradesh &amp; Telangana, India.
                    </p>
                    <nav className="footer-bottom-links" aria-label="Footer navigation">
                        <Link href="/about">About</Link>
                        <Link href="/services">Services</Link>
                        <Link href="/portfolio">Portfolio</Link>
                        <Link href="/schedule-meeting">Contact</Link>
                    </nav>
                    <p className="footer-copy">
                        Designed &amp; Developed by{' '}
                        <a
                            href="https://www.lalitendra.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dev-credit-link"
                        >
                            Lalitendra
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
