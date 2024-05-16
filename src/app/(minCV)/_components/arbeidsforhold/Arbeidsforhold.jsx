import { BodyLong, Box, Button, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";

export default function Arbeidsforhold() {
    return (
        <div>
            <Box id="6" background="surface-default" padding="10" style={{ width: "600px", marginBottom: "2rem" }}>
                <Heading level="2" size="large" align="start" spacing>
                    Arbeidsforhold
                </Heading>
                <BodyLong weight="semibold" spacing>
                    Vil du hente inn dine tidligere arbeidsforhold?
                </BodyLong>
                <BodyLong className={styles.mb12}>
                    Ved å bruke Arbeidsgiver- og arbeidstakerregisteret kan vi hente inn dine tidligere arbeidsforhold
                    til CV-en din.
                </BodyLong>
                <HStack justify="space-between">
                    <Button variant="primary">Hent arbeidsforhold</Button>
                    <Button variant="secondary">Jeg vil legge til selv</Button>
                </HStack>
            </Box>
        </div>
    );
}
