"use client";

import { Alert, BodyShort, Heading, HStack, List, Skeleton, VStack } from "@navikt/ds-react";
import { usePerson } from "@/app/_common/hooks/swr/usePerson";
import styles from "@/app/page.module.css";
import { formatterAdresse, formatterFullDatoMedFallback } from "@/app/_common/utils/stringUtils";
import { ListItem } from "@navikt/ds-react/List";
import VeilederBekreftHjemmel from "@/app/_common/components/VeilederBanner/VeilederBekreftHjemmel";

function LastbarTekst({ label, value, placeholder }) {
    return (
        <HStack gap="1">
            <BodyShort size="small">{`${label}:`}</BodyShort>
            {value ? (
                <BodyShort size="small">{value}</BodyShort>
            ) : (
                <BodyShort as={Skeleton} size="small">
                    {placeholder}
                </BodyShort>
            )}
        </HStack>
    );
}

function VeilederBanner({ className }) {
    const { personalia, harIkkeSettHjemmel } = usePerson();

    const navn = personalia ? `${personalia?.fornavn} ${personalia?.etternavn}`.toUpperCase() : "";
    const fødselsdato = personalia?.foedselsdato ? formatterFullDatoMedFallback(personalia.foedselsdato) : "";
    const bosted = personalia ? formatterAdresse(personalia.adresse, personalia.postnummer, personalia.poststed) : "";

    return (
        <Alert variant="info" size="medium" className={className || styles.box}>
            <Heading spacing size="small" level="2">
                Du bruker Min CV på vegne av bruker
            </Heading>
            <VStack gap="2" className={styles.mb6}>
                <LastbarTekst label="Navn" value={navn} placeholder="OLA NORDMANN" />
                <LastbarTekst label="Født" value={fødselsdato} placeholder="1. januar 1970" />
                <LastbarTekst label="Bosted" value={bosted} placeholder="Fyrstikkalleen 1, 0661 Oslo" />
            </VStack>
            <Heading size="xsmall" level="3">
                Husk at du som veileder må:
            </Heading>
            <List size="small" className={styles.mb6}>
                <ListItem className={styles.mb3}>
                    fortelle bruker at all informasjon du som veileder nå legger inn i CV-en på vegne av bruker, kan bli
                    synlig for alle som jobber med arbeidsrettet oppfølging i NAV.
                </ListItem>
                <ListItem className={styles.mb3}>
                    <b>ikke</b> skrive sensitive opplysninger i CV-en om for eksempel brukerens helse, religion eller
                    politiske oppfatning.
                </ListItem>
            </List>

            {harIkkeSettHjemmel && <VeilederBekreftHjemmel />}
        </Alert>
    );
}

export default VeilederBanner;
