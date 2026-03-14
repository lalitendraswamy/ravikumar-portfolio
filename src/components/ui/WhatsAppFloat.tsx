"use client";

import { useState } from "react";

const PHONE_NUMBER = "919885695595"; // country code + number, no +
const PREDEFINED_MESSAGE =
    "Hello! I found your profile and I'm interested in discussing a project. Could you please share more details about your services?";

export default function WhatsAppFloat() {
    const [hovered, setHovered] = useState(false);

    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(PREDEFINED_MESSAGE)}`;

    return (
        <a
            id="whatsapp-float-btn"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float"
            aria-label="Chat with us on WhatsApp"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Pulse ring */}
            <span className="whatsapp-pulse" aria-hidden="true" />

            {/* WhatsApp SVG icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="whatsapp-icon"
                aria-hidden="true"
                fill="currentColor"
            >
                <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.477.648 4.804 1.78 6.82L2 30l7.397-1.74A13.94 13.94 0 0 0 16.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.6a11.555 11.555 0 0 1-5.875-1.601l-.422-.25-4.388 1.032 1.055-4.27-.275-.44A11.546 11.546 0 0 1 4.4 16.003C4.4 9.607 9.607 4.4 16.003 4.4c6.396 0 11.597 5.207 11.597 11.603S22.399 27.6 16.003 27.6zm6.362-8.672c-.348-.175-2.065-1.02-2.386-1.136-.32-.117-.553-.175-.786.175-.234.35-.903 1.136-1.107 1.37-.204.234-.408.263-.756.088-.348-.175-1.469-.541-2.797-1.725-1.033-.922-1.73-2.06-1.934-2.41-.203-.349-.022-.537.153-.71.157-.156.348-.408.522-.612.174-.204.232-.349.348-.582.117-.233.058-.437-.029-.612-.088-.175-.786-1.895-1.078-2.596-.283-.68-.572-.588-.786-.599l-.67-.012a1.284 1.284 0 0 0-.932.437c-.32.35-1.224 1.195-1.224 2.915s1.253 3.382 1.428 3.615c.174.234 2.47 3.771 5.985 5.289.837.361 1.49.577 1.999.739.84.267 1.604.23 2.208.14.673-.1 2.065-.845 2.357-1.661.29-.816.29-1.516.203-1.661-.086-.146-.32-.233-.67-.408z" />
            </svg>

            {/* Tooltip label */}
            <span className={`whatsapp-tooltip${hovered ? " visible" : ""}`}>
                Chat on WhatsApp
            </span>
        </a>
    );
}
