import {
    // eslint-disable-next-line camelcase
    UNSAFE_Combobox,
    Alert,
    BodyLong,
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Chips,
    Heading,
    HStack,
    Link,
    VStack,
} from "@navikt/ds-react";
import { ArrowUndoIcon } from "@navikt/aksel-icons";
import styles from "@/app/page.module.css";
import { useOppdaterEures } from "@/app/_common/hooks/swr/useOppdaterEures";
import { useEures } from "@/app/_common/hooks/swr/useEures";
import { EuresKategoriEnum } from "@/app/_common/enums/EuresEnums";
import SamtykkeModal from "@/app/eures/components/SamtykkeModal";
import { useContext, useEffect, useState } from "react";
import { euLand } from "@/app/_common/data/euLand";
import { ApplicationContext } from "@/app/_common/contexts/ApplicationContext";
import { DeleInnholdSkeleton } from "@/app/_common/components/DeleInnholdSkeleton";
import ManglerPersonaliaModal from "@/app/eures/components/ManglerPersonaliaModal";
import InfoTekst from "@/app/eures/components/InfoTekst";
import InformasjonOmSamtykke from "@/app/eures/components/InformasjonOmSamtykke";
import { euresKategorier } from "@/app/_common/data/euresKategorier";
import { useErInnlogget } from "@/app/_common/hooks/swr/useErInnlogget";

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
    const { suksessNotifikasjon } = useContext(ApplicationContext);
    const { delerEures, euresLaster } = useEures();
    const oppdaterEures = useOppdaterEures();
    const { erInnlogget } = useErInnlogget();

    const [landVerdi, setLandVerdi] = useState("");
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

    const velgAlleKategorier = () => {
        const k = [];
        Object.values(EuresKategoriEnum).map((verdi) => k.push(verdi));
        suksessNotifikasjon(`Alle kategorier valgt`);
        setKategorier(k);
    };

    const fjernAlleKategorier = () => {
        setKategorier([]);
        suksessNotifikasjon(`Alle kategorier fjernet`);
    };

    const onKategorierChange = (e) => {
        if (e.length > kategorier.length) {
            const kat = e.filter((k) => !kategorier.includes(k));
            const formatertKategori = euresKategorier.filter((i) => i.kategori === kat[0]);
            suksessNotifikasjon(`${formatertKategori[0].kategoriTekst} valgt`);
        } else {
            const kat = kategorier.filter((k) => !e.includes(k));
            const formatertKategori = euresKategorier.filter((i) => i.kategori === kat[0]);
            suksessNotifikasjon(`${formatertKategori[0].kategoriTekst} fjernet`);
        }

        setKategorier(e);
        setValiderKategorier(false);
    };

    const initialLandliste = euLand.map((item) => item.name);
    initialLandliste.unshift("Velg alle");

    const onToggleSelected = (option, isSelected) => {
        if (isSelected) {
            suksessNotifikasjon(`${option} valgt`);
            setValiderLand(false);
            if (option === "Velg alle") {
                setLandSelectedOptions([...initialLandliste].slice(1));
            } else {
                setLandSelectedOptions([...landSelectedOptions, option].sort());
            }
        } else {
            setLandSelectedOptions(landSelectedOptions.filter((o) => o !== option));
        }
    };

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
                        {euresLaster ? (
                            <DeleInnholdSkeleton />
                        ) : (
                            <>
                                <CheckboxGroup
                                    className={styles.mb9}
                                    legend=""
                                    description="Kryss av for innholdet i CV-en din som du ønsker å dele."
                                    onChange={onKategorierChange}
                                    value={kategorier}
                                    error={validerKategorier && kategorier.length === 0 && "Du må velge minst et felt"}
                                >
                                    <HStack className={styles.mt9}>
                                        <VStack>
                                            <Checkbox id="kategorier" value="personalia">
                                                Personalia
                                            </Checkbox>
                                            <Checkbox value="utdanning">Utdanning</Checkbox>
                                            <Checkbox value="fagbrev">Fagbrev</Checkbox>
                                            <Checkbox value="arbeidserfaring">Arbeidsforhold</Checkbox>
                                            <Checkbox value="kompetanser">Kompetanser</Checkbox>
                                            <Checkbox value="offentligeGodkjenninger">
                                                Offentlige godkjenninger
                                            </Checkbox>
                                            <Checkbox value="andreGodkjenninger">Andre godkjenninger</Checkbox>
                                            <Checkbox value="spraak">Språk</Checkbox>
                                            <Checkbox value="foererkort">Førerkort</Checkbox>
                                            <Checkbox value="kurs">Kurs</Checkbox>
                                            <Checkbox value="sammendrag">Sammendrag</Checkbox>
                                        </VStack>
                                    </HStack>
                                </CheckboxGroup>
                                <HStack gap="6" className={styles.mb2}>
                                    {kategorier.length !== Object.keys(EuresKategoriEnum).length ? (
                                        <Button
                                            aria-label="Velg alle kategorier"
                                            className={styles.mb6}
                                            variant="primary"
                                            onClick={() => velgAlleKategorier()}
                                        >
                                            Velg alle kategorier
                                        </Button>
                                    ) : (
                                        <Button
                                            aria-label="Fjern alle kategorier"
                                            className={styles.mb6}
                                            variant="danger"
                                            onClick={() => fjernAlleKategorier()}
                                        >
                                            Fjern alle kategorier
                                        </Button>
                                    )}
                                    <Button
                                        aria-label="Se hva du ønsker å dele"
                                        className={styles.mb6}
                                        variant="secondary"
                                        onClick={() => setVisHovedinnhold(false)}
                                    >
                                        Se hva du ønsker å dele
                                    </Button>
                                </HStack>
                                <UNSAFE_Combobox
                                    id="land"
                                    className={styles.mb6}
                                    placeholder="Velg"
                                    label="Velg hvilke land du ønsker å jobbe i"
                                    description="Du kan velge flere land hvis du ønsker"
                                    shouldAutocomplete={false}
                                    isMultiSelect={false}
                                    onChange={(verdi) => setLandVerdi(verdi) || ""}
                                    onToggleSelected={onToggleSelected}
                                    selectedOptions={landSelectedOptions}
                                    shouldShowSelectedOptions={false}
                                    options={initialLandliste}
                                    value={landVerdi}
                                    error={
                                        validerLand && landSelectedOptions.length === 0 && "Du må velge minst et land"
                                    }
                                />
                                {landSelectedOptions.length === 0 ? (
                                    <BodyLong weight="regular" size="small" className={styles.mb12}>
                                        Du har ikke lagt til noen land som du ønsker å jobbe i
                                    </BodyLong>
                                ) : (
                                    <VStack>
                                        <BodyLong weight="regular" size="small" className={styles.mb3}>
                                            Lagt til:
                                        </BodyLong>
                                        <Chips className={styles.mb12}>
                                            {landSelectedOptions.map((valg) => (
                                                <Chips.Removable
                                                    key={valg}
                                                    onClick={() => {
                                                        setLandSelectedOptions((x) =>
                                                            x.length === 0
                                                                ? landSelectedOptions
                                                                : x.filter((y) => y !== valg),
                                                        );
                                                        suksessNotifikasjon(`${valg} fjernet`);
                                                    }}
                                                >
                                                    {valg}
                                                </Chips.Removable>
                                            ))}
                                        </Chips>
                                    </VStack>
                                )}
                            </>
                        )}
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
