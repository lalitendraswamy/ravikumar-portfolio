import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { products } from '../../../lib/products';

export const metadata: Metadata = {
    title: 'Products | Sadhguru Associates',
    description: 'Explore practical construction estimation, Vaastu analysis, and 2D to 3D design tools.',
};

export default function ProductsPage() {
    return (
        <>
            <section className="page-hero">
                <div className="container">
                    <div className="page-hero-badge">Digital Tools</div>
                    <h1 className="page-hero-title">Our Products</h1>
                    <p className="page-hero-subtitle">
                        Purpose-built tools that help you estimate, analyse, and visualise your construction ideas.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="products-grid">
                        {products.map((product) => {
                            const Icon = product.icon;
                            return (
                                <article key={product.slug} className="glass-card product-card">
                                    <div className="service-icon-wrapper"><Icon size={28} /></div>
                                    {!product.available && <span className="coming-soon-badge">Coming Soon</span>}
                                    <h2>{product.name}</h2>
                                    <p className="product-description">{product.description}</p>
                                    <ul className="product-points">
                                        {product.points.map((point) => (
                                            <li key={point}><CheckCircle size={18} />{point}</li>
                                        ))}
                                    </ul>
                                    {product.available ? (
                                        <Link href={`/products/${product.slug}`} className="btn btn-primary product-cta">
                                            Try Now <ArrowRight size={18} />
                                        </Link>
                                    ) : (
                                        <span className="btn product-cta product-cta-disabled" aria-disabled="true">
                                            Coming Soon
                                        </span>
                                    )}
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
}
