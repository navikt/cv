import { BodyLong, Box, Button, Heading } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PlusIcon } from "@navikt/aksel-icons";

export default function AndreErfaringer() {
    return (
        <div id="7">
            <Box background="surface-default" padding="10" className={styles.box}>
                <Heading level="2" size="large" align="start" spacing>
                    Andre erfaringer
                </Heading>
                <BodyLong weight="semibold" spacing>
                    Du har ikke lagt til noen andre erfaringer i CV-en
                </BodyLong>
                <BodyLong className={styles.mb12}>
                    En “annen erfaring” er f.eks frivillig arbeid som du gjør som en fotballtrener.
                </BodyLong>
                <Button icon={<PlusIcon aria-hidden />} variant="primary">
                    Legg til
                </Button>
            </Box>
        </div>
    );
}
