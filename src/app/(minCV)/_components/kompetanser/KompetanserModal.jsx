import { Button, Heading, HStack, Modal } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import { Typeahead } from "@/app/(minCV)/_components/typeahead/Typeahead";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";

export default function KompetanserModal({ modalÅpen, toggleModal, kompetanse, lagreKompetanse }) {
    const [valgtKompetanse, setValgtKompetanse] = useState(kompetanse || null);

    useEffect(() => {
        const oppdaterKompetanse = (kompetanse) => setValgtKompetanse(kompetanse);
        oppdaterKompetanse(kompetanse || []);
    }, [kompetanse]);

    const lagre = () => {
        lagreKompetanse({
            title: valgtKompetanse.label || valgtKompetanse.title,
            type: valgtKompetanse.type,
            conceptId: valgtKompetanse.conceptId,
        });
    };

    const oppdaterValgtKompetanse = (verdi, erValgt) => {
        setValgtKompetanse(erValgt ? verdi : null);
    };

    return (
        <Modal
            open={modalÅpen}
            aria-label="Legg til kompetanse"
            onClose={() => toggleModal(false)}
            width="medium"
            className={"overflow-visible"}
        >
            <Modal.Header closeButton={true}>
                <Heading align="start" level="3" size="medium">
                    <HStack gap="1" align="center">
                        Legg til Kompetanse
                    </HStack>
                </Heading>
            </Modal.Header>
            <Modal.Body style={{ padding: "1rem 2.8rem 2.5rem 2.8rem" }} className={"overflow-visible"}>
                <Typeahead
                    label="Hva er du flink til?"
                    description="Legg til kompetanser, ferdigheter, verktøy o.l."
                    type={TypeaheadEnum.KOMPETANSE}
                    oppdaterValg={oppdaterValgtKompetanse}
                    valgtVerdi={valgtKompetanse?.title}
                />
            </Modal.Body>
            <Modal.Footer>
                <HStack gap="4">
                    <Button variant="secondary" onClick={() => toggleModal(false)}>
                        Avbryt
                    </Button>
                    <Button variant="primary" onClick={() => lagre(valgtKompetanse)}>
                        Lagre
                    </Button>
                </HStack>
            </Modal.Footer>
        </Modal>
    );
}
