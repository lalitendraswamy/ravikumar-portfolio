/**
 * src/app/api/README.ts
 *
 * This folder is reserved for Next.js API Route Handlers (App Router).
 * Each subfolder here becomes a serverless API endpoint.
 *
 * Example structure:
 *   api/
 *   ├── contact/
 *   │   └── route.ts      →  POST /api/contact  (handles contact form submissions)
 *   ├── newsletter/
 *   │   └── route.ts      →  POST /api/newsletter
 *   └── health/
 *       └── route.ts      →  GET  /api/health   (health-check endpoint)
 *
 * Usage example (route.ts):
 *   import { NextResponse } from 'next/server';
 *   export async function POST(req: Request) {
 *     const body = await req.json();
 *     // handle logic here
 *     return NextResponse.json({ success: true });
 *   }
 *
 * Add route.ts files inside subfolders as needed.
 */

export { };
