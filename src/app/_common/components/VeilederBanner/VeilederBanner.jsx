"use client";

import { Alert, BodyShort, Heading, List, VStack } from "@navikt/ds-react";
import { usePerson } from "@/app/_common/hooks/swr/usePerson";
import styles from "@/app/page.module.css";
import { formatterAdresse, formatterFullDatoMedFallback } from "@/app/_common/utils/stringUtils";
import { ListItem } from "@navikt/ds-react/List";

function VeilederBanner() {
    const { personalia } = usePerson();

    const navn = personalia ? `${personalia?.fornavn} ${personalia?.etternavn}`.toUpperCase() : "";
    const fødselsdato = personalia?.foedselsdato ? formatterFullDatoMedFallback(personalia.foedselsdato) : "";
    const bosted = personalia ? formatterAdresse(personalia.adresse, personalia.postnummer, personalia.poststed) : "";

    return (
        <Alert variant="info" size="medium" className={styles.box}>
            <Heading spacing size="small" level="2">
                Du bruker Min CV på vegne av bruker
            </Heading>
            <VStack gap="2" className={styles.mb6}>
                <BodyShort size="small">{`Navn: ${navn}`}</BodyShort>
                <BodyShort size="small">{`Født: ${fødselsdato}`}</BodyShort>
                <BodyShort size="small">{`Bosted: ${bosted}`}</BodyShort>
            </VStack>
            <List title="Husk at du som veileder må:" headingTag="span" size="small" className={styles.mb6}>
                <ListItem className={styles.mb3}>
                    fortelle bruker at all informasjon du som veileder nå legger inn i CV-en på vegne av bruker, kan bli
                    synlig for alle som jobber med arbeidsrettet oppfølging i NAV.
                </ListItem>
                <ListItem className={styles.mb3}>
                    <b>ikke</b> skrive sensitive opplysninger i CV-en om for eksempel brukerens helse, religion eller
                    politiske oppfatning.
                </ListItem>
            </List>
        </Alert>
    );
}

export default VeilederBanner;
