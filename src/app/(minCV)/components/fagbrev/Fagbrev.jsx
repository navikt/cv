import { BodyLong, Box, Button, Heading } from "@navikt/ds-react";
import styles from "@/app/page.module.css";

export default function Fagbrev() {
    return (
        <div>
            <Box id="5" background="surface-default" padding="10" style={{ width: "600px", marginBottom: "2rem" }}>
                <Heading level="2" size="large" align="start" spacing>
                    Fagbrev
                </Heading>
                <BodyLong weight="semibold" spacing>
                    Du har ikke lagt til noen fagbrev i CV-en
                </BodyLong>
                <BodyLong className={styles.mb12}>
                    Her kan du sette inn ulike fagbrev som du har tatt, f.eks i bilpleie
                </BodyLong>
                <Button variant="primary">+ Legg til flere</Button>
            </Box>
        </div>
    );
}
