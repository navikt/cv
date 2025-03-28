import { useEffect, useRef, useState } from "react";
import { Alert, BodyLong, Heading, HStack, Textarea, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { CvModalForm } from "@/app/_common/components/CvModalForm";
import { useEures } from "@/app/_common/hooks/swr/useEures";
import { EuresDeleInfoBox } from "@/app/_common/components/EuresDeleInfoBox";

export default function SammendragModal({ modalÅpen, toggleModal, gjeldendeElement, lagreElement, laster, feilet }) {
    const { euresSammendrag } = useEures();

    const [sammendragEndring, setSammendragEndring] = useState(gjeldendeElement || "");
    const modalFormRef = useRef();

    useEffect(() => {
        setSammendragEndring(gjeldendeElement || "");
    }, [gjeldendeElement]);

    const lagre = () => {
        lagreElement(sammendragEndring);
    };

    return (
        <CvModalForm
            modalÅpen={modalÅpen}
            tittel="Legg til sammendrag"
            icon={<HStack as="span" className={[styles.iconSammendragBig, styles.modalIcon]} aria-hidden="true" />}
            feilet={feilet}
            laster={laster}
            handleFormSubmit={lagre}
            toggleModal={toggleModal}
            ref={modalFormRef}
        >
            <VStack>
                <Alert variant="warning" className={styles.mb12}>
                    <Heading spacing size="xsmall" level="2">
                        Viktig informasjon om personopplysninger
                    </Heading>
                    <BodyLong size="small">
                        Husk at du <b>ikke</b> skal skrive sensitive opplysninger i CV-en om for eksempel din helse,
                        religion eller politiske oppfatning.
                    </BodyLong>
                </Alert>
                <Textarea
                    label="Gi en kort oppsummering av deg selv"
                    placeholder="En kort oppsummering av din kompetanse og dine personlige egenskaper."
                    className={styles.mb6}
                    value={sammendragEndring}
                    onChange={(e) => {
                        setSammendragEndring(e.target.value);
                    }}
                />
            </VStack>

            {euresSammendrag && <EuresDeleInfoBox />}
        </CvModalForm>
    );
}
