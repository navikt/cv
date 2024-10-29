import { BodyLong } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import { Typeahead } from "@/app/(minCV)/_components/typeahead/Typeahead";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";
import { CvModal } from "@/app/_common/components/CvModal";

export default function KompetanserModal({ modalÅpen, toggleModal, gjeldendeElement, lagreElement, laster, feilet }) {
    const [valgtKompetanse, setValgtKompetanse] = useState(gjeldendeElement || null);
    const [valgtKompetanseError, setValgtKompetanseError] = useState(false);

    useEffect(() => {
        const oppdaterKompetanse = (kompetanse) => setValgtKompetanse(kompetanse);
        oppdaterKompetanse(gjeldendeElement || []);
    }, [gjeldendeElement]);

    const lagre = () => {
        if (!valgtKompetanse || valgtKompetanse.length === 0) setValgtKompetanseError(true);

        if (valgtKompetanse && valgtKompetanse.length !== 0) {
            lagreElement({
                title: valgtKompetanse.label || valgtKompetanse.title,
                type: valgtKompetanse.type,
                conceptId: valgtKompetanse.conceptId,
            });
        }
    };

    const oppdaterValgtKompetanse = (verdi, erValgt) => {
        setValgtKompetanse(erValgt ? verdi : null);
        setValgtKompetanseError(false);
    };

    return (
        <CvModal
            modalÅpen={modalÅpen}
            tittel={"Legg til kompetanse"}
            feilet={feilet}
            laster={laster}
            lagre={lagre}
            toggleModal={toggleModal}
            overflowVisible={true}
        >
            <BodyLong>
                <b>Hva er du flink til?</b> *obligatorisk
            </BodyLong>
            <Typeahead
                label=""
                description="Legg til kompetanser, ferdigheter, verktøy o.l."
                type={TypeaheadEnum.KOMPETANSE}
                oppdaterValg={oppdaterValgtKompetanse}
                valgtVerdi={valgtKompetanse?.title}
                error={valgtKompetanseError && "Du må velge en eller flere kompetanser"}
            />
        </CvModal>
    );
}
