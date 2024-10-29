import { useEffect, useState } from "react";
import { Typeahead } from "@/app/(minCV)/_components/typeahead/Typeahead";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";
import { CvModal } from "@/app/_common/components/CvModal";

export default function FagbrevModal({ modalÅpen, toggleModal, gjeldendeElement, lagreElement, laster, feilet }) {
    const [valgtFagbrev, setValgtFagbrev] = useState(gjeldendeElement || null);
    const [valgtFagbrevError, setValgtFagbrevError] = useState(false);

    useEffect(() => {
        const oppdaterFagbrev = (fagbrev) => setValgtFagbrev(fagbrev);
        oppdaterFagbrev(gjeldendeElement || []);
    }, [gjeldendeElement]);

    const lagre = () => {
        if (!valgtFagbrev || valgtFagbrev.length === 0) setValgtFagbrevError(true);

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
        <CvModal
            modalÅpen={modalÅpen}
            tittel="Legg til fagbrev"
            feilet={feilet}
            laster={laster}
            lagre={lagre}
            toggleModal={toggleModal}
            overflowVisible
        >
            <Typeahead
                label="Fagdokumentasjon"
                description="Må fylles ut"
                type={TypeaheadEnum.FAGBREV}
                oppdaterValg={oppdaterValgtFagbrev}
                valgtVerdi={valgtFagbrev?.title}
                error={valgtFagbrevError && "Du må velge et fagbrev"}
            />
        </CvModal>
    );
}
