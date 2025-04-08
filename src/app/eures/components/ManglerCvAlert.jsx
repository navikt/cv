import styles from "@/app/page.module.css";
import { Alert, BodyLong, Heading, HStack, Link } from "@navikt/ds-react";
import { ArrowUndoIcon } from "@navikt/aksel-icons";

export default function ManglerCvAlert({ inline = false }) {
    const bodyText =
        "Du kan ikke dele CV-en din med EURES-portalen før du har opprettet en CV og fylt inn minst én kategori.";

    if (inline)
        return (
            <Alert className={styles.mt6} inline variant="warning" size="small">
                {bodyText}
            </Alert>
        );

    return (
        <Alert variant="warning" className={styles.mb12}>
            <Heading spacing size="xsmall" level="2">
                Du har ikke registrert noen opplysninger i CV-en din
            </Heading>
            <BodyLong size="small">{bodyText}</BodyLong>
            <HStack className={styles.mt6}>
                <Link href="/min-cv">
                    <ArrowUndoIcon aria-hidden />
                    Tilbake til Min CV
                </Link>
            </HStack>
        </Alert>
    );
}
