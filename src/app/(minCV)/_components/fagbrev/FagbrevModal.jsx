import { useEffect, useRef, useState } from "react";
import { Typeahead } from "@/app/(minCV)/_components/typeahead/Typeahead";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";
import { CvModalForm } from "@/app/_common/components/CvModalForm";
import { HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useEures } from "@/app/_common/hooks/swr/useEures";
import { EuresDeleInfoBox } from "@/app/_common/components/EuresDeleInfoBox";

export default function FagbrevModal({ modalÅpen, toggleModal, gjeldendeElement, lagreElement, laster, feilet }) {
    const { euresFagbrev } = useEures();

    const [valgtFagbrev, setValgtFagbrev] = useState(gjeldendeElement || null);
    const [valgtFagbrevError, setValgtFagbrevError] = useState(false);
    const modalFormRef = useRef();
    const comboboxRef = useRef();

    useEffect(() => {
        const oppdaterFagbrev = (fagbrev) => setValgtFagbrev(fagbrev);
        oppdaterFagbrev(gjeldendeElement || []);
    }, [gjeldendeElement]);

    const lagre = () => {
        if (!valgtFagbrev || valgtFagbrev.length === 0) {
            comboboxRef.current.focus();
            setValgtFagbrevError(true);
        }

        if (valgtFagbrev && valgtFagbrev.length !== 0) {
            lagreElement({
                title: valgtFagbrev.label || valgtFagbrev.title,
                type: valgtFagbrev.type || valgtFagbrev.undertype === "MB" ? "MESTERBREV" : "SVENNEBREV_FAGBREV",
                conceptId: valgtFagbrev.conceptId,
            });
        }
    };

    const oppdaterValgtFagbrev = (verdi, erValgt) => {
        setValgtFagbrev(erValgt ? verdi : null);
        setValgtFagbrevError(false);
    };

    return (
        <CvModalForm
            modalÅpen={modalÅpen}
            tittel="Legg til fagbrev"
            icon={<HStack as="span" className={[styles.iconFagbrevBig, styles.modalIcon]} aria-hidden="true" />}
            feilet={feilet}
            laster={laster}
            handleFormSubmit={lagre}
            toggleModal={toggleModal}
            ref={modalFormRef}
        >
            <Typeahead
                ref={comboboxRef}
                label="Fagdokumentasjon"
                description="Må fylles ut"
                type={TypeaheadEnum.FAGBREV}
                oppdaterValg={oppdaterValgtFagbrev}
                valgtVerdi={valgtFagbrev?.title}
                error={valgtFagbrevError && "Du må velge et fagbrev"}
            />

            {euresFagbrev && <EuresDeleInfoBox />}
        </CvModalForm>
    );
}
