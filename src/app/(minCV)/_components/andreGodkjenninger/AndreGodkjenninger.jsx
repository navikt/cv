import { BodyLong, Box, Button, FormSummary, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import { useContext, useEffect, useState } from "react";
import { CvContext } from "@/app/_common/contexts/CvContext";
import { formatterFullDato } from "@/app/_common/utils/stringUtils";
import AndreGodkjenningerModal from "@/app/(minCV)/_components/andreGodkjenninger/AndreGodkjenningerModal";
import { CvSeksjonEnum } from "@/app/_common/enums/cvEnums";
import { StatusEnums } from "@/app/_common/enums/fetchEnums";

export default function AndreGodkjenninger() {
    const { cv, oppdaterCvSeksjon } = useContext(CvContext);
    const [andreGodkjenninger, setAndreGodkjenninger] = useState([]);
    const [modalÅpen, setModalÅpen] = useState(false);
    const [gjeldendeGodkjenning, setGjeldendeGodkjenning] = useState(-1);

    useEffect(() => {
        const oppdaterGodkjenninger = (andreGodkjenninger) => setAndreGodkjenninger(andreGodkjenninger);
        if (cv.fetchStatus === StatusEnums.SUCCESS) oppdaterGodkjenninger(cv.data.andreGodkjenninger || []);
    }, [cv]);

    const toggleModal = (åpen, index) => {
        setGjeldendeGodkjenning(index >= 0 ? index : -1);
        setModalÅpen(åpen);
    };

    const lagreGodkjenning = async (oppdatertGodkjenning) => {
        const oppdaterteGodkjenninger = [...andreGodkjenninger];
        if (gjeldendeGodkjenning >= 0) oppdaterteGodkjenninger.splice(gjeldendeGodkjenning, 1, oppdatertGodkjenning);
        else oppdaterteGodkjenninger.push(oppdatertGodkjenning);

        await oppdaterCvSeksjon(oppdaterteGodkjenninger, CvSeksjonEnum.ANDRE_GODKJENNINGER);
        setModalÅpen(false);
    };

    const slettGodkjenning = async (index) => {
        const oppdaterteGodkjenninger = [...andreGodkjenninger];
        oppdaterteGodkjenninger.splice(index, 1);
        await oppdaterCvSeksjon(oppdaterteGodkjenninger, CvSeksjonEnum.ANDRE_GODKJENNINGER);
    };

    const AndreGodkjenningerIcon = () => (
        <svg
            style={{ marginTop: "-4.5rem", marginBottom: "4rem" }}
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="64" height="64" rx="32" fill="#7CDAF8" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M27 20C27 19.4477 27.4477 19 28 19H36C36.5523 19 37 19.4477 37 20V21.6667H40C40.5523 21.6667 41 22.1144 41 22.6667V44C41 44.5523 40.5523 45 40 45H24C23.4477 45 23 44.5523 23 44V22.6667C23 22.1144 23.4477 21.6667 24 21.6667H27V20ZM37 24C37 24.5523 36.5523 25 36 25H28C27.4477 25 27 24.5523 27 24V23.6667H25V43H39V23.6667H37V24ZM35 23H29V21H35V23ZM35.3738 32.3738C35.7643 31.9832 35.7643 31.3501 35.3738 30.9596C34.9832 30.569 34.3501 30.569 33.9596 30.9596L31.3333 33.5858L30.0404 32.2929C29.6499 31.9024 29.0168 31.9024 28.6262 32.2929C28.2357 32.6834 28.2357 33.3166 28.6262 33.7071L30.6262 35.7071C31.0168 36.0976 31.6499 36.0976 32.0404 35.7071L35.3738 32.3738Z"
                fill="#23262A"
            />
        </svg>
    );

    return (
        <div data-section id="10">
            <Box background="surface-default" padding="10" className={styles.box}>
                <HStack justify="center">
                    <AndreGodkjenningerIcon />
                </HStack>
                <Heading level="2" size="large" align="start" spacing>
                    Andre godkjenninger
                </Heading>
                {andreGodkjenninger.length === 0 ? (
                    <div>
                        <BodyLong weight="semibold" spacing>
                            Du har ikke lagt til noen andre godkjenninger i CV-en
                        </BodyLong>
                        <BodyLong className={styles.mb12}>
                            En annen godkjenning er f.eks it-sertifiseringer, som ikke krever statlig godkjenning.
                        </BodyLong>
                    </div>
                ) : (
                    <div className={styles.mb6}>
                        {andreGodkjenninger.map((godkjenning, index) => (
                            <div key={index}>
                                <FormSummary style={{ marginBottom: "1rem" }}>
                                    <FormSummary.Header id="4">
                                        <FormSummary.Heading level="2">
                                            {godkjenning.certificateName}
                                        </FormSummary.Heading>
                                    </FormSummary.Header>
                                    <FormSummary.Answers>
                                        <FormSummary.Answer>
                                            <FormSummary.Label>Utsteder</FormSummary.Label>
                                            <FormSummary.Value>{godkjenning.issuer}</FormSummary.Value>
                                        </FormSummary.Answer>
                                        <FormSummary.Answer>
                                            <FormSummary.Label>Fullført</FormSummary.Label>
                                            <FormSummary.Value>
                                                {formatterFullDato(godkjenning.fromDate)}
                                            </FormSummary.Value>
                                        </FormSummary.Answer>
                                        <FormSummary.Answer>
                                            <FormSummary.Label>Utløper</FormSummary.Label>
                                            <FormSummary.Value>
                                                {formatterFullDato(godkjenning.toDate)}
                                            </FormSummary.Value>
                                        </FormSummary.Answer>
                                    </FormSummary.Answers>
                                </FormSummary>
                                <HStack justify="space-between" className={styles.mb6}>
                                    <Button
                                        icon={<PencilIcon aria-hidden />}
                                        variant="tertiary"
                                        onClick={() => toggleModal(true, index)}
                                    >
                                        Endre
                                    </Button>
                                    <Button
                                        icon={<TrashIcon aria-hidden />}
                                        variant="tertiary"
                                        onClick={() => slettGodkjenning(index)}
                                    >
                                        Fjern
                                    </Button>
                                </HStack>
                            </div>
                        ))}
                    </div>
                )}
                <Button icon={<PlusIcon aria-hidden />} variant="primary" onClick={() => toggleModal(true)}>
                    Legg til flere
                </Button>
            </Box>
            {modalÅpen && (
                <AndreGodkjenningerModal
                    modalÅpen={modalÅpen}
                    toggleModal={toggleModal}
                    godkjenning={andreGodkjenninger[gjeldendeGodkjenning]}
                    lagreGodkjenning={lagreGodkjenning}
                />
            )}
        </div>
    );
}
