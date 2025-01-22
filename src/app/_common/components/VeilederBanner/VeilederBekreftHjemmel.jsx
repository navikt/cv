import { Button, HStack, Switch } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useEffect, useState } from "react";
import { useOppdaterSettHjemmel } from "@/app/_common/hooks/swr/useOppdaterSettHjemmel";

export default function VeilederBekreftHjemmel() {
    const [brukerErInformert, setBrukerErInformert] = useState(false);
    const [sendBekreftelse, setSendBekreftelse] = useState(false);
    const { settHjemmelSuksess, settHjemmelLaster } = useOppdaterSettHjemmel(sendBekreftelse);

    useEffect(() => {
        if (settHjemmelSuksess === true) setSendBekreftelse(false);
    }, [settHjemmelSuksess]);

    return (
        <HStack gap="4" className={styles.mb3}>
            <Switch checked={brukerErInformert} onChange={(e) => setBrukerErInformert(e.target.checked)}>
                Jeg har informert bruker om hjemmel
            </Switch>

            <Button
                variant="primary"
                loading={settHjemmelLaster}
                onClick={() => setSendBekreftelse(true)}
                disabled={!brukerErInformert}
            >
                Gå videre
            </Button>
        </HStack>
    );
}
