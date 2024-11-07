import { BodyLong, HStack, TextField } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import { Typeahead } from "@/app/(minCV)/_components/typeahead/Typeahead";
import styles from "@/app/page.module.css";
import { Datovelger } from "@/app/(minCV)/_components/datovelger/Datovelger";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";
import { CvModalForm } from "@/app/_common/components/CvModalForm";

export default function AndreGodkjenningerModal({
    modalÅpen,
    toggleModal,
    gjeldendeElement,
    lagreElement,
    laster,
    feilet,
    triggerOppdatering,
}) {
    const [valgtGodkjenning, setValgtGodkjenning] = useState(gjeldendeElement || null);
    const [utsteder, setUtsteder] = useState(gjeldendeElement?.issuer || "");
    const [godkjenningFraDato, setGodkjenningFraDato] = useState(
        gjeldendeElement?.fromDate ? new Date(gjeldendeElement.fromDate) : null,
    );
    const [godkjenningTilDato, setGodkjenningTilDato] = useState(
        gjeldendeElement?.toDate ? new Date(gjeldendeElement.toDate) : null,
    );
    const [valgtGodkjenningError, setValgtGodkjenningError] = useState(false);
    const [godkjenningFraDatoError, setGodkjenningFraDatoError] = useState(false);
    const [godkjenningTilDatoError, setGodkjenningTilDatoError] = useState(false);

    useEffect(() => {
        const oppdaterGodkjenning = (godkjenning) => {
            setValgtGodkjenning(godkjenning);
            setUtsteder(godkjenning?.issuer || "");
            setGodkjenningFraDato(godkjenning?.fromDate ? new Date(godkjenning.fromDate) : null);
            setGodkjenningTilDato(godkjenning?.toDate ? new Date(godkjenning.toDate) : null);
        };
        oppdaterGodkjenning(gjeldendeElement || []);
    }, [gjeldendeElement]);

    const lagre = () => {
        if (!valgtGodkjenning || valgtGodkjenning.length === 0) setValgtGodkjenningError(true);
        if (!godkjenningFraDato) setGodkjenningFraDatoError(true);

        if (valgtGodkjenning && valgtGodkjenning.length !== 0 && godkjenningFraDato && !godkjenningTilDatoError) {
            lagreElement(
                {
                    certificateName: valgtGodkjenning.title || valgtGodkjenning.certificateName,
                    conceptId: valgtGodkjenning.conceptId,
                    issuer: utsteder,
                    fromDate: godkjenningFraDato,
                    toDate: godkjenningTilDato,
                },
                triggerOppdatering,
            );
        }
    };

    const oppdaterValgtGodkjenning = (verdi, erValgt) => {
        setValgtGodkjenning(erValgt ? verdi : null);
        setValgtGodkjenningError(false);
    };

    return (
        <CvModalForm
            modalÅpen={modalÅpen}
            tittel="Legg til annen godkjenning"
            feilet={feilet}
            laster={laster}
            handleFormSubmit={lagre}
            toggleModal={toggleModal}
            overflowVisible
        >
            <BodyLong>
                <b>Annen godkjenning</b> *obligatorisk
            </BodyLong>
            <Typeahead
                className={styles.mb6}
                label=""
                description="Yrkessertifikater, attester, bevis o.l."
                type={TypeaheadEnum.ANDRE_GODKJENNINGER}
                oppdaterValg={oppdaterValgtGodkjenning}
                valgtVerdi={valgtGodkjenning?.certificateName || valgtGodkjenning?.title}
                error={valgtGodkjenningError && "Du må velge en godkjenning"}
            />
            <TextField
                className={styles.mb6}
                label="Utsteder"
                description="Organisasjon, forening, opplæringssted"
                value={utsteder}
                onChange={(e) => setUtsteder(e.target.value)}
            />
            <HStack gap="8">
                <Datovelger
                    valgtDato={godkjenningFraDato}
                    oppdaterDato={setGodkjenningFraDato}
                    label="Fullført"
                    obligatorisk
                    error={godkjenningFraDatoError}
                    setError={setGodkjenningFraDatoError}
                />
                <Datovelger
                    valgtDato={godkjenningTilDato}
                    oppdaterDato={setGodkjenningTilDato}
                    label="Utløper"
                    fremtid
                    error={godkjenningTilDatoError}
                    setError={setGodkjenningTilDatoError}
                />
            </HStack>
        </CvModalForm>
    );
}
