import { BodyLong, Select } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import { Typeahead } from "@/app/(minCV)/_components/typeahead/Typeahead";
import { SpråkEnum } from "@/app/_common/enums/cvEnums";
import styles from "@/app/page.module.css";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";
import { CvModal } from "@/app/_common/components/CvModal";

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
        <CvModal
            modalÅpen={modalÅpen}
            tittel="Legg til språk"
            feilet={feilet}
            laster={laster}
            lagre={lagre}
            toggleModal={toggleModal}
            overflowVisible
        >
            <BodyLong>
                <b>Språk</b> *obligatorisk
            </BodyLong>
            <Typeahead
                className={styles.mb6}
                label=""
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
        </CvModal>
    );
}
