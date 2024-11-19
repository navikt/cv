import { HStack, Select, VStack } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import førerkortData from "@/app/_common/data/førerkort.json";
import { DatovelgerWithoutValidation } from "@/app/(minCV)/_components/datovelger/DatovelgerWithoutValidation";
import { CvModalForm } from "@/app/_common/components/CvModalForm";
import { ValidationErrors } from "@/app/_common/components/ValidationErrors";
import { dateStringSchema, handleZodValidation, revalidateExplicitValue } from "@/app/_common/utils/validationHelper";
import z from "zod";

export default function FørerkortModal({ modalÅpen, toggleModal, gjeldendeElement, lagreElement, laster, feilet }) {
    const [errors, setErrors] = useState({});
    const [shouldAutoFocusErrors, setShouldAutoFocusErrors] = useState(false);
    const [valgtFørerkort, setValgtFørerkort] = useState(gjeldendeElement || null);
    const [gyldigFra, setGyldigFra] = useState(
        gjeldendeElement?.acquiredDate ? new Date(gjeldendeElement.acquiredDate) : null,
    );
    const [gyldigTil, setGyldigTil] = useState(
        gjeldendeElement?.expiryDate ? new Date(gjeldendeElement.expiryDate) : null,
    );
    const [kreverDato, setKreverDato] = useState(!!gjeldendeElement?.acquiredDate);
    const [valgtForerkortError, setValgtForerkortError] = useState(false);
    const [gyldigFraError, setGyldigFraError] = useState(false);
    const [gyldigTilError, setGyldigTilError] = useState(false);
    const [skalViseDatofeilmelding, setSkalviseDatofeilmelding] = useState(false);

    const { gyldigeFørerkort } = førerkortData;

    useEffect(() => {
        const oppdaterFørerkort = (førerkort) => setValgtFørerkort(førerkort);
        oppdaterFørerkort(gjeldendeElement || []);
    }, [gjeldendeElement]);

    const velgFørerkort = (verdi) => {
        const funnetFørerkort = gyldigeFørerkort.find((e) => e.type === verdi);
        setValgtFørerkort(funnetFørerkort);
        setKreverDato(funnetFørerkort?.kreverDato || false);
        setValgtForerkortError(false);
    };

    const driverLicenseSchema = z.object({
        type: z.string().min(1, "Stilling/yrke må fylles ut"),
    });

    const driverLicenseSchemaWithDates = driverLicenseSchema
        .extend({
            acquiredDate: dateStringSchema.refine((data) => data <= new Date(), {
                message: "Dato kan ikke være frem i tid",
            }),
            expiryDate: dateStringSchema,
        })
        .refine((data) => data.toDate >= data.expiryDate, {
            path: ["toDate"],
            message: "Til dato må være etter fra dato",
        });

    const lagre = async () => {
        setSkalviseDatofeilmelding(true);
        if (!valgtFørerkort || valgtFørerkort.length === 0) setErrors({ type: "Du må velge førerkort" });
        if (kreverDato && (gyldigTilError || gyldigFraError)) return;

        if (valgtFørerkort && valgtFørerkort.length !== 0 && (kreverDato ? gyldigFra && gyldigTil : true)) {
            lagreElement({
                type: valgtFørerkort.label || valgtFørerkort.type,
                acquiredDate: gyldigFra,
                expiryDate: gyldigTil,
            });
        }
    };

    return (
        <CvModalForm
            modalÅpen={modalÅpen}
            tittel="Legg til førerkort"
            feilet={feilet}
            laster={laster}
            handleFormSubmit={lagre}
            toggleModal={toggleModal}
            overflowVisible
        >
            <VStack>
                <Select
                    id="type"
                    name="type"
                    label="Førerkort"
                    description="Må fylles ut"
                    className={styles.mb6}
                    value={valgtFørerkort?.type || ""}
                    onChange={(e) => velgFørerkort(e.target.value)}
                    error={errors?.type}
                >
                    <option value={null}>Velg</option>
                    {gyldigeFørerkort.map((e) => (
                        <option key={e.type} value={e.type}>
                            {e.type}
                        </option>
                    ))}
                </Select>
                {kreverDato && (
                    <>
                        <HStack gap="8">
                            <DatovelgerWithoutValidation
                                id="acquiredDate"
                                name="acquiredDate"
                                valgtDato={gyldigFra}
                                oppdaterDato={setGyldigFra}
                                label="Gyldig fra"
                                obligatorisk
                                setError={setGyldigFraError}
                                skalViseFeilmelding={skalViseDatofeilmelding}
                                setSkalViseFeilmelding={setSkalviseDatofeilmelding}
                            />
                            <DatovelgerWithoutValidation
                                id="expiryDate"
                                name="expiryDate"
                                valgtDato={gyldigTil}
                                oppdaterDato={setGyldigTil}
                                label="Gyldig til"
                                obligatorisk
                                fremtid
                                setError={setGyldigTilError}
                                skalViseFeilmelding={skalViseDatofeilmelding}
                                setSkalViseFeilmelding={setSkalviseDatofeilmelding}
                            />
                        </HStack>
                        <ValidationErrors shouldAutoFocusErrors={shouldAutoFocusErrors} validationErrors={errors} />
                    </>
                )}
            </VStack>
        </CvModalForm>
    );
}
