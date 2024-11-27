import { HStack } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import { Typeahead } from "@/app/(minCV)/_components/typeahead/Typeahead";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";
import { CvModalForm } from "@/app/_common/components/CvModalForm";
import styles from "@/app/page.module.css";

export default function KompetanserModal({ alleredeValgte, lagreKompetanser, modalÅpen, toggleModal, laster, feilet }) {
    const [valgteKompetanser, setValgteKompetanser] = useState(alleredeValgte || []);

    useEffect(() => {
        const oppdaterKompetanse = (kompetanse) => setValgteKompetanser(kompetanse);
        oppdaterKompetanse(alleredeValgte || []);
    }, [alleredeValgte]);

    const lagre = () => {
        const kompetanserTilLagring = valgteKompetanser || [];

        lagreKompetanser(
            kompetanserTilLagring.map((e) => ({
                title: e.label || e.title,
                conceptId: e.conceptId,
            })),
        );
    };

    const oppdaterValgteKompetanser = (kompetanse, erValgt) => {
        const oppdaterteKompetanser = [...valgteKompetanser];

        if (erValgt) {
            oppdaterteKompetanser.push(kompetanse);
        } else {
            const eksisterendeIndex = oppdaterteKompetanser.findIndex((e) => e.title === kompetanse.title);
            oppdaterteKompetanser.splice(eksisterendeIndex, 1);
        }

        setValgteKompetanser(oppdaterteKompetanser);
    };

    return (
        <CvModalForm
            modalÅpen={modalÅpen}
            tittel="Legg til kompetanse"
            icon={<HStack as="span" className={[styles.iconKompetanserBig, styles.modalIcon]} aria-hidden="true" />}
            feilet={feilet}
            laster={laster}
            handleFormSubmit={lagre}
            toggleModal={toggleModal}
        >
            <Typeahead
                label="Hva er du flink til?"
                description="Legg til kompetanser, ferdigheter, verktøy o.l."
                type={TypeaheadEnum.KOMPETANSE}
                oppdaterValg={oppdaterValgteKompetanser}
                valgtVerdi={valgteKompetanser}
                multiselect
                multiselectText="Kompetanser"
            />
        </CvModalForm>
    );
}
