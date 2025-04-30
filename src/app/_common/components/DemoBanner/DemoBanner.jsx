"use client";

import { Alert, BodyLong, Heading } from "@navikt/ds-react";
import styles from "@/app/page.module.css";

function DemoBanner({ className }) {
    return (
        <Alert variant="info" size="medium" className={className || styles.box}>
            <Heading spacing size="small" level="2">
                Dette er en demoversjon av CV-løsningen på Nav.no
            </Heading>
            <BodyLong size="small" className={styles.mb3}>
                Informasjonen du legger inn her lagres kun til du laster inn siden på nytt, eller navigerer bort fra
                den.
            </BodyLong>
            <BodyLong size="small">
                Noen funksjoner, som å logge inn via topp-banneret eller å oppdatere EURES-samtykket, er ikke
                tilgjengelig i demoversjonen.
            </BodyLong>
        </Alert>
    );
}

export default DemoBanner;
