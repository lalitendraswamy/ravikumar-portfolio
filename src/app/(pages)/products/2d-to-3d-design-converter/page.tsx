import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Box, LockKeyhole } from 'lucide-react';

export const metadata: Metadata = { title: '2D to 3D Design Converter | Sadhguru Associates', description: 'A 2D to 3D design visualisation tool coming soon from Sadhguru Associates.' };

export default function DesignConverterPage() {
    return <><section className="page-hero"><div className="container"><div className="page-hero-badge">Coming soon</div><h1 className="page-hero-title">2D to 3D Design Converter</h1><p className="page-hero-subtitle">Visualise plan drawings as clear 3D design concepts before construction begins.</p></div></section><section className="section"><div className="container product-detail"><div className="product-detail-icon"><Box size={48} /></div><div><span className="product-development-status"><LockKeyhole size={13} /> In development</span><h2>Coming soon</h2><p className="product-detail-note">We&apos;re building the 2D to 3D Design Converter experience. Please check back soon.</p><Link href="/products" className="product-back"><ArrowLeft size={17} /> Back to products</Link></div></div></section></>;
}
