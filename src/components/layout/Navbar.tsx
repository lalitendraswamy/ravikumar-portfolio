'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import '../../styles/navbar.css';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="container header-inner">
                <Link href="/" className="logo">
                    {/* <Building size={24} /> */}
                    <img src="/logo.png" alt="Logo" style={{ height: '24px', width: 'auto' }} />
                    Sadhguru Associates
                </Link>

                <nav className="nav-links" role="navigation" aria-label="Main navigation">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-link${pathname === item.href ? ' nav-link-active' : ''} nav-center`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="/schedule-meeting"
                        className="btn btn-primary"
                        style={{ padding: '0.5rem 1.5rem', color: '#f4f4f8' }}
                    >
                        Schedule Meeting
                    </Link>
                </nav>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation menu"
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {menuOpen && (
                <nav className="mobile-menu" aria-label="Mobile navigation">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`mobile-nav-link${pathname === item.href ? ' nav-link-active' : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="/schedule-meeting"
                        className="mobile-nav-link mobile-nav-cta"
                        onClick={() => setMenuOpen(false)}
                    >
                        Schedule Meeting
                    </Link>
                </nav>
            )}
        </header>
    );
}
