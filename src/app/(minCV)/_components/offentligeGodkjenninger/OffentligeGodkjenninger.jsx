import { BodyLong, Box, Button, Heading } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PlusIcon } from "@navikt/aksel-icons";
import {useInView} from "react-intersection-observer";

export default function OffentligeGodkjenninger({inViewChange}) {
    const { ref, inView, entry } = useInView({ delay: 1000, trackVisibility: true,  threshold: 0.4, onChange: inViewChange });

    return (
        <div id="9" ref={ref}>
            <Box background="surface-default" padding="10" className={styles.box}>
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
