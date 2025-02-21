import { BodyLong, Box, Button, Heading, HStack } from "@navikt/ds-react";
import { useId } from "react";
import { PencilIcon } from "@navikt/aksel-icons";
import styles from "@/app/page.module.css";
import { formatterAdresse, formatterTelefon } from "@/app/_common/utils/stringUtils";
import PersonaliaModal from "@/app/(minCV)/_components/personalia/PersonaliaModal";
import { SeksjonsIdEnum } from "@/app/_common/enums/cvEnums";
import { usePerson } from "@/app/_common/hooks/swr/usePerson";
import { SeksjonSkeleton } from "@/app/_common/components/SeksjonSkeleton";
import { useOppdaterPersonaliaNoCache } from "@/app/_common/hooks/swr/useOppdaterPersonaliaNoCache";
import { useCvModal } from "@/app/_common/hooks/useCvModal";

export default function Personalia() {
    const { personalia, personLaster } = usePerson();
    const oppdateringprops = useOppdaterPersonaliaNoCache();
    const modalProps = useCvModal(personalia, oppdateringprops);
    const { modalÅpen, toggleModal } = modalProps;
    const headingId = useId();

    return (
        <section aria-labelledby={personLaster ? undefined : headingId} data-section id={SeksjonsIdEnum.PERSONALIA}>
            {personLaster ? (
                <SeksjonSkeleton
                    icon={<HStack className={[styles.iconPersonaliaBig, styles.sectionIcon]} aria-hidden="true" />}
                />
            ) : (
                <Box background="surface-default" padding="10" className={styles.box}>
                    <HStack justify="center">
                        <HStack className={[styles.iconPersonaliaBig, styles.sectionIcon]} aria-hidden="true" />
                    </HStack>
                    <Heading id={headingId} level="2" size="large" align="start" spacing>
                        Personalia
                    </Heading>
                    <dl className={styles.borderunder} aria-labelledby={headingId}>
                        <dt>
                            <BodyLong weight="semibold">Navn</BodyLong>
                        </dt>
                        <dd>
                            <BodyLong spacing>
                                {personalia ? `${personalia.fornavn} ${personalia.etternavn}` : ""}
                            </BodyLong>
                        </dd>
                        <dt>
                            <BodyLong weight="semibold">Telefon</BodyLong>
                        </dt>
                        <dd>
                            <BodyLong spacing>
                                {personalia?.telefonnummer ? formatterTelefon(personalia.telefonnummer) : ""}
                            </BodyLong>
                        </dd>
                        <dt>
                            <BodyLong weight="semibold">E-post</BodyLong>
                        </dt>
                        <dd>
                            <BodyLong spacing>{personalia ? personalia.epost : ""}</BodyLong>
                        </dd>
                        <dt>
                            <BodyLong weight="semibold">Adresse</BodyLong>
                        </dt>
                        <dd>
                            <BodyLong className={styles.mb16}>
                                {personalia
                                    ? formatterAdresse(personalia.adresse, personalia.postnummer, personalia.poststed)
                                    : ""}
                            </BodyLong>
                        </dd>
                    </dl>
                    <Button
                        aria-label="Endre personalia"
                        className={styles.mb6}
                        icon={<PencilIcon aria-hidden />}
                        variant="primary"
                        onClick={() => toggleModal(true)}
                    >
                        Endre
                    </Button>
                </Box>
            )}
            {modalÅpen && (
                <PersonaliaModal
                    {...modalProps}
                    gjeldendeElement={personalia}
                    lagreElement={oppdateringprops.triggerOppdatering}
                />
            )}
        </section>
    );
}
