import { BodyLong, Box, Button, Heading } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PlusIcon } from "@navikt/aksel-icons";
import {useInView} from "react-intersection-observer";

export default function AndreErfaringer({inViewChange}) {
    const { ref, inView, entry } = useInView({ delay: 1000, trackVisibility: true,  threshold: 0.4, onChange: inViewChange });

    return (
        <div id="7" ref={ref}>
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
