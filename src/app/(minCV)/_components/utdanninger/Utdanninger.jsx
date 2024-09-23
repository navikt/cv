import { Box, Button, FormSummary, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useContext, useEffect, useState } from "react";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import { CvOgPersonContext } from "@/app/(minCV)/_components/context/CvContext";
import { UtdanningsnivåEnum } from "@/app/enums/cvEnums";
import { formatterDato } from "@/app/utils/stringUtils";
import { UtdanningModal } from "@/app/(minCV)/_components/utdanninger/UtdanningModal";

function UtdanningerIcon() {
    return (
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
                d="M31.5939 21.7532C31.8524 21.6383 32.1476 21.6383 32.4061 21.7532L44.3853 27.0772C44.47 27.1126 44.5488 27.1593 44.6197 27.2155C44.6688 27.2542 44.7138 27.2973 44.7544 27.3439C44.9074 27.5196 45 27.7491 45 28.0003V37.3337C45 37.8859 44.5523 38.3337 44 38.3337C43.4477 38.3337 43 37.8859 43 37.3337V29.5391L41 30.428V37.3337C41 37.7124 40.786 38.0587 40.4472 38.2281L40.1989 38.3522C35.0376 40.9329 28.9624 40.9329 23.8011 38.3522L23.5528 38.2281C23.214 38.0587 23 37.7124 23 37.3337V30.428L19.5939 28.9141C19.2327 28.7536 19 28.3955 19 28.0003C19 27.6051 19.2327 27.247 19.5939 27.0865L31.5939 21.7532ZM32.4061 34.2475L39 31.3169V36.7117C34.5705 38.8131 29.4295 38.8131 25 36.7117V31.3169L31.5939 34.2475C31.8524 34.3624 32.1476 34.3624 32.4061 34.2475ZM22.4622 28.0003L32 32.2393L41.5378 28.0003L32 23.7613L22.4622 28.0003Z"
                fill="#23262A"
            />
        </svg>
    );
}

export default function Utdanninger() {
    const cvContext = useContext(CvOgPersonContext).cv;

    const [modalÅpen, setModalÅpen] = useState(false);
    const [utdanninger, setUtdanninger] = useState([]);
    const [gjeldendeUtdanning, setGjeldendeUtdanning] = useState(-1);

    useEffect(() => {
        const oppdaterUtdanninger = (utdanning) => setUtdanninger(utdanning);
        if (cvContext.status === "success") oppdaterUtdanninger(cvContext.data.utdanning || {});
    }, [cvContext]);

    const toggleModal = (åpen, index) => {
        setGjeldendeUtdanning(index >= 0 ? index : -1);
        setModalÅpen(åpen);
    };

    const lagreUtdanning = (utdanning) => {
        const oppdaterteUtdanninger = [...utdanninger];
        if (gjeldendeUtdanning >= 0) oppdaterteUtdanninger.splice(gjeldendeUtdanning, 1, utdanning);
        else oppdaterteUtdanninger.push(utdanning);

        // TODO: Send oppdatering til backend og oppdater data med responsen / feilmelding
        setUtdanninger(oppdaterteUtdanninger);
        setModalÅpen(false);
    };

    const slettUtdanning = (index) => {
        const oppdaterteUtdanninger = [...utdanninger];
        oppdaterteUtdanninger.splice(index, 1);
        setUtdanninger(oppdaterteUtdanninger);
    };

    return (
        <div id="4">
            <Box background="surface-default" padding="10" className={styles.box}>
                <HStack justify="center">
                    <UtdanningerIcon />
                </HStack>
                <Heading level="2" size="large" align="start" spacing>
                    Utdanninger
                </Heading>
                {utdanninger.map((utdanning, index) => (
                    <div key={index}>
                        <FormSummary style={{ marginBottom: "2rem" }}>
                            <FormSummary.Header id="4">
                                <FormSummary.Heading level="2">
                                    {UtdanningsnivåEnum[utdanning.nuskode]}
                                </FormSummary.Heading>
                            </FormSummary.Header>

                            <FormSummary.Answers>
                                <FormSummary.Answer>
                                    <FormSummary.Label>Grad og utdanningsretning</FormSummary.Label>
                                    <FormSummary.Value>{utdanning.field}</FormSummary.Value>
                                </FormSummary.Answer>

                                <FormSummary.Answer>
                                    <FormSummary.Label>Skole/studiested</FormSummary.Label>
                                    <FormSummary.Value>{utdanning.institution}</FormSummary.Value>
                                </FormSummary.Answer>

                                <FormSummary.Answer>
                                    <FormSummary.Label>Start- og sluttdato</FormSummary.Label>
                                    <FormSummary.Value>
                                        {formatterDato(utdanning.startDate)} - {formatterDato(utdanning.endDate)}
                                    </FormSummary.Value>
                                </FormSummary.Answer>

                                <FormSummary.Answer>
                                    <FormSummary.Label>Beskrivelse</FormSummary.Label>
                                    <FormSummary.Value>{utdanning.description}</FormSummary.Value>
                                </FormSummary.Answer>
                            </FormSummary.Answers>
                        </FormSummary>
                        <HStack justify="space-between" className={styles.mb12}>
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
                                onClick={() => slettUtdanning(index)}
                            >
                                Fjern
                            </Button>
                        </HStack>
                    </div>
                ))}
                <Button icon={<PlusIcon aria-hidden />} variant="primary" onClick={() => toggleModal(true)}>
                    Legg til flere
                </Button>
            </Box>
            <UtdanningModal
                modalÅpen={modalÅpen}
                toggleModal={toggleModal}
                utdanning={utdanninger[gjeldendeUtdanning]}
                lagreUtdanning={lagreUtdanning}
            />
        </div>
    );
}
