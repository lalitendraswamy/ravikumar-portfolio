import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calculator, Languages, MessagesSquare, PhoneCall } from 'lucide-react';
import EstimatorChat from '@/modules/estimator/EstimatorChat';

export const metadata: Metadata = {
    title: 'Construction Estimater | Sadhguru Associates',
    description:
        'Get an instant, line-item construction cost estimate for your house or building in Visakhapatnam. Chat or speak in English, Telugu or Hindi.',
    keywords:
        'construction cost estimator Visakhapatnam, house construction cost Vizag, GVMC VUDA approval cost, building cost calculator Andhra Pradesh',
};

const features = [
    {
        icon: MessagesSquare,
        title: 'Asks before it prices',
        desc: 'Collects project type, location, plot size, floors and quality tier first.',
    },
    {
        icon: Calculator,
        title: 'Line-item breakdown',
        desc: 'Materials, labour, GVMC/VUDA approvals and contingency, with a likely range.',
    },
    {
        icon: Languages,
        title: 'Your language, text or voice',
        desc: 'Type or speak in English, Telugu or Hindi and hear the reply read aloud.',
    },
    {
        icon: PhoneCall,
        title: 'Straight to Ravikumar',
        desc: 'Book a call or share your estimate on WhatsApp in one tap.',
    },
];

export default function ConstructionEstimaterPage() {
    return (
        <>
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-badge">Available now</div>
                    <h1 className="page-hero-title">Construction Estimater</h1>
                    <p className="page-hero-subtitle">
                        Describe your project and get an indicative cost estimate in minutes, in English, Telugu or Hindi.
                    </p>
                </div>
            </section>

            <section className="section est-section">
                <div className="container">
                    <EstimatorChat />

                    <div className="est-features">
                        {features.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="est-feature">
                                <Icon size={22} />
                                <h3>{title}</h3>
                                <p>{desc}</p>
                            </div>
                        ))}
                    </div>

                    <Link href="/products" className="product-back" style={{ marginLeft: 0, marginTop: '2rem' }}>
                        <ArrowLeft size={17} /> Back to products
                    </Link>
                </div>
            </section>
        </>
    );
}
