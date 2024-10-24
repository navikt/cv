import { Alert, Button, VStack } from "@navikt/ds-react";
import styles from "../../page.module.css";
import { useContext, useEffect, useState } from "react";
import { ApplicationContext } from "@/app/_common/contexts/ApplicationContext";

export const Notifikasjoner = ({ notifikasjoner }) => (
    <VStack gap={"4"} className={styles.notifikasjonContainer}>
        {notifikasjoner.map((notifikasjon) => (
            <Alert className={styles.notifikasjon} key={notifikasjon.id} variant={notifikasjon.type}>
                {notifikasjon.tekst}
            </Alert>
        ))}
    </VStack>
);
