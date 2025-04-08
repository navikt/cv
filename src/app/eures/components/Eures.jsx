import { Alert, Box, Button, Heading, HStack, Link } from "@navikt/ds-react";
import { ArrowUndoIcon } from "@navikt/aksel-icons";
import styles from "@/app/page.module.css";
import { useOppdaterEures } from "@/app/_common/hooks/swr/useOppdaterEures";
import { useEures } from "@/app/_common/hooks/swr/useEures";
import { EuresKategoriEnum } from "@/app/_common/enums/EuresEnums";
import SamtykkeModal from "@/app/eures/components/SamtykkeModal";
import { useEffect, useState } from "react";
import { euLand } from "@/app/_common/data/euLand";
import ManglerPersonaliaModal from "@/app/eures/components/ManglerPersonaliaModal";
import InfoTekst from "@/app/eures/components/InfoTekst";
import InformasjonOmSamtykke from "@/app/eures/components/InformasjonOmSamtykke";
import { useErInnlogget } from "@/app/_common/hooks/swr/useErInnlogget";
import DeleInnhold from "@/app/eures/components/DeleInnhold";

export default function Eures({
    eures,
    initKategorier,
    initLand,
    kategorier,
    setKategorier,
    landSelectedOptions,
    setLandSelectedOptions,
    setVisHovedinnhold,
}) {
    const { delerEures, euresLaster } = useEures();
    const oppdaterEures = useOppdaterEures();
    const { erInnlogget } = useErInnlogget();

    const [visOppdater, setVisOppdater] = useState(false);
    const [samtykkeModal, setSamtykkeModal] = useState(false);
    const [manglerPersonaliaModal, setManglerPersonaliaModal] = useState(false);
    const [validerKategorier, setValiderKategorier] = useState(false);
    const [validerLand, setValiderLand] = useState(false);

    useEffect(() => {
        if (!oppdaterEures.oppdateringHarFeil && !oppdaterEures.oppdateringLaster) {
            if (initKategorier) {
                if (erVerdiEndret(initKategorier, kategorier) && erVerdiEndret(initLand, landSelectedOptions)) {
                    setVisOppdater(false);
                } else {
                    setVisOppdater(true);
                }
            }
        }
    }, [
        oppdaterEures.oppdateringHarFeil,
        oppdaterEures.oppdateringLaster,
        kategorier,
        initKategorier,
        visOppdater,
        initLand,
        landSelectedOptions,
    ]);

    const erVerdiEndret = (verdi, type) =>
        verdi.length === type.length && verdi.sort().every((value, index) => value === type.sort()[index]);

    const initialLandliste = euLand.map((item) => item.name);
    initialLandliste.unshift("Velg alle");

    const onOppdaterSamtykke = (e) => {
        setValiderKategorier(true);
        setValiderLand(true);

        if (kategorier.length === 0) {
            if (e) e.target.checked = false;
            const element = document.getElementById("kategorier");
            element.focus();
        } else if (landSelectedOptions.length === 0) {
            if (e) e.target.checked = false;
            const element = document.getElementById("land");
            element.focus();
        } else if (kategorier.includes(EuresKategoriEnum.PERSONALIA)) {
            oppdaterSamtykke();
        } else {
            if (e) e.target.checked = false;
            setManglerPersonaliaModal(true);
        }
    };

    const onOppdaterUtenPersonalia = () => {
        setManglerPersonaliaModal(false);
        oppdaterSamtykke();
    };

    const landSelectedOptionsCode = [];
    landSelectedOptions.forEach((name) => {
        const c = euLand.filter((i) => i.name === name)[0];
        if (c) {
            landSelectedOptionsCode.push(c.code);
        }
    });

    const oppdaterSamtykke = () => {
        oppdaterEures.triggerOppdatering({
            personalia: kategorier.includes(EuresKategoriEnum.PERSONALIA),
            jobboensker: kategorier.includes(EuresKategoriEnum.JOBBØNSKER),
            utdanning: kategorier.includes(EuresKategoriEnum.UTDANNING),
            fagbrev: kategorier.includes(EuresKategoriEnum.FAGBREV),
            arbeidserfaring: kategorier.includes(EuresKategoriEnum.ARBEIDSFORHOLD),
            foererkort: kategorier.includes(EuresKategoriEnum.FØRERKORT),
            offentligeGodkjenninger: kategorier.includes(EuresKategoriEnum.OFFENTLIGE_GODKJENNINGER),
            andreGodkjenninger: kategorier.includes(EuresKategoriEnum.ANDRE_GODKJENNINGER),
            kurs: kategorier.includes(EuresKategoriEnum.KURS),
            spraak: kategorier.includes(EuresKategoriEnum.SPRÅK),
            sammendrag: kategorier.includes(EuresKategoriEnum.SAMMENDRAG),
            kompetanser: kategorier.includes(EuresKategoriEnum.KOMPETANSER),
            land: landSelectedOptionsCode,
        });
    };

    return (
        <div className={styles.euresBackground}>
            <HStack className={`${styles.pageContainer} ${!erInnlogget && styles.visibilityHidden}`}>
                <section>
                    <Box background="surface-default" className={styles.boxEures}>
                        <Link href="/min-cv">
                            <ArrowUndoIcon aria-hidden />
                            Tilbake til Min CV
                        </Link>

                        <InfoTekst />

                        <Heading level="3" size="medium" align="start" spacing>
                            Hvilket innhold vil du dele?
                        </Heading>
                        <DeleInnhold
                            kategorier={kategorier}
                            setValiderKategorier={setValiderKategorier}
                            setValiderLand={setValiderLand}
                            setKategorier={setKategorier}
                            validerKategorier={validerKategorier}
                            validerLand={validerLand}
                            initialLandliste={initialLandliste}
                            landSelectedOptions={landSelectedOptions}
                            setLandSelectedOptions={setLandSelectedOptions}
                            setVisHovedinnhold={setVisHovedinnhold}
                        />
                        {delerEures && visOppdater && (
                            <Alert
                                variant={oppdaterEures.oppdateringHarFeil ? "error" : "warning"}
                                className={styles.mb12}
                            >
                                {oppdaterEures.oppdateringHarFeil ? (
                                    <HStack className={styles.mb6}>Det oppstod en feil ved lagring</HStack>
                                ) : (
                                    <HStack className={styles.mb6}>
                                        For å lagre endringene dine må du oppdatere samtykke ditt
                                    </HStack>
                                )}
                                <HStack>
                                    <Button
                                        aria-label="Oppdater samtykke"
                                        className={`${styles.mb2} ${styles.oppdaterSamtykkeButton}`}
                                        variant="primary"
                                        loading={oppdaterEures.oppdateringLaster}
                                        onClick={() => onOppdaterSamtykke()}
                                    >
                                        Oppdater samtykke
                                    </Button>
                                </HStack>
                            </Alert>
                        )}

                        <InformasjonOmSamtykke
                            eures={eures}
                            delerEures={delerEures}
                            euresLaster={euresLaster}
                            setSamtykkeModal={setSamtykkeModal}
                            onOppdaterSamtykke={onOppdaterSamtykke}
                            setValiderKategorier={setValiderKategorier}
                            setValiderLand={setValiderLand}
                            setKategorier={setKategorier}
                            setLandSelectedOptions={setLandSelectedOptions}
                            oppdaterEures={oppdaterEures}
                        />
                    </Box>
                    <SamtykkeModal open={samtykkeModal} setOpen={setSamtykkeModal} />
                    <ManglerPersonaliaModal
                        open={manglerPersonaliaModal}
                        setOpen={setManglerPersonaliaModal}
                        onOppdaterUtenPersonalia={onOppdaterUtenPersonalia}
                    />
                </section>
            </HStack>
        </div>
    );
}
