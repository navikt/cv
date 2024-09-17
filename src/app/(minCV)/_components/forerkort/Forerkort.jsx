import { BodyLong, Box, Button, Heading } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PlusIcon } from "@navikt/aksel-icons";
import {useInView} from "react-intersection-observer";

export default function Forerkort({inViewChange}) {
    const { ref, inView, entry } = useInView({ delay: 1000, trackVisibility: true,  threshold: 0.4, onChange: inViewChange });

    return (
        <div id="12" ref={ref}>
            <Box background="surface-default" padding="10" className={styles.box}>
                <Heading level="2" size="large" align="start" spacing>
                    Førerkort
                </Heading>
                <BodyLong weight="semibold" spacing>
                    Du har ikke lagt til noen førerkort i CV-en
                </BodyLong>
                <BodyLong className={styles.mb12}>Her kan du sette inn alle ulike førerkort, f.eks lastebil.</BodyLong>
                <Button icon={<PlusIcon aria-hidden />} variant="primary">
                    Legg til
                </Button>
            </Box>
        </div>
    );
}
