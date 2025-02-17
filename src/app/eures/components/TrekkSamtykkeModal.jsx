import { BodyLong, Button, Heading, HStack, Modal } from "@navikt/ds-react";

export default function TrekkSamtykkeModal({ open, setOpen, onTrekkSamtykke }) {
    return (
        <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-heading">
            <Modal.Header>
                <Heading size="large" level="2" id="modal-heading">
                    Trekke samtykke
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <BodyLong spacing>
                    Når du trekker samtykket, slettes alle CV-opplysninger du deler med den Europeiske
                    jobbmobilitetsportalen. Innholdet i CV-en din hos nav.no påvirkes ikke.
                </BodyLong>
                <BodyLong>Er du sikker på at du vil trekke samtykket?</BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <HStack gap="4">
                    <Button type="button" onClick={onTrekkSamtykke}>
                        Trekk samtykke
                    </Button>
                    <Button type="button" onClick={() => setOpen(false)}>
                        Avbryt
                    </Button>
                </HStack>
            </Modal.Footer>
        </Modal>
    );
}
