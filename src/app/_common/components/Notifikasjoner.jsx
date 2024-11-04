import { Alert, VStack } from "@navikt/ds-react";
import styles from "../../page.module.css";

export function Notifikasjoner({ notifikasjoner }) {
    return (
        <VStack aria-atomic="false" gap="4" className={styles.notifikasjonContainer}>
            {notifikasjoner.map((notifikasjon) => (
                <Alert
                    aria-live="polite"
                    role="alert"
                    className={styles.notifikasjon}
                    id={notifikasjon.id}
                    key={notifikasjon.id}
                    variant={notifikasjon.type}
                >
                    {notifikasjon.tekst}
                </Alert>
            ))}
        </VStack>
    );
}
