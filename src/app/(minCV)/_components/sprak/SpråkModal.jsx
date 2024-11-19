import { HStack, Select } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import { Typeahead } from "@/app/(minCV)/_components/typeahead/Typeahead";
import { SpråkEnum } from "@/app/_common/enums/cvEnums";
import styles from "@/app/page.module.css";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";
import { CvModalForm } from "@/app/_common/components/CvModalForm";

export default function SpråkModal({ modalÅpen, toggleModal, gjeldendeElement, lagreElement, laster, feilet }) {
    const [valgtSpråk, setValgtSpråk] = useState(gjeldendeElement || null);
    const [muntligEvne, setMuntligEvne] = useState("IKKE_OPPGITT");
    const [skriftligEvne, setSkriftligEvne] = useState("IKKE_OPPGITT");
    const [valgtSprakError, setValgtSprakError] = useState(false);

    useEffect(() => {
        const oppdaterSpråk = (språk) => {
            setValgtSpråk(språk);
            setMuntligEvne(språk?.oralProficiency || "IKKE_OPPGITT");
            setSkriftligEvne(språk?.writtenProficiency || "IKKE_OPPGITT");
        };
        oppdaterSpråk(gjeldendeElement || []);
    }, [gjeldendeElement]);

    const lagre = () => {
        if (!valgtSpråk || valgtSpråk.length === 0) setValgtSprakError(true);

        if (valgtSpråk && valgtSpråk.length !== 0) {
            lagreElement({
                language: valgtSpråk.language || valgtSpråk.title,
                iso3Code: valgtSpråk.iso3Code || valgtSpråk.kode,
                oralProficiency: muntligEvne,
                writtenProficiency: skriftligEvne,
            });
        }
    };

    const oppdaterValgtSpråk = (verdi, erValgt) => {
        setValgtSpråk(erValgt ? verdi : null);
        setValgtSprakError(false);
    };

    return (
        <CvModalForm
            modalÅpen={modalÅpen}
            tittel="Legg til språk"
            icon={<HStack className={[styles.iconSprakBig, styles.modalIcon]} aria-hidden="true" />}
            feilet={feilet}
            laster={laster}
            handleFormSubmit={lagre}
            toggleModal={toggleModal}
            overflowVisible
        >
            <Typeahead
                className={styles.mb6}
                label="Språk"
                description="Må fylles ut"
                valgtVerdi={valgtSpråk?.language || valgtSpråk?.title}
                oppdaterValg={oppdaterValgtSpråk}
                type={TypeaheadEnum.SPRÅK}
                forhåndshentet
                error={valgtSprakError && "Du må velge et språk"}
            />
            <Select
                id="Muntlig"
                label="Muntlig"
                className={styles.mb6}
                value={muntligEvne}
                onChange={(e) => setMuntligEvne(e.target.value)}
            >
                {Object.keys(SpråkEnum).map((e) => (
                    <option key={e} value={e}>
                        {SpråkEnum[e]}
                    </option>
                ))}
            </Select>
            <Select
                id="Skriftlig"
                label="Skriftlig"
                className={styles.mb6}
                value={skriftligEvne}
                onChange={(e) => setSkriftligEvne(e.target.value)}
            >
                {Object.keys(SpråkEnum).map((e) => (
                    <option key={e} value={e}>
                        {SpråkEnum[e]}
                    </option>
                ))}
            </Select>
        </CvModalForm>
    );
}
