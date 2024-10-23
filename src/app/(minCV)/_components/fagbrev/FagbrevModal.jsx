import { Button, Heading, HStack, Modal } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import { Typeahead } from "@/app/(minCV)/_components/typeahead/Typeahead";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";

export default function FagbrevModal({ modalÅpen, toggleModal, fagbrev, lagreFagbrev }) {
    const [valgtFagbrev, setValgtFagbrev] = useState(fagbrev || null);

    useEffect(() => {
        const oppdaterFagbrev = (fagbrev) => setValgtFagbrev(fagbrev);
        oppdaterFagbrev(fagbrev || []);
    }, [fagbrev]);

    const lagre = () => {
        lagreFagbrev({
            title: valgtFagbrev.label || valgtFagbrev.title,
            type: valgtFagbrev.type || valgtFagbrev.undertype === "MB" ? "MESTERBREV" : "SVENNEBREV_FAGBREV",
            conceptId: valgtFagbrev.conceptId,
        });
    };

    const oppdaterValgtFagbrev = (verdi, erValgt) => {
        setValgtFagbrev(erValgt ? verdi : null);
    };

    return (
        <Modal
            open={modalÅpen}
            aria-label="Legg til fagbrev"
            onClose={() => toggleModal(false)}
            width="medium"
            className={"overflow-visible"}
        >
            <Modal.Header closeButton={true}>
                <Heading align="start" level="3" size="medium">
                    <HStack gap="1" align="center">
                        Legg til Fagbrev
                    </HStack>
                </Heading>
            </Modal.Header>
            <Modal.Body style={{ padding: "1rem 2.8rem 2.5rem 2.8rem" }} className={"overflow-visible"}>
                <Typeahead
                    label="Fagdokumentasjon"
                    description="Må fylles ut"
                    type={TypeaheadEnum.FAGBREV}
                    oppdaterValg={oppdaterValgtFagbrev}
                    valgtVerdi={valgtFagbrev?.title}
                />
            </Modal.Body>
            <Modal.Footer>
                <HStack gap="4">
                    <Button variant="secondary" onClick={() => toggleModal(false)}>
                        Avbryt
                    </Button>
                    <Button variant="primary" onClick={() => lagre(valgtFagbrev)}>
                        Lagre
                    </Button>
                </HStack>
            </Modal.Footer>
        </Modal>
    );
}
