import { BodyLong, Box, Button, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import HeaderPanel from "@/app/_common/components/HeaderPanel";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { useOppdaterSettHjemmel } from "@/app/_common/hooks/swr/useOppdaterSettHjemmel";
import { usePerson } from "@/app/_common/hooks/swr/usePerson";
import { navBaseUrl } from "@/app/_common/utils/urlUtils";
import Hjemmelstekst from "@/app/_common/components/Hjemmelstekst";

export function Hjemmelside() {
    const { harIkkeSettHjemmel, måBekrefteTidligereCv } = usePerson();

    const [sendBekreftelse, setSendBekreftelse] = useState(false);
    const { settHjemmelSuksess, settHjemmelLaster } = useOppdaterSettHjemmel(sendBekreftelse);

    useEffect(() => {
        if (settHjemmelSuksess === true) setSendBekreftelse(false);
    }, [settHjemmelSuksess]);

    return (
        <div>
            <HeaderPanel title="Slik bruker Nav CV-opplysningene" visTag={false} />
            <Box className={[styles.main, styles.mb16]}>
                <Box background="surface-default" padding="10" className={styles.box}>
                    <Hjemmelstekst />

                    {måBekrefteTidligereCv && (
                        <>
                            <Heading size="small" spacing level="2">
                                Du har allerede en CV på arbeidsplassen.no
                            </Heading>
                            <BodyLong spacing>
                                Da du tok i bruk tjenestene på arbeidsplassen.no, samtykket du til at Nav kunne behandle
                                personopplysningene dine.
                            </BodyLong>
                            <BodyLong spacing>
                                Nå som du har registrert deg som arbeidssøker, gjelder ikke samtykket lenger. Samtykket
                                blir erstattet av en lovhjemmel som betyr at Nav har rett til å se opplysningene i
                                CV-en. Derfor må du gå gjennom CV-en din og se om det er noe du vil slette eller endre
                                før du deler med Nav.
                            </BodyLong>
                        </>
                    )}

                    <HStack gap="4" className={styles.mb3}>
                        <Button
                            variant="primary"
                            loading={harIkkeSettHjemmel ? settHjemmelLaster : false}
                            onClick={() => setSendBekreftelse(true)}
                        >
                            Gå til tjenesten
                        </Button>
                        <NextLink href={`${navBaseUrl}/minside`} passHref legacyBehavior>
                            <Button variant="secondary" as="a" role="link">
                                Tilbake til Min side
                            </Button>
                        </NextLink>
                    </HStack>
                </Box>
            </Box>
        </div>
    );
}
