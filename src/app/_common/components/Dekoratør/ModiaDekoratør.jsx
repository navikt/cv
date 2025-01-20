"use client";

// eslint-disable-next-line import/no-extraneous-dependencies
import { getMiljø, Miljø } from "@/app/_common/utils/miljøUtils";
import dynamic from "next/dynamic";

export default function ModiaDekoratør() {
    const miljø = getMiljø() === Miljø.PROD ? "prod" : "q0";
    const proxyUrl = `https://cv-veileder.intern${getMiljø() === Miljø.PROD ? "" : ".dev"}.nav.no/min-cv/api/veileder`;

    const InternflateDecorator = dynamic(
        () => import("@navikt/navspa").then((NAVSPA) => NAVSPA.default.importer("internarbeidsflate-decorator-v3")),
        {
            ssr: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            loading: () => <div>Laster dekoratør...</div>,
        },
    );

    console.log(`Miljø: ${miljø}, proxyUrl: ${proxyUrl}`);

    return (
        <InternflateDecorator
            proxy={proxyUrl}
            appName="Min CV - Veileder"
            environment={miljø}
            showEnheter={false}
            showHotkeys={false}
            showSearchArea
            fetchActiveUserOnMount
            urlFormat="NAV_NO"
        />
    );
}
