import { Box } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import HeaderPanel from "@/app/_common/components/HeaderPanel";
import Hjemmelstekst from "@/app/_common/components/Hjemmelstekst";
import VeilederBanner from "@/app/_common/components/VeilederBanner/VeilederBanner";

export function HjemmelsideVeileder() {
    return (
        <div>
            <HeaderPanel title="Slik bruker Nav CV-opplysningene" />
            <Box className={[styles.main, styles.mb16]}>
                <Box background="surface-default" padding="10" className={styles.box}>
                    <Hjemmelstekst />
                    <VeilederBanner className={styles.mt6} />
                </Box>
            </Box>
        </div>
    );
}
