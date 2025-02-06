"use client";

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
    ConfirmationPanel,
} from "@navikt/ds-react";
import HeaderPanel from "@/app/_common/components/HeaderPanel";
import ApplicationProvider from "@/app/_common/contexts/ApplicationContext";
import { ArrowUndoIcon } from "@navikt/aksel-icons";
import { EuresKategoriEnum } from "@/app/_common/enums/EuresEnums";
import SamtykkeTekst from "@/app/eures/components/SamtykkeTekst";
import SamtykkeModal from "@/app/eures/components/SamtykkeModal";
import { useHentEuresSamtykke } from "@/app/_common/hooks/swr/useHentEuresSamtykke";
import { euLand } from "@/app/_common/data/euLand";
import styles from "../../page.module.css";
import { samtykkeEuresMock } from "../../../../mocks/samtykkeEuresMock";

export default function EuresPage() {
    const initKategorier = Object.keys(samtykkeEuresMock)
        .filter((k) => samtykkeEuresMock[k])
        .map(String)
        .slice(1, -1);

    const initSelectionLand = [];
    samtykkeEuresMock.land.forEach((code) => {
        const c = euLand.filter((i) => i.code === code)[0];
        if (c) {
            initSelectionLand.push(c.name);
        }
    });

    const { delerEures } = useHentEuresSamtykke();

    const [kategorier, setKategorier] = useState(initKategorier);
    const [landVerdi, setLandVerdi] = useState("");
    const [landSelectedOptions, setLandSelectedOptions] = useState(initSelectionLand);
    const [visOppdater, setVisOppdater] = useState(false);
    const [samtykke, setSamtykke] = useState(false);
    const [open, setOpen] = useState(false);

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

    const OppdaterSamtykke = () => {
        samtykkeEuresMock.personalia = kategorier.includes(EuresKategoriEnum.PERSONALIA);
        samtykkeEuresMock.kurs = kategorier.includes(EuresKategoriEnum.KURS);
        samtykkeEuresMock.spraak = kategorier.includes(EuresKategoriEnum.SPRÅK);
        samtykkeEuresMock.utdanning = kategorier.includes(EuresKategoriEnum.UTDANNING);
        samtykkeEuresMock.sammendrag = kategorier.includes(EuresKategoriEnum.SAMMENDRAG);
        samtykkeEuresMock.kompetanser = kategorier.includes(EuresKategoriEnum.KOMPETANSER);
        samtykkeEuresMock.andreGodkjenninger = kategorier.includes(EuresKategoriEnum.ANDRE_GODKJENNINGER);
        samtykkeEuresMock.offentligeGodkjenninger = kategorier.includes(EuresKategoriEnum.OFFENTLIGE_GODKJENNINGER);
        samtykkeEuresMock.foererkort = kategorier.includes(EuresKategoriEnum.FØRERKORT);
        samtykkeEuresMock.arbeidserfaring = kategorier.includes(EuresKategoriEnum.ARBEIDSFORHOLD);
        samtykkeEuresMock.fagbrev = kategorier.includes(EuresKategoriEnum.FAGBREV);

        samtykkeEuresMock.land = landSelectedOptionsCode;

        setVisOppdater(false);

        console.log(samtykkeEuresMock);
    };

    const onKategorierChange = (e) => {
        setKategorier(e);
        setVisOppdater(true);
    };

    const onLandChange = (e) => {
        setLandVerdi(e);
        setVisOppdater(true);
    };

    const onSamtykkeChange = () => {
        setSamtykke((x) => !x);
    };

    console.log(delerEures);
    return (
        <ApplicationProvider>
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
                                Den Europeiske Jobbmobilitetsportalen er et tilbud til deg som ønsker å finne en jobb i
                                jobb i jobb i EU/EØS-området og Sveits. Portalen gir deg muligheten til å gjøre CV-en
                                din tilgjengelig tilgjengelig for arbeidsgivere i EU/EØS og Sveits ved å dele CV-en du
                                har på arbeidsplassen.no.
                            </BodyLong>
                            <BodyLong size="small" spacing>
                                Du kan også registrere din egen konto i den Europeiske Jobbmobilitetsportalen og legge
                                inn CV-en legge inn CV-en selv. Registrerte brukere kan lage søkeprofiler, få varsel på
                                e-post om om om om om stillinger eller abonnere på nyhetsbrev. Arbeidsgivere kan søke
                                etter aktuelle kandidater. Du kan lese mer om den Europeiske Jobbmobilitetsportalen og
                                hvilke muligheter og tjenester som ligger der ved å bruke lenken under.
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
                                Hvis du ønsker å dele informasjon med den Europeiske Jobbmobilitetsportalen, må du gjøre
                                deg gjøre deg kjent med vilkårene for deling av CV før du samtykker til deling.
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
                                error={kategorier.length === 0 && "Du må velge minst et felt"}
                            >
                                <HStack className={styles.mt9}>
                                    <VStack>
                                        <Checkbox value="personalia">Personalia</Checkbox>
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
                                        <Checkbox value="offentligeGodkjenninger">Offentlige godkjenninger</Checkbox>
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
                                <Button aria-label="Se hva du ønsker å dele" className={styles.mb6} variant="secondary">
                                    Se hva du ønsker å dele
                                </Button>
                            </HStack>
                            <UNSAFE_Combobox
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
                                            onClick={() => OppdaterSamtykke()}
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
                                                onClick={() => setOpen(true)}
                                            >
                                                Les mer om samtykke
                                            </Button>
                                        </BodyLong>
                                        <div className={styles.mb5}>
                                            <div className={styles.borderEures} />
                                        </div>

                                        <ConfirmationPanel
                                            checked={samtykke}
                                            label="Jeg samtykker"
                                            onChange={onSamtykkeChange}
                                        >
                                            <Heading className={styles.mb9} level="4" size="medium">
                                                Status for samtykke
                                            </Heading>
                                            <BodyLong>
                                                Du har ikke samtykket til å dele CV-opplysninger med den Europeiske
                                                Jobbmobilitetsportalen.
                                            </BodyLong>
                                        </ConfirmationPanel>
                                    </>
                                </ExpansionCard.Content>
                            </ExpansionCard>
                        </Box>
                        {open && <SamtykkeModal open={open} setOpen={setOpen} />}
                    </section>
                </HStack>
            </div>
        </ApplicationProvider>
    );
}
