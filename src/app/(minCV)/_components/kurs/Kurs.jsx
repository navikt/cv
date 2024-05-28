import { BodyLong, Box, Button, Heading } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PlusIcon } from "@navikt/aksel-icons";

export default function Kurs() {
    return (
        <div id="13">
            <Box background="surface-default" padding="10" className={styles.box}>
                <Heading level="2" size="large" align="start" spacing>
                    Kurs
                </Heading>
                <BodyLong weight="semibold" spacing>
                    Du har ikke lagt til noen kurs i CV-en
                </BodyLong>
                <BodyLong className={styles.mb12}>Her kan du sette inn kurs som du har tatt, f.eks skredkurs.</BodyLong>
                <Button icon={<PlusIcon aria-hidden />} variant="primary">
                    Legg til
                </Button>
            </Box>
        </div>
    );
}
