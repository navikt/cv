import { BodyLong, Box, Button, Heading } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PlusIcon } from "@navikt/aksel-icons";

export default function Sammendrag() {
    return (
        <div id="14">
            <Box background="surface-default" padding="10" className={styles.box}>
                <Heading level="2" size="large" align="start" spacing>
                    Om meg
                </Heading>
                <BodyLong weight="semibold" spacing>
                    Din beskrivelse av deg selv
                </BodyLong>
                <BodyLong className={styles.mb12}>
                    Her kan du beskrive deg selv, hvordan du er som arbeidstaker og ulike personlige egenskaper.
                </BodyLong>
                <Button icon={<PlusIcon aria-hidden />} variant="primary">
                    Legg til
                </Button>
            </Box>
        </div>
    );
}
