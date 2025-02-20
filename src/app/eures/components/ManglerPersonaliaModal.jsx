import { BodyLong, Button, Heading, HStack, Modal } from "@navikt/ds-react";

export default function ManglerPersonaliaModal({ open, setOpen, onOppdaterUtenPersonalia }) {
    return (
        <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-heading">
            <Modal.Header>
                <Heading size="large" level="2" id="modal-heading">
                    CV mangler personalia
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <BodyLong spacing>
                    Du har valgt å ikke dele personalia. Om du ikke deler personalia har potensielle arbeidsgivere ingen
                    mulighet til å komme i kontakt med deg.
                </BodyLong>
                <BodyLong>Er du sikker på at du ønsker å dele CV uten personalia?</BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <HStack gap="4">
                    <Button type="button" onClick={onOppdaterUtenPersonalia}>
                        Ja, del likevel
                    </Button>
                    <Button type="button" onClick={() => setOpen(false)}>
                        Avbryt
                    </Button>
                </HStack>
            </Modal.Footer>
        </Modal>
    );
}
