"use client";

import Script from "next/script";

export default function Skyra() {
    return (
        <>
            <Script
                id="skyra-config"
                strategy="afterInteractive"
            >{`window.SKYRA_CONFIG = {org: 'arbeids-og-velferdsetaten-nav'}`}</Script>
            <Script src="https://survey.skyra.no/skyra-survey.js" defer strategy="afterInteractive" />
        </>
    );
}
