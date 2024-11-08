import { BodyLong, Button, Heading, HStack, Loader, Modal } from "@navikt/ds-react";
import styles from "@/app/page.module.css";

export function CvModalForm({
    children,
    tittel,
    icon = null,
    modalÅpen,
    toggleModal,
    laster,
    feilet,
    overflowVisible = false,
    handleFormSubmit,
}) {
    return (
        <Modal
            open={modalÅpen}
            aria-label={tittel}
            onClose={() => toggleModal(false)}
            width="medium"
            className={overflowVisible && "overflow-visible"}
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleFormSubmit();
                }}
            >
                <Modal.Header closeButton>
                    <Heading align="start" level="3" size="medium">
                        <HStack gap="1" align="center">
                            {icon}
                            {tittel}
                        </HStack>
                    </Heading>
                </Modal.Header>
                <Modal.Body
                    className={[styles[`modalBody${laster ? "--loading" : ""}`], overflowVisible && "overflow-visible"]}
                >
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <HStack gap="4">
                        {feilet && (
                            <BodyLong size="large" className={styles.errorText}>
                                Noe gikk galt, prøv å trykk lagre igjen
                            </BodyLong>
                        )}
                        {laster && <Loader size="xlarge" />}
                        <Button variant="secondary" type="button" onClick={() => toggleModal(false)} disabled={laster}>
                            Avbryt
                        </Button>

                        <Button variant="primary" type="submit" disabled={laster}>
                            Lagre
                        </Button>
                    </HStack>
                </Modal.Footer>
            </form>
        </Modal>
    );
}
