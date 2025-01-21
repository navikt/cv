"use client";

// eslint-disable-next-line import/no-extraneous-dependencies
import { getMiljø, Miljø } from "@/app/_common/utils/miljøUtils";
import NAVSPA from "@navikt/navspa";

export default function ModiaDekoratør() {
    const miljø = getMiljø() === Miljø.PROD ? "prod" : "q0";
    const proxyUrl = `https://cv-veileder.intern${getMiljø() === Miljø.PROD ? "" : ".dev"}.nav.no/min-cv/api/veileder`;

    const InternflateDecorator = NAVSPA.importer("internarbeidsflate-decorator-v3");

    const dekoratørErHentet = InternflateDecorator().props.navSpaApp.mount !== undefined;

    if (!dekoratørErHentet) return <div>ModiaContextDekoratøren laster, vennligst vent...</div>;

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
