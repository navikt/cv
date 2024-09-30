import { BodyLong, Box, Button, FormSummary, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useContext, useEffect, useState } from "react";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import { CvOgPersonContext } from "@/app/(minCV)/_components/context/CvContext";
import { ArbeidsforholdModal } from "@/app/(minCV)/_components/arbeidsforhold/ArbeidsforholdModal";
import { formatterDato } from "@/app/utils/stringUtils";

export default function Arbeidsforhold() {
    const cvContext = useContext(CvOgPersonContext).cv;

    const [modalÅpen, setModalÅpen] = useState(false);
    const [arbeidsforhold, setArbeidsforhold] = useState([]);
    const [gjeldendeArbeidsforhold, setGjeldendeArbeidsforhold] = useState(-1);

    useEffect(() => {
        const oppdaterArbeidsforhold = (arbeidsforhold) => setArbeidsforhold(arbeidsforhold);
        if (cvContext.status === "success") oppdaterArbeidsforhold(cvContext.data.arbeidserfaring || []);
    }, [cvContext]);

    const toggleModal = (åpen, index) => {
        setGjeldendeArbeidsforhold(index >= 0 ? index : -1);
        setModalÅpen(åpen);
    };

    const slettArbeidsforhold = (index) => {
        const oppdaterteArbeidsforhold = [...arbeidsforhold];
        oppdaterteArbeidsforhold.splice(index, 1);
        setArbeidsforhold(oppdaterteArbeidsforhold);
    };

    const lagreArbeidsforhold = (oppdatertArbeidsforhold) => {
        const oppdaterteArbeidsforhold = [...arbeidsforhold];
        if (gjeldendeArbeidsforhold >= 0)
            oppdaterteArbeidsforhold.splice(gjeldendeArbeidsforhold, 1, oppdatertArbeidsforhold);
        else oppdaterteArbeidsforhold.push(oppdatertArbeidsforhold);

        // TODO: Send oppdatering til backend og oppdater data med responsen / feilmelding
        setArbeidsforhold(oppdaterteArbeidsforhold);
        setModalÅpen(false);
    };

    function ArbeidsforholdIcon() {
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
                    d="M24.3333 20C24.3333 19.4477 24.781 19 25.3333 19H38.6667C39.219 19 39.6667 19.4477 39.6667 20V28.3333H44C44.5523 28.3333 45 28.781 45 29.3333V44C45 44.5523 44.5523 45 44 45H20C19.4477 45 19 44.5523 19 44V29.3333C19 28.781 19.4477 28.3333 20 28.3333H24.3333V20ZM39.6667 43V30.3333H43V43H39.6667ZM37.6667 21V43H26.3333V21H37.6667ZM24.3333 30.3333V43H21V30.3333H24.3333ZM29.3333 23.6667C29.8856 23.6667 30.3333 24.1144 30.3333 24.6667V27.3333C30.3333 27.8856 29.8856 28.3333 29.3333 28.3333C28.781 28.3333 28.3333 27.8856 28.3333 27.3333V24.6667C28.3333 24.1144 28.781 23.6667 29.3333 23.6667ZM33.3333 23.6667C33.8856 23.6667 34.3333 24.1144 34.3333 24.6667V27.3333C34.3333 27.8856 33.8856 28.3333 33.3333 28.3333C32.781 28.3333 32.3333 27.8856 32.3333 27.3333V24.6667C32.3333 24.1144 32.781 23.6667 33.3333 23.6667ZM30.3333 32.6667C30.3333 32.1144 29.8856 31.6667 29.3333 31.6667C28.781 31.6667 28.3333 32.1144 28.3333 32.6667V35.3333C28.3333 35.8856 28.781 36.3333 29.3333 36.3333C29.8856 36.3333 30.3333 35.8856 30.3333 35.3333V32.6667ZM33.3333 31.6667C33.8856 31.6667 34.3333 32.1144 34.3333 32.6667V35.3333C34.3333 35.8856 33.8856 36.3333 33.3333 36.3333C32.781 36.3333 32.3333 35.8856 32.3333 35.3333V32.6667C32.3333 32.1144 32.781 31.6667 33.3333 31.6667Z"
                    fill="#23262A"
                />
            </svg>
        );
    }

    return (
        <div id="6">
            <Box background="surface-default" padding="10" className={styles.box}>
                <HStack justify="center">
                    <ArbeidsforholdIcon />
                </HStack>
                <Heading level="2" size="large" align="start" spacing>
                    Arbeidsforhold
                </Heading>
                {arbeidsforhold.length === 0 ? (
                    <>
                        <BodyLong weight="semibold" spacing>
                            Vil du hente inn dine tidligere arbeidsforhold?
                        </BodyLong>
                        <BodyLong className={styles.mb12}>
                            Ved å bruke Arbeidsgiver- og arbeidstakerregisteret kan vi hente inn dine tidligere
                            arbeidsforhold til CV-en din.
                        </BodyLong>
                        <HStack justify="space-between">
                            <Button variant="primary">Hent arbeidsforhold</Button>
                            <Button variant="secondary" onClick={() => toggleModal(true)}>
                                Jeg vil legge til selv
                            </Button>
                        </HStack>
                    </>
                ) : (
                    <>
                        {arbeidsforhold.map((erfaring, index) => (
                            <div key={index}>
                                <FormSummary className={styles.mb3}>
                                    <FormSummary.Header>
                                        <FormSummary.Heading level="2">
                                            {erfaring.jobTitle || erfaring.alternativeJobTitle}
                                        </FormSummary.Heading>
                                    </FormSummary.Header>
                                    <FormSummary.Answers>
                                        <FormSummary.Answer>
                                            <FormSummary.Label>Bedrift</FormSummary.Label>
                                            <FormSummary.Value>{erfaring.employer}</FormSummary.Value>
                                        </FormSummary.Answer>
                                        <FormSummary.Answer>
                                            <FormSummary.Label>Sted</FormSummary.Label>
                                            <FormSummary.Value>{erfaring.location}</FormSummary.Value>
                                        </FormSummary.Answer>
                                        <FormSummary.Answer>
                                            <FormSummary.Label>Start- og sluttdato</FormSummary.Label>
                                            <FormSummary.Value>
                                                {`${formatterDato(erfaring.fromDate)} - ${formatterDato(erfaring.toDate)}`}
                                            </FormSummary.Value>
                                        </FormSummary.Answer>
                                        <FormSummary.Answer>
                                            <FormSummary.Label>Arbeidsoppgaver</FormSummary.Label>
                                            <FormSummary.Value>
                                                {erfaring.description || "Ikke utfylt"}
                                            </FormSummary.Value>
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
                                        onClick={() => slettArbeidsforhold(index)}
                                    >
                                        Fjern
                                    </Button>
                                </HStack>
                            </div>
                        ))}
                        <Button icon={<PlusIcon aria-hidden />} variant="primary" onClick={() => toggleModal(true)}>
                            Legg til flere
                        </Button>
                    </>
                )}
            </Box>
            {modalÅpen && (
                <ArbeidsforholdModal
                    modalÅpen={modalÅpen}
                    toggleModal={toggleModal}
                    arbeidsforhold={arbeidsforhold[gjeldendeArbeidsforhold]}
                    lagreArbeidsforhold={lagreArbeidsforhold}
                />
            )}
        </div>
    );
}
