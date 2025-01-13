"use client";

// eslint-disable-next-line import/no-extraneous-dependencies
import NAVSPA from "@navikt/navspa";
import { getMiljø, Miljø } from "@/app/_common/utils/miljøUtils";

export default function ModiaDekoratør() {
    const InternflateDecorator = NAVSPA.importer("internarbeidsflate-decorator-v3");

    const miljø = getMiljø() === Miljø.PROD ? "prod" : "q0";

    return (
        <InternflateDecorator
            proxy
            appName="Min CV"
            environment={miljø}
            showEnheter
            showHotkeys={false}
            showSearchArea={false}
            fetchActiveEnhetOnMount
            urlFormat="NAV_NO"
        />
    );
}
