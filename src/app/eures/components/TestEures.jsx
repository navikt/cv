import { Button } from "@navikt/ds-react";
import { PencilIcon } from "@navikt/aksel-icons";
import styles from "@/app/page.module.css";
import { useOppdaterEures } from "@/app/_common/hooks/swr/useOppdaterEures";
import { useEures } from "@/app/_common/hooks/swr/useEures";

export default function TestEures() {
    const { eures } = useEures();
    const oppdateringprops = useOppdaterEures();

    console.log("Test eures: ", eures);

    const oppdater = () => {
        oppdateringprops.triggerOppdatering({
            personalia: true,
            utdanning: true,
            fagbrev: true,
            arbeidserfaring: true,
            annenErfaring: false,
            foererkort: true,
            lovregulerteYrker: false,
            offentligeGodkjenninger: true,
            andreGodkjenninger: true,
            kurs: true,
            spraak: true,
            sammendrag: true,
            kompetanser: true,
            land: ["NO"],
        });
    };

    return (
        <Button
            aria-label="Oppdater"
            className={styles.mb6}
            icon={<PencilIcon aria-hidden />}
            variant="primary"
            onClick={() => oppdater()}
        >
            Oppdater
        </Button>
    );
}
