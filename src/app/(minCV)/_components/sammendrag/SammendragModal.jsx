import { useEffect, useState } from "react";
import { Alert, BodyLong, Heading, Textarea, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { CvModal } from "@/app/_common/components/CvModal";

export default function SammendragModal({ modalÅpen, toggleModal, gjeldendeElement, lagreElement, laster, feilet }) {
    const [sammendragEndring, setSammendragEndring] = useState(gjeldendeElement || "");
    const [sammendragError, setSammendragError] = useState(false);

    useEffect(() => {
        setSammendragEndring(gjeldendeElement || "");
    }, [gjeldendeElement]);

    const lagre = () => {
        if (!sammendragEndring) setSammendragError(true);
        if (sammendragEndring) lagreElement(sammendragEndring);
    };

    return (
        <CvModal
            modalÅpen={modalÅpen}
            tittel="Legg til sammendrag"
            feilet={feilet}
            laster={laster}
            lagre={lagre}
            toggleModal={toggleModal}
        >
            <VStack>
                <Alert variant="warning" className={styles.mb12}>
                    <Heading spacing size="xsmall" level="3">
                        Viktig informasjon om personopplysninger
                    </Heading>
                    <BodyLong size="small">
                        Husk at du <b>ikke</b> skal skrive sensitive opplysninger i CV-en om for eksempel din helse,
                        religion eller politiske oppfatning.
                    </BodyLong>
                </Alert>
                <BodyLong>
                    <b>Gi en kort oppsummering av deg selv</b> *obligatorisk
                </BodyLong>
                <Textarea
                    label=""
                    description=""
                    placeholder="En kort oppsummering av din kompetanse og dine personlige egenskaper."
                    className={styles.mb6}
                    value={sammendragEndring}
                    onChange={(e) => {
                        setSammendragEndring(e.target.value);
                        setSammendragError(false);
                    }}
                    error={sammendragError && "Du må skrive inn sammendrag"}
                />
            </VStack>
        </CvModal>
    );
}
