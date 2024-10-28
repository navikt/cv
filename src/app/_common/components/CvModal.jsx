import { BodyLong, Button, Heading, HStack, Loader, Modal } from "@navikt/ds-react";
import styles from "@/app/page.module.css";

export const CvModal = ({
    children,
    tittel,
    icon = null,
    modalÅpen,
    toggleModal,
    lagre,
    laster,
    feilet,
    overflowVisible = false,
}) => (
    <Modal
        open={modalÅpen}
        aria-label={tittel}
        onClose={() => toggleModal(false)}
        width="medium"
        className={overflowVisible && "overflow-visible"}
    >
        <Modal.Header closeButton={true}>
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
                    <BodyLong size={"large"} className={styles.errorText}>
                        Noe gikk galt, prøv å trykk lagre igjen
                    </BodyLong>
                )}
                {laster && <Loader size={"xlarge"} />}
                <Button variant="secondary" onClick={() => toggleModal(false)} disabled={laster}>
                    Avbryt
                </Button>
                <Button variant="primary" onClick={() => lagre()} disabled={laster}>
                    Lagre
                </Button>
            </HStack>
        </Modal.Footer>
    </Modal>
);
