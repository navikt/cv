import { Alert, VStack } from "@navikt/ds-react";
import styles from "../../page.module.css";

export function Notifikasjoner({ notifikasjoner }) {
    return (
        <VStack gap="4" className={styles.notifikasjonContainer}>
            {notifikasjoner.map((notifikasjon) => (
                <Alert className={styles.notifikasjon} key={notifikasjon.id} variant={notifikasjon.type}>
                    {notifikasjon.tekst}
                </Alert>
            ))}
        </VStack>
    );
}
