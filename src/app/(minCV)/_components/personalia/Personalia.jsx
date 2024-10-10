import { useContext, useEffect, useState } from "react";
import { BodyLong, Box, Button, Heading, HStack } from "@navikt/ds-react";
import { PencilIcon } from "@navikt/aksel-icons";
import styles from "@/app/page.module.css";
import { formatterAdresse, formatterTelefon } from "@/app/_common/utils/stringUtils";
import PersonaliaModal from "@/app/(minCV)/_components/personalia/PersonaliaModal";
import { PersonContext } from "@/app/_common/contexts/PersonContext";
import { StatusEnums } from "@/app/_common/enums/fetchEnums";

function PersonaliaIcon() {
    return (
        <svg
            style={{ marginTop: "-4.5rem", marginBottom: "4rem" }}
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="64" height="64" rx="32" fill="#7CDAF8" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M32 21C25.9249 21 21 25.9249 21 32C21 35.4813 22.6172 38.5849 25.1413 40.6004C25.4137 39.2654 26.0724 38.0281 27.0503 37.0503C28.363 35.7375 30.1435 35 32 35C33.8565 35 35.637 35.7375 36.9497 37.0503C37.9276 38.0281 38.5863 39.2655 38.8587 40.6004C41.3828 38.5849 43 35.4813 43 32C43 25.9249 38.0751 21 32 21ZM36.9961 41.8026C36.9466 40.5482 36.4266 39.3555 35.5355 38.4645C34.5979 37.5268 33.3261 37 32 37C30.6739 37 29.4021 37.5268 28.4645 38.4645C27.5734 39.3555 27.0534 40.5482 27.0039 41.8026C28.5031 42.5682 30.2011 43 32 43C33.7989 43 35.4969 42.5682 36.9961 41.8026ZM19 32C19 24.8203 24.8203 19 32 19C39.1797 19 45 24.8203 45 32C45 39.1797 39.1797 45 32 45C24.8203 45 19 39.1797 19 32ZM32 25.6667C30.3431 25.6667 29 27.0098 29 28.6667C29 30.3235 30.3431 31.6667 32 31.6667C33.6569 31.6667 35 30.3235 35 28.6667C35 27.0098 33.6569 25.6667 32 25.6667ZM27 28.6667C27 25.9052 29.2386 23.6667 32 23.6667C34.7614 23.6667 37 25.9052 37 28.6667C37 31.4281 34.7614 33.6667 32 33.6667C29.2386 33.6667 27 31.4281 27 28.6667Z"
                fill="#23262A"
            />
        </svg>
    );
}

export default function Personalia() {
    const { person, oppdaterPersonaliaData } = useContext(PersonContext);
    const [modalÅpen, setModalÅpen] = useState(false);
    const [personalia, setPersonalia] = useState(null);

    useEffect(() => {
        const oppdaterPersonalia = (personaliap) => setPersonalia(personaliap);
        if (person.fetchStatus === StatusEnums.SUCCESS) oppdaterPersonalia(person.data.personalia || {});
    }, [person]);

    const lagrePersonalia = async (oppdatertPersonalia) => {
        await oppdaterPersonaliaData(oppdatertPersonalia);
        setModalÅpen(false);
    };

    return (
        <div data-section id="2">
            <Box background="surface-default" padding="10" className={styles.box}>
                <HStack justify="center">
                    <PersonaliaIcon />
                </HStack>
                <Heading level="2" size="large" align="start" spacing>
                    Personalia
                </Heading>
                <BodyLong weight="semibold">Navn</BodyLong>
                <BodyLong spacing>{personalia ? `${personalia.fornavn} ${personalia.etternavn}` : ""}</BodyLong>
                <div className={styles.divider}></div>
                <BodyLong weight="semibold">Telefon</BodyLong>
                <BodyLong spacing>{personalia ? formatterTelefon(personalia.telefonnummer) : ""}</BodyLong>
                <div className={styles.divider}></div>
                <BodyLong weight="semibold">E-post</BodyLong>
                <BodyLong spacing>{personalia ? personalia.epost : ""}</BodyLong>
                <div className={styles.divider}></div>
                <BodyLong weight="semibold">Adresse</BodyLong>
                <BodyLong className={styles.mb16}>
                    {personalia ? formatterAdresse(personalia.adresse, personalia.postnummer, personalia.poststed) : ""}
                </BodyLong>
                <Button
                    className={styles.mb6}
                    icon={<PencilIcon aria-hidden />}
                    variant="primary"
                    onClick={() => setModalÅpen(true)}
                >
                    Endre
                </Button>
            </Box>
            {modalÅpen && (
                <PersonaliaModal
                    modalÅpen={modalÅpen}
                    toggleModal={setModalÅpen}
                    personalia={personalia}
                    lagrePersonalia={lagrePersonalia}
                />
            )}
        </div>
    );
}
