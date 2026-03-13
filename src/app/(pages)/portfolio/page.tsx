import type { Metadata } from 'next';
import PortfolioClient from '../../../modules/portfolio/PortfolioClient';

export const metadata: Metadata = {
    title: 'Portfolio | Sadhguru Associates',
    description:
        'Explore the signature work and project highlights of Sadhguru Associates — civil engineering, PMC, Vaastu, and architectural planning across Andhra Pradesh.',
    keywords:
        'civil engineering portfolio India, PMC projects Andhra Pradesh, Vaastu design projects, construction projects portfolio',
};

export default function PortfolioPage() {
    return <PortfolioClient />;
}
