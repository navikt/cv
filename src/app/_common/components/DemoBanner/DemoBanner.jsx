"use client";

import { Alert, BodyLong, Heading } from "@navikt/ds-react";
import styles from "@/app/page.module.css";

function DemoBanner({ className }) {
    return (
        <Alert variant="info" size="medium" className={className || styles.box}>
            <Heading spacing size="small" level="2">
                Dette er en demoversjon av CV-løsningen på Nav.no
            </Heading>
            <BodyLong>Dataen lagres kun til du refresher siden, eller navigerer bort fra den.</BodyLong>
            <BodyLong>
                Noen funksjoner, som å logge inn via topp-banneret eller å oppdatere EURES-samtykket, er ikke
                tilgjengelig i demoversjonen.
            </BodyLong>
        </Alert>
    );
}

export default DemoBanner;
