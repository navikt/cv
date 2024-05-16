import { BodyLong, Box, Button, Heading } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PlusIcon } from "@navikt/aksel-icons";

export default function Fagbrev() {
    return (
        <div>
            <Box id="5" background="surface-default" padding="10" className={styles.box}>
                <Heading level="2" size="large" align="start" spacing>
                    Fagbrev
                </Heading>
                <BodyLong weight="semibold" spacing>
                    Du har ikke lagt til noen fagbrev i CV-en
                </BodyLong>
                <BodyLong className={styles.mb12}>
                    Her kan du sette inn ulike fagbrev som du har tatt, f.eks i bilpleie.
                </BodyLong>
                <Button icon={<PlusIcon aria-hidden />} variant="primary">
                    Legg til
                </Button>
            </Box>
        </div>
    );
}
