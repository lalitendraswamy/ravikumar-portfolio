import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Compass, LockKeyhole } from 'lucide-react';

export const metadata: Metadata = { title: 'Vaastu Analyzer | Sadhguru Associates', description: 'A Vaastu plan-analysis tool coming soon from Sadhguru Associates.' };

export default function VaastuAnalyzerPage() {
    return <><section className="page-hero"><div className="container"><div className="page-hero-badge">Coming soon</div><h1 className="page-hero-title">Vaastu Analyzer</h1><p className="page-hero-subtitle">A focused way to review site orientation, zoning, and floor-plan considerations.</p></div></section><section className="section"><div className="container product-detail"><div className="product-detail-icon"><Compass size={48} /></div><div><span className="product-development-status"><LockKeyhole size={13} /> In development</span><h2>Coming soon</h2><p className="product-detail-note">We&apos;re preparing the Vaastu Analyzer experience. Please check back soon.</p><Link href="/products" className="product-back"><ArrowLeft size={17} /> Back to products</Link></div></div></section></>;
}
