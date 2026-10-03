import { Box, Compass, Ruler } from 'lucide-react';

export const products = [
    {
        slug: 'construction-estimater',
        name: 'Construction Estimater',
        description: 'Plan construction costs with clarity before work begins.',
        available: true,
        icon: Ruler,
        points: [
            'Build detailed quantity and cost estimates for construction work',
            'Organise material, labour, and overhead costs in one place',
            'Compare estimate options to make confident budget decisions',
            'Keep project costs visible from planning through execution',
        ],
    },
    {
        slug: 'vaastu-analyzer',
        name: 'Vaastu Analyzer',
        description: 'Review your site or floor plan through practical Vaastu principles.',
        available: false,
        icon: Compass,
        points: [
            'Analyse plot orientation and directional zoning',
            'Review room placement for homes and commercial spaces',
            'Identify Vaastu considerations in existing floor plans',
            'Get clear recommendations to support informed design choices',
        ],
    },
    {
        slug: '2d-to-3d-design-converter',
        name: '2D to 3D Design Converter',
        description: 'Turn plan drawings into clear, visual 3D design concepts.',
        available: false,
        icon: Box,
        points: [
            'Convert 2D floor plans into easy-to-understand 3D views',
            'Visualise rooms, layouts, and spatial relationships before building',
            'Communicate design intent more clearly with stakeholders',
            'Explore concepts that help make planning decisions faster',
        ],
    },
] as const;

export type Product = (typeof products)[number];
