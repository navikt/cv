import "@navikt/ds-css";
import { useState } from "react";
import {
    Box,
    HStack,
    VStack,
    Button,
    Link,
    Heading,
    BodyLong,
    CheckboxGroup,
    Checkbox,
    // eslint-disable-next-line camelcase
    UNSAFE_Combobox,
    Chips,
    Alert,
    ExpansionCard,
} from "@navikt/ds-react";
import HeaderPanel from "@/app/_common/components/HeaderPanel";
import ApplicationProvider from "@/app/_common/contexts/ApplicationContext";
import { ArrowUndoIcon } from "@navikt/aksel-icons";
import { EuresKategoriEnum } from "@/app/_common/enums/EuresEnums";
import SamtykkeTekst from "@/app/eures/components/SamtykkeTekst";
import SamtykkeModal from "@/app/eures/components/SamtykkeModal";
import { useEures } from "@/app/_common/hooks/swr/useEures";
import { euLand } from "@/app/_common/data/euLand";
import EuresForhandsvisning from "@/app/eures/components/EuresForhandsvisning";
import { useOppdaterEures } from "@/app/_common/hooks/swr/useOppdaterEures";
import TestEures from "@/app/eures/components/TestEures";
import styles from "../../page.module.css";

export default function EuresPage() {
    const { eures, delerEures, euresLaster, euresHarFeil, kategori, land } = useEures();
    const oppdateringprops = useOppdaterEures();
    const [kategorier, setKategorier] = useState([]);
    const [landSelectedOptions, setLandSelectedOptions] = useState([]);
    const [landVerdi, setLandVerdi] = useState("");
    const [visOppdater, setVisOppdater] = useState(false);
    const [samtykke, setSamtykke] = useState(false);
    const [open, setOpen] = useState(false);
    const [valider, setValider] = useState(false);
    const [visHovedinnhold, setVisHovedinnhold] = useState(true);

    const initKategorier = Object.keys(eures)
        .filter((k) => eures[k])
        .map(String)
        .slice(1, -1);
    setKategorier(initKategorier);

    const initSelectionLand = [];
    eures.land.forEach((code) => {
        const c = euLand.filter((i) => i.code === code)[0];
        if (c) {
            initSelectionLand.push(c.name);
        }
    });
    setLandSelectedOptions(initSelectionLand);

    const velgAlleKategorier = () => {
        const k = [];
        Object.values(EuresKategoriEnum).map((verdi) => k.push(verdi));
        setKategorier(k);
        setVisOppdater(true);
    };

    const fjernAlleKategorier = () => {
        setKategorier([]);
        setVisOppdater(true);
    };

    const landSelectedOptionsCode = [];
    landSelectedOptions.forEach((name) => {
        const c = euLand.filter((i) => i.name === name)[0];
        if (c) {
            landSelectedOptionsCode.push(c.code);
        }
    });

    const initialLandliste = euLand.map((item) => item.name);
    initialLandliste.unshift("Velg alle");

    const onToggleSelected = (option, isSelected) => {
        if (isSelected) {
            if (option === "Velg alle") {
                setLandSelectedOptions([...initialLandliste].slice(1));
            } else {
                setLandSelectedOptions([...landSelectedOptions, option]);
            }
        } else {
            setLandSelectedOptions(landSelectedOptions.filter((o) => o !== option));
        }
    };

    const oppdaterSamtykke = () => {
        oppdateringprops.triggerOppdatering({
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

        setVisOppdater(false);
    };

    const onKategorierChange = (e) => {
        setKategorier(e);
        setVisOppdater(true);
        setValider(false);
    };

    const onLandChange = (e) => {
        setLandVerdi(e);
        setVisOppdater(true);
        setValider(false);
    };

    const onSamtykkeChange = (e) => {
        setValider(true);
        if (kategorier.length === 0) {
            const element = document.getElementById("kategorier");
            element.focus();
            e.target.checked = false;
        } else if (landSelectedOptions.length === 0) {
            const element = document.getElementById("land");
            element.focus();
        } else {
            oppdaterSamtykke();
            setSamtykke((x) => !x);
        }
    };

    const onTrekkSamtykke = () => {
        setKategorier([]);
        setLandSelectedOptions([]);

        oppdateringprops.triggerOppdatering(null);
    };

    console.log("eures: ", eures && eures);
    console.log("delerEures: ", delerEures && delerEures);
    console.log("euresLaster: ", euresLaster && euresLaster);
    console.log("euresHarFeil: ", euresHarFeil && euresHarFeil);
    console.log("kategori: ", kategori);
    console.log("land: ", land);
    return (
        <ApplicationProvider>
            {visHovedinnhold ? (
                <div className={styles.euresBackground}>
                    <HeaderPanel title="CV-deling med den Europeiske jobbmobilitetsportalen" />

                    <HStack className={styles.pageContainer}>
                        <section>
                            <Box background="surface-default" className={styles.boxEures}>
                                <Link href="/min-cv">
                                    <ArrowUndoIcon aria-hidden />
                                    Tilbake til Min CV
                                </Link>

                                <div className={styles.euresLogo} />
                                <BodyLong className={styles.euresTekst}>EURES</BodyLong>
                                <Heading level="2" size="large" align="start" spacing>
                                    CV-deling med den Europeiske jobbmobilitetsportalen
                                </Heading>
                                <BodyLong size="small" weight="semibold" spacing>
                                    Hva er den Europeiske Jobbmobilitetsportalen?
                                </BodyLong>
                                <BodyLong size="small" spacing>
                                    Den Europeiske Jobbmobilitetsportalen er et tilbud til deg som ønsker å finne en
                                    jobb i jobb i jobb i EU/EØS-området og Sveits. Portalen gir deg muligheten til å
                                    gjøre CV-en din tilgjengelig tilgjengelig for arbeidsgivere i EU/EØS og Sveits ved å
                                    dele CV-en du har på arbeidsplassen.no.
                                </BodyLong>
                                <BodyLong size="small" spacing>
                                    Du kan også registrere din egen konto i den Europeiske Jobbmobilitetsportalen og
                                    legge inn CV-en legge inn CV-en selv. Registrerte brukere kan lage søkeprofiler, få
                                    varsel på e-post om om om om om stillinger eller abonnere på nyhetsbrev.
                                    Arbeidsgivere kan søke etter aktuelle kandidater. Du kan lese mer om den Europeiske
                                    Jobbmobilitetsportalen og hvilke muligheter og tjenester som ligger der ved å bruke
                                    lenken under.
                                </BodyLong>
                                <BodyLong spacing>
                                    Gå til den{" "}
                                    <Link rel="noopener noreferrer" href="https://eures.europa.eu/index_no" inlineText>
                                        Europeiske Jobbmobilitetsportalen
                                    </Link>
                                    .
                                </BodyLong>

                                <div className={styles.hvaVilDuDeleIcon} />
                                <Heading
                                    className={styles.textDecorationLine}
                                    level="3"
                                    size="medium"
                                    align="start"
                                    spacing
                                >
                                    Velg ut hva du vil dele
                                </Heading>
                                <BodyLong size="small" spacing>
                                    Du velger selv ut hva fra CV-en din som du ønsker å dele med den Europeiske
                                    jobbmobilitetsportalen. Du kan når som helst endre eller slette hva du deler.
                                </BodyLong>

                                <div className={styles.vilkarIcon} />
                                <Heading
                                    className={styles.textDecorationLine}
                                    level="3"
                                    size="medium"
                                    align="start"
                                    spacing
                                >
                                    Gjør deg kjent med vilkårene
                                </Heading>
                                <BodyLong size="small" spacing>
                                    Hvis du ønsker å dele informasjon med den Europeiske Jobbmobilitetsportalen, må du
                                    gjøre deg gjøre deg kjent med vilkårene for deling av CV før du samtykker til
                                    deling.
                                </BodyLong>
                                <BodyLong size="small" weight="semibold" spacing>
                                    Å samtykke er frivillig, og samtykket kan trekkes når som helst.
                                </BodyLong>

                                <div className={styles.delCVIcon} />
                                <Heading
                                    className={styles.textDecorationLine}
                                    level="3"
                                    size="medium"
                                    align="start"
                                    spacing
                                >
                                    Del CV-en din
                                </Heading>
                                <BodyLong className={styles.mb16} size="small">
                                    Når du deler CV-en din kan arbeidsgivere i EU/EØS og Sveits kontakte deg om
                                    jobbmuligheter.
                                </BodyLong>

                                <Heading level="3" size="medium" align="start" spacing>
                                    Hvilket innhold vil du dele?
                                </Heading>
                                <CheckboxGroup
                                    className={styles.mb9}
                                    legend=""
                                    description="Kryss av for innholdet i CV-en din som du ønsker å dele."
                                    onChange={onKategorierChange}
                                    value={kategorier}
                                    error={valider && kategorier.length === 0 && "Du må velge minst et felt"}
                                >
                                    <HStack className={styles.mt9}>
                                        <VStack>
                                            <Checkbox id="kategorier" value="personalia">
                                                Personalia
                                            </Checkbox>
                                            <Checkbox value="fagbrev">Fagbrev</Checkbox>
                                            <Checkbox value="arbeidserfaring">Arbeidsforhold</Checkbox>
                                            <Checkbox value="foererkort">Førerkort</Checkbox>
                                            <Checkbox value="sammendrag">Sammendrag</Checkbox>
                                            <Checkbox value="andreGodkjenninger">Andre godkjenninger</Checkbox>
                                        </VStack>
                                        <VStack>
                                            <Checkbox value="utdanning">Utdanning</Checkbox>
                                            <Checkbox value="kurs">Kurs</Checkbox>
                                            <Checkbox value="kompetanser">Kompetanser</Checkbox>
                                            <Checkbox value="spraak">Språk</Checkbox>
                                            <Checkbox value="offentligeGodkjenninger">
                                                Offentlige godkjenninger
                                            </Checkbox>
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
                                    onChange={onLandChange}
                                    onToggleSelected={onToggleSelected}
                                    selectedOptions={landSelectedOptions}
                                    shouldShowSelectedOptions={false}
                                    options={initialLandliste}
                                    value={landVerdi}
                                    error={valider && landSelectedOptions.length === 0 && "Du må velge minst et land"}
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
                                                        setVisOppdater(true);
                                                    }}
                                                >
                                                    {valg}
                                                </Chips.Removable>
                                            ))}
                                        </Chips>
                                    </VStack>
                                )}
                                {visOppdater && (
                                    <Alert variant="warning" className={styles.mb12}>
                                        <HStack className={styles.mb6}>
                                            For å lagre endringene dine må du oppdatere samtykke ditt
                                        </HStack>
                                        <HStack>
                                            <Button
                                                aria-label="Oppdater samtykke"
                                                className={[styles.mb2, styles.oppdaterSamtykkeButton]}
                                                variant="primary"
                                                onClick={() => oppdaterSamtykke()}
                                            >
                                                Oppdater samtykke
                                            </Button>
                                        </HStack>
                                    </Alert>
                                )}
                                <ExpansionCard size="small" aria-label="Demo med bare tittel">
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
                                                    className={[styles.mt4, styles.mb1]}
                                                    size="small"
                                                    variant="secondary"
                                                    onClick={() => setOpen(true)}
                                                >
                                                    Les mer om samtykke
                                                </Button>
                                            </BodyLong>
                                            <div className={styles.mb5}>
                                                <div className={styles.borderEures} />
                                            </div>
                                            <Box
                                                background={
                                                    samtykke ? "surface-success-subtle" : "surface-warning-subtle"
                                                }
                                                padding="4"
                                                borderRadius="medium"
                                                borderColor={samtykke ? "border-success" : "border-warning"}
                                                borderWidth="1"
                                            >
                                                <Heading className={styles.mb9} level="4" size="medium">
                                                    Status for samtykke
                                                </Heading>
                                                <BodyLong>
                                                    Du har ikke samtykket til å dele CV-opplysninger med den Europeiske
                                                    Jobbmobilitetsportalen.
                                                </BodyLong>
                                                {samtykke ? (
                                                    <Button
                                                        className={[styles.mt4, styles.mb1, styles.button]}
                                                        size="small"
                                                        variant="secondary"
                                                        onClick={() => onTrekkSamtykke()}
                                                    >
                                                        Trekk samtykke
                                                    </Button>
                                                ) : (
                                                    <Checkbox
                                                        onChange={onSamtykkeChange}
                                                        className={styles.euresCheckbox}
                                                        value="samtykker"
                                                    >
                                                        Jeg samtykker
                                                    </Checkbox>
                                                )}
                                            </Box>
                                        </>
                                    </ExpansionCard.Content>
                                </ExpansionCard>
                            </Box>
                            {open && <SamtykkeModal open={open} setOpen={setOpen} />}
                        </section>
                    </HStack>
                    <TestEures />
                </div>
            ) : (
                <>
                    <HeaderPanel title="CV-innhold du ønsker å dele" />
                    <EuresForhandsvisning setVisHovedinnhold={setVisHovedinnhold} kategorier={kategorier} />
                </>
            )}
        </ApplicationProvider>
    );
}
