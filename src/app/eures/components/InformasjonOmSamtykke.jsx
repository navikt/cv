import { BodyLong, Box, Button, Checkbox, ExpansionCard, Heading, HStack, Loader } from "@navikt/ds-react";
import SamtykkeTekst from "@/app/eures/components/SamtykkeTekst";
import styles from "@/app/page.module.css";
import { SamtykkeSkeleton } from "@/app/_common/components/SamtykkeSkeleton";
import { formatterDatoEttAarFremITid } from "@/app/_common/utils/stringUtils";
import { useState } from "react";
import TrekkSamtykkeModal from "@/app/eures/components/TrekkSamtykkeModal";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import ManglerCvAlert from "@/app/eures/components/ManglerCvAlert";

export default function InformasjonOmSamtykke({
    eures,
    delerEures,
    euresLaster,
    setSamtykkeModal,
    onOppdaterSamtykke,
    setValiderKategorier,
    setValiderLand,
    setKategorier,
    setLandSelectedOptions,
    oppdaterEures,
}) {
    const { cv } = useCv();
    const [openTrekkSamtykkeModal, setOpenTrekkSamtykkeModal] = useState(false);

    const onTrekkSamtykke = () => {
        setValiderKategorier(false);
        setValiderLand(false);
        setKategorier([]);
        setLandSelectedOptions([]);
        setOpenTrekkSamtykkeModal(false);
        oppdaterEures.triggerOppdatering(null);
    };

    return (
        <>
            <ExpansionCard defaultOpen size="small" aria-label="Demo med bare tittel">
                <ExpansionCard.Header>
                    <ExpansionCard.Title as="h4" size="small">
                        Informasjon om samtykke
                    </ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <>
                        <SamtykkeTekst />
                        <BodyLong className={styles.mb4} size="small">
                            <Button
                                className={`${styles.mt4} ${styles.mb1}`}
                                size="small"
                                variant="secondary"
                                onClick={() => setSamtykkeModal(true)}
                            >
                                Personvernerklæring
                            </Button>
                        </BodyLong>
                        <div className={styles.mb5}>
                            <div className={styles.borderEures} />
                        </div>
                        {euresLaster ? (
                            <SamtykkeSkeleton />
                        ) : (
                            <div>
                                {delerEures ? (
                                    <Box
                                        background={
                                            oppdaterEures.oppdateringHarFeil
                                                ? "surface-danger-subtle"
                                                : "surface-success-subtle"
                                        }
                                        padding="4"
                                        borderRadius="medium"
                                        borderColor={
                                            oppdaterEures.oppdateringHarFeil ? "border-danger" : "border-success"
                                        }
                                        borderWidth="1"
                                    >
                                        <HStack justify="space-between">
                                            <Heading level="4" size="medium">
                                                Status for samtykke
                                            </Heading>
                                            <BodyLong size="small">
                                                {`Samtykket ditt utløper ${formatterDatoEttAarFremITid(eures.sistEndret)}`}
                                            </BodyLong>
                                        </HStack>
                                        <BodyLong className={`${styles.mt6} ${styles.mb3}`}>
                                            Dine valgte innholdskategorier deles nå til den Europeiske
                                            Jobbmobilitetsportalen. Hvis du legger til eller fjerner hvilke
                                            innholdskategorier du vil dele, må du oppdatere samtykket ditt.
                                        </BodyLong>
                                        <Button
                                            className={`${styles.mt4} ${styles.mb1} ${styles.trekkSamtykkeButton}`}
                                            size="small"
                                            variant="secondary"
                                            loading={oppdaterEures.oppdateringLaster}
                                            onClick={() => setOpenTrekkSamtykkeModal(true)}
                                        >
                                            Trekk samtykke
                                        </Button>
                                    </Box>
                                ) : (
                                    <Box
                                        background={
                                            oppdaterEures.oppdateringHarFeil
                                                ? "surface-danger-subtle"
                                                : "surface-warning-subtle"
                                        }
                                        padding="4"
                                        borderRadius="medium"
                                        borderColor={
                                            oppdaterEures.oppdateringHarFeil ? "border-danger" : "border-warning"
                                        }
                                        borderWidth="1"
                                    >
                                        <Heading className={styles.mb9} level="4" size="medium">
                                            Status for samtykke
                                        </Heading>
                                        <BodyLong>
                                            Du har ikke samtykket til å dele CV-opplysninger med den Europeiske
                                            Jobbmobilitetsportalen.
                                        </BodyLong>
                                        {oppdaterEures.oppdateringLaster ? (
                                            <HStack className={styles.samtykkeLoader}>
                                                <Loader size="medium" title="Venter..." />
                                                <BodyLong className={styles.samtykkeMargin}>Jeg samtykker</BodyLong>
                                            </HStack>
                                        ) : (
                                            <Checkbox
                                                onChange={onOppdaterSamtykke}
                                                className={styles.euresCheckbox}
                                                value="samtykker"
                                                disabled={!cv}
                                            >
                                                Jeg samtykker
                                            </Checkbox>
                                        )}
                                        {!cv && <ManglerCvAlert inline />}
                                    </Box>
                                )}
                            </div>
                        )}
                    </>
                </ExpansionCard.Content>
            </ExpansionCard>
            <TrekkSamtykkeModal
                open={openTrekkSamtykkeModal}
                setOpen={setOpenTrekkSamtykkeModal}
                onTrekkSamtykke={onTrekkSamtykke}
            />
        </>
    );
}
