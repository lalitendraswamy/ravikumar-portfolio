import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export const viewport: Viewport = {
    themeColor: "#f4f4f8",
};

export const metadata: Metadata = {
    title: "Sadhguru Associates | Ravi Kumar - Civil Engineering & PMC",
    description:
        "25+ years of trust. Ravi Kumar is a Principal Consultant providing Construction, Planning, PMC, Real Estate Valuation, and Vaastu Services in Andhra Pradesh.",
    keywords:
        "Civil Engineering Andhra Pradesh, PMC Services, Vaastu Consultant, Construction Planning, Real Estate Valuation, Sadhguru Associates",
    openGraph: {
        title: "Sadhguru Associates | Civil Engineering & PMC",
        description:
            "Expert civil engineering, PMC, architectural services, and Vaastu consultancy by Ravi Kumar.",
        siteName: "Sadhguru Associates",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
