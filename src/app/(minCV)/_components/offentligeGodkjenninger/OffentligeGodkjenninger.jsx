import { BodyLong, Box, Button, Heading } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PlusIcon } from "@navikt/aksel-icons";

export default function OffentligeGodkjenninger() {
    return (
        <div>
            <Box id="9" background="surface-default" padding="10" className={styles.box}>
                <Heading level="2" size="large" align="start" spacing>
                    Offentlige godkjenninger
                </Heading>
                <BodyLong weight="semibold" spacing>
                    Du har ikke lagt til noen offentlige godkjenninger i CV-en
                </BodyLong>
                <BodyLong className={styles.mb12}>
                    En offentlig godkjenning er utsendt av et statlig organ, som f.eks truckførerbevis eller
                    autorisasjon som sykepleier.
                </BodyLong>
                <Button icon={<PlusIcon aria-hidden />} variant="primary">
                    Legg til
                </Button>
            </Box>
        </div>
    );
}
