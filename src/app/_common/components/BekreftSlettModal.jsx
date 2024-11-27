import { BodyShort, Button, HStack, Modal } from "@navikt/ds-react";

export function BekreftSlettModal({ bekreftModalÅpen, toggleBekreftModal, kjørBekreftCallback, beskrivelse }) {
    const tittel = `Bekreft at du ønsker å fjerne ${beskrivelse} fra din CV`;

    return (
        <Modal
            open={bekreftModalÅpen}
            aria-label={tittel}
            onClose={() => toggleBekreftModal(false)}
            width="medium"
            header={{
                heading: tittel,
                size: "medium",
            }}
        >
            <Modal.Body>
                <BodyShort>Du kan ikke angre dette valget.</BodyShort>
            </Modal.Body>
            <Modal.Footer>
                <HStack gap="4">
                    <Button variant="secondary" type="button" onClick={() => toggleBekreftModal(false)}>
                        Avbryt
                    </Button>

                    <Button variant="danger" type="button" onClick={() => kjørBekreftCallback()}>
                        {`Fjern ${beskrivelse}`}
                    </Button>
                </HStack>
            </Modal.Footer>
        </Modal>
    );
}
