"use client";

import { Alert, BodyLong, Heading } from "@navikt/ds-react";
import { usePerson } from "@/app/_common/hooks/swr/usePerson";
import styles from "@/app/page.module.css";
import { useAktivBruker } from "@/app/_common/hooks/swr/veileder/useAktivBruker";

function VeilederBanner() {
    const { aktivBruker } = useAktivBruker();
    const { personalia } = usePerson();

    const navn = personalia ? `${personalia?.fornavn} ${personalia?.etternavn}`.toUpperCase() : null;

    return (
        <Alert variant="warning" className={styles.mb12}>
            <Heading spacing size="xsmall" level="2">
                {`Du bruker Min CV på vegne av ${navn} med fødselsnummer ${aktivBruker}`}
            </Heading>
            <BodyLong size="small">
                Husk at du <b>ikke</b> skal skrive sensitive opplysninger i CV-en om for eksempel din helse, religion
                eller politiske oppfatning.
            </BodyLong>
        </Alert>
    );
}

export default VeilederBanner;
