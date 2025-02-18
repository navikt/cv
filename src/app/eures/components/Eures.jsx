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
    ExpansionCard,
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
import SamtykkeTekst from "@/app/eures/components/SamtykkeTekst";
import SamtykkeModal from "@/app/eures/components/SamtykkeModal";
import { useContext, useState } from "react";
import { euLand } from "@/app/_common/data/euLand";
import { formatterDatoEttAarFremITid } from "@/app/_common/utils/stringUtils";
import { ApplicationContext } from "@/app/_common/contexts/ApplicationContext";
import { DeleInnholdSkeleton } from "@/app/_common/components/DeleInnholdSkeleton";
import { SamtykkeSkeleton } from "@/app/_common/components/SamtykkeSkeleton";
import TrekkSamtykkeModal from "@/app/eures/components/TrekkSamtykkeModal";
import OppdaterSamtykkeModal from "@/app/eures/components/OppdaterSamtykkeModal";

export default function Eures({
    eures,
    kategorier,
    setKategorier,
    landSelectedOptions,
    setLandSelectedOptions,
    setVisHovedinnhold,
}) {
    const { suksessNotifikasjon } = useContext(ApplicationContext);
    const { delerEures, euresLaster, euresHarFeil } = useEures();
    const oppdaterEures = useOppdaterEures();
    const [landVerdi, setLandVerdi] = useState("");
    const [visOppdater, setVisOppdater] = useState(false);
    const [openSamtykkeModal, setOpenSamtykkeModal] = useState(false);
    const [openTrekkSamtykkeModal, setOpenTrekkSamtykkeModal] = useState(false);
    const [openOppdaterSamtykkeModal, setOpenOppdaterSamtykkeModal] = useState(false);
    const [validerKategorier, setValiderKategorier] = useState(false);
    const [validerLand, setValiderLand] = useState(false);

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
            suksessNotifikasjon(`${option} valgt`);
            setVisOppdater(true);
            setValiderLand(false);
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

        setVisOppdater(false);
    };

    const onKategorierChange = (e) => {
        setKategorier(e);
        setVisOppdater(true);
        setValiderKategorier(false);
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
            setOpenOppdaterSamtykkeModal(true);
        }
    };

    const onOppdaterUtenPersonalia = () => {
        setOpenOppdaterSamtykkeModal(false);
        oppdaterSamtykke();
    };

    const onTrekkSamtykke = () => {
        setValiderKategorier(false);
        setValiderLand(false);
        setKategorier([]);
        setLandSelectedOptions([]);
        setOpenTrekkSamtykkeModal(false);
        oppdaterEures.triggerOppdatering(null);
    };

    console.log("eures: ", eures && eures);
    console.log("delerEures: ", delerEures && delerEures);
    console.log("euresLaster: ", euresLaster && euresLaster);
    console.log("euresHarFeil: ", euresHarFeil && euresHarFeil);
    return (
        <div className={styles.euresBackground}>
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
                            EU/EØS-området og Sveits. Portalen gir deg muligheten til å gjøre CV-en din tilgjengelig for
                            arbeidsgivere i EU/EØS og Sveits ved å dele CV-en du har på nav.no.
                        </BodyLong>
                        <BodyLong size="small" spacing>
                            Du kan også registrere din egen konto i den Europeiske Jobbmobilitetsportalen og legge inn
                            CV-en selv. Registrerte brukere kan lage søkeprofiler, få varsel på e-post om stillinger
                            eller abonnere på nyhetsbrev. Arbeidsgivere kan søke etter aktuelle kandidater. Du kan lese
                            mer om den Europeiske Jobbmobilitetsportalen og hvilke muligheter og tjenester som ligger
                            der ved å bruke lenken under.
                        </BodyLong>
                        <BodyLong spacing>
                            Gå til den{" "}
                            <Link rel="noopener noreferrer" href="https://eures.europa.eu/index_no" inlineText>
                                Europeiske Jobbmobilitetsportalen
                            </Link>
                            .
                        </BodyLong>

                        <div className={styles.hvaVilDuDeleIcon} />
                        <Heading className={styles.textDecorationLine} level="3" size="medium" align="start" spacing>
                            Velg ut hva du vil dele
                        </Heading>
                        <BodyLong size="small" spacing>
                            Du velger selv ut hva fra CV-en din som du ønsker å dele med den Europeiske
                            jobbmobilitetsportalen. Du kan når som helst endre eller slette hva du deler.
                        </BodyLong>

                        <div className={styles.vilkarIcon} />
                        <Heading className={styles.textDecorationLine} level="3" size="medium" align="start" spacing>
                            Gjør deg kjent med vilkårene
                        </Heading>
                        <BodyLong size="small" spacing>
                            Hvis du ønsker å dele informasjon med den Europeiske Jobbmobilitetsportalen, må du gjøre deg
                            kjent med vilkårene for deling av CV før du samtykker til deling.
                        </BodyLong>
                        <BodyLong size="small" weight="semibold" spacing>
                            Å samtykke er frivillig, og samtykket kan trekkes når som helst.
                        </BodyLong>

                        <div className={styles.delCVIcon} />
                        <Heading className={styles.textDecorationLine} level="3" size="medium" align="start" spacing>
                            Del CV-en din
                        </Heading>
                        <BodyLong className={styles.mb16} size="small">
                            Når du deler CV-en din kan arbeidsgivere i EU/EØS og Sveits kontakte deg om jobbmuligheter.
                        </BodyLong>

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
                                                        setVisOppdater(true);
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
                            <Alert variant="warning" className={styles.mb12}>
                                <HStack className={styles.mb6}>
                                    For å lagre endringene dine må du oppdatere samtykke ditt
                                </HStack>
                                <HStack>
                                    <Button
                                        aria-label="Oppdater samtykke"
                                        className={`${styles.mb2} ${styles.oppdaterSamtykkeButton}`}
                                        variant="primary"
                                        onClick={() => onOppdaterSamtykke()}
                                    >
                                        Oppdater samtykke
                                    </Button>
                                </HStack>
                            </Alert>
                        )}
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
                                            onClick={() => setOpenSamtykkeModal(true)}
                                        >
                                            Les mer om samtykke
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
                                                    background="surface-success-subtle"
                                                    padding="4"
                                                    borderRadius="medium"
                                                    borderColor="border-success"
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
                                                        onClick={() => setOpenTrekkSamtykkeModal(true)}
                                                    >
                                                        Trekk samtykke
                                                    </Button>
                                                </Box>
                                            ) : (
                                                <Box
                                                    background="surface-warning-subtle"
                                                    padding="4"
                                                    borderRadius="medium"
                                                    borderColor="border-warning"
                                                    borderWidth="1"
                                                >
                                                    <Heading className={styles.mb9} level="4" size="medium">
                                                        Status for samtykke
                                                    </Heading>
                                                    <BodyLong>
                                                        Du har ikke samtykket til å dele CV-opplysninger med den
                                                        Europeiske Jobbmobilitetsportalen.
                                                    </BodyLong>
                                                    <Checkbox
                                                        onChange={onOppdaterSamtykke}
                                                        className={styles.euresCheckbox}
                                                        value="samtykker"
                                                    >
                                                        Jeg samtykker
                                                    </Checkbox>
                                                </Box>
                                            )}
                                        </div>
                                    )}
                                </>
                            </ExpansionCard.Content>
                        </ExpansionCard>
                    </Box>
                    <SamtykkeModal open={openSamtykkeModal} setOpen={setOpenSamtykkeModal} />
                    <OppdaterSamtykkeModal
                        open={openOppdaterSamtykkeModal}
                        setOpen={setOpenOppdaterSamtykkeModal}
                        onOppdaterUtenPersonalia={onOppdaterUtenPersonalia}
                    />
                    <TrekkSamtykkeModal
                        open={openTrekkSamtykkeModal}
                        setOpen={setOpenTrekkSamtykkeModal}
                        onTrekkSamtykke={onTrekkSamtykke}
                    />
                </section>
            </HStack>
        </div>
    );
}
