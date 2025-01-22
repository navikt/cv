"use client";

// eslint-disable-next-line import/no-extraneous-dependencies
import { getMiljø, Miljø } from "@/app/_common/utils/miljøUtils";
import dynamic from "next/dynamic";
import { PERSON_KEY } from "@/app/_common/hooks/swr/usePerson";
import { mutate } from "swr";
import { CV_KEY } from "@/app/_common/hooks/swr/useCv";

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

    const refreshVedEndretFnr = () => {
        console.log("Fnr er endret!");
        mutate(PERSON_KEY);
        mutate(CV_KEY);
    };

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
            onFnrChanged={refreshVedEndretFnr}
        />
    );
}
