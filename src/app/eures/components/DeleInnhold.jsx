import { DeleInnholdSkeleton } from "@/app/_common/components/DeleInnholdSkeleton";
import ManglerCvAlert from "@/app/eures/components/ManglerCvAlert";
// eslint-disable-next-line camelcase
import { BodyLong, Button, Checkbox, CheckboxGroup, Chips, HStack, UNSAFE_Combobox, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { euresKategorier } from "@/app/_common/data/euresKategorier";
import { EuresKategoriEnum } from "@/app/_common/enums/EuresEnums";
import { useEures } from "@/app/_common/hooks/swr/useEures";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { useContext, useState } from "react";
import { ApplicationContext } from "@/app/_common/contexts/ApplicationContext";
import { cvHarInnhold } from "@/app/_common/utils/cvUtils";

export default function DeleInnhold({
    setVisHovedinnhold,
    setKategorier,
    kategorier,
    setValiderKategorier,
    validerKategorier,
    initialLandliste,
    setValiderLand,
    validerLand,
    setLandSelectedOptions,
    landSelectedOptions,
}) {
    const { suksessNotifikasjon } = useContext(ApplicationContext);
    const { delerEures, euresLaster } = useEures();
    const { cv, cvLaster } = useCv();

    const [landVerdi, setLandVerdi] = useState("");

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

    if (euresLaster || cvLaster) return <DeleInnholdSkeleton />;
    if (!delerEures && !cvHarInnhold(cv)) return <ManglerCvAlert />;

    return (
        <>
            <CheckboxGroup
                className={styles.mb9}
                id="kategorier"
                legend=""
                description="Kryss av for innholdet i CV-en din som du ønsker å dele."
                onChange={onKategorierChange}
                value={kategorier}
                error={validerKategorier && kategorier.length === 0 && "Du må velge minst et felt"}
            >
                <HStack className={styles.mt9}>
                    <VStack>
                        {euresKategorier.map((kategori) => (
                            <Checkbox key={kategori.kategori} value={kategori.kategori}>
                                {kategori.kategoriTekst}
                            </Checkbox>
                        ))}
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
                error={validerLand && landSelectedOptions.length === 0 && "Du må velge minst et land"}
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
                                        x.length === 0 ? landSelectedOptions : x.filter((y) => y !== valg),
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
    );
}
