import { forwardRef, useId } from "react";
import { BodyLong, Button, HStack, Modal } from "@navikt/ds-react";
import styles from "@/app/page.module.css";

export const CvModalForm = forwardRef(
    ({ children, tittel, icon = null, modalÅpen, toggleModal, laster, feilet, handleFormSubmit }, ref) => {
        const formId = useId();

        return (
            <Modal
                open={modalÅpen}
                aria-label={tittel}
                onClose={() => toggleModal(false)}
                width="medium"
                className="overflow-visible"
                header={{
                    heading: (
                        <span className={[styles.mt1, styles.mb3]}>
                            <HStack as="span" justify="center">
                                {icon}
                            </HStack>
                            {tittel}
                        </span>
                    ),
                    size: "medium",
                }}
            >
                <Modal.Body className={[styles[`modalBody${laster ? "--loading" : ""}`], styles.modalScroll]}>
                    <form
                        id={formId}
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleFormSubmit(e);
                        }}
                        ref={ref}
                    >
                        <fieldset className={styles.modalFormFieldset}>
                            <legend className={styles.visuallyhidden}>{tittel}</legend>
                            {children}
                        </fieldset>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <HStack gap="4">
                        {feilet && (
                            <BodyLong size="large" className={styles.errorText}>
                                Noe gikk galt, prøv å trykk lagre igjen
                            </BodyLong>
                        )}
                        <Button variant="secondary" type="button" onClick={() => toggleModal(false)} disabled={laster}>
                            Avbryt
                        </Button>

                        <Button form={formId} loading={laster} variant="primary" type="submit" disabled={laster}>
                            Lagre
                        </Button>
                    </HStack>
                </Modal.Footer>
            </Modal>
        );
    },
);

CvModalForm.displayName = "CvModalForm";
