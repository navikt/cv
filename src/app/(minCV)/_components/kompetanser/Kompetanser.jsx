import { BodyLong, Box, Button, Heading } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PlusIcon } from "@navikt/aksel-icons";

export default function Fagbrev() {
    return (
        <div id="8">
            <Box background="surface-default" padding="10" className={styles.box}>
                <Heading level="2" size="large" align="start" spacing>
                    Kompetanser
                </Heading>
                <BodyLong weight="semibold" spacing>
                    Du har ikke lagt til noen kompetanser i CV-en
                </BodyLong>
                <BodyLong className={styles.mb12}>
                    Her kan du sette inn de ulike kompetanser som spesifikke egenskaper f.eks undervisning eller
                    butikkarbeid.
                </BodyLong>
                <Button icon={<PlusIcon aria-hidden />} variant="primary">
                    Legg til
                </Button>
            </Box>
        </div>
    );
}
