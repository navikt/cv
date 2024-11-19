import { Alert, BodyLong, Box, Button, FormSummary, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { FileImportIcon, PencilIcon, PencilWritingIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import { ArbeidsforholdModal } from "@/app/(minCV)/_components/arbeidsforhold/ArbeidsforholdModal";
import { formatterDato } from "@/app/_common/utils/stringUtils";
import { CvSeksjonEnum, SeksjonsIdEnum } from "@/app/_common/enums/cvEnums";
import { useHentArbeidsforhold } from "@/app/_common/hooks/swr/useHentArbeidsforhold";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { SeksjonSkeleton } from "@/app/_common/components/SeksjonSkeleton";
import parse from "html-react-parser";
import { HentArbeidsforholdSkeleton } from "@/app/(minCV)/_components/arbeidsforhold/HentArbeidsforholdSkeleton";
import { useOppdaterCvSeksjonNoCache } from "@/app/_common/hooks/swr/useOppdaterCvSeksjonNoCache";
import { useCvModal } from "@/app/_common/hooks/useCvModal";
import { useId } from "react";
import { datosorterElementer } from "@/app/_common/utils/dateUtils";

function ArbeidsforholdIcon() {
    return (
        <svg
            aria-hidden="true"
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
export default function Arbeidsforhold() {
    const { arbeidsforhold, cvLaster } = useCv();
    const oppdateringprops = useOppdaterCvSeksjonNoCache(CvSeksjonEnum.ARBEIDSFORHOLD);
    const { aaregManglerData, aaregLaster, setSkalHenteData } = useHentArbeidsforhold(oppdateringprops);
    const modalProps = useCvModal(arbeidsforhold, oppdateringprops);
    const { modalÅpen, toggleModal, slettElement, lastendeIndex } = modalProps;
    const headingId = useId();
    const summaryHeadingId = useId();

    const arbeidsforholdManglerFelter = (forhold) => {
        const verdiMangler = (verdi) => !verdi || verdi === "string";
        return verdiMangler(forhold.employer) || verdiMangler(forhold.location) || verdiMangler(forhold.description);
    };

    const manglerFelter = arbeidsforhold?.some((forhold) => arbeidsforholdManglerFelter(forhold)) || false;

    if (cvLaster) {
        return (
            <section data-section id={SeksjonsIdEnum.ARBEIDSFORHOLD}>
                <SeksjonSkeleton icon={<ArbeidsforholdIcon />} />
            </section>
        );
    }

    if (aaregLaster) {
        return (
            <section data-section id={SeksjonsIdEnum.ARBEIDSFORHOLD}>
                <HentArbeidsforholdSkeleton icon={<ArbeidsforholdIcon />} />
            </section>
        );
    }

    return (
        <section
            aria-labelledby={cvLaster || aaregLaster ? undefined : headingId}
            data-section
            id={SeksjonsIdEnum.ARBEIDSFORHOLD}
        >
            <Box background="surface-default" padding="10" className={styles.box}>
                <HStack justify="center">
                    <ArbeidsforholdIcon />
                </HStack>
                <Heading id={headingId} level="2" size="large" align="start" spacing>
                    Arbeidsforhold
                </Heading>
                {((aaregManglerData === true && arbeidsforhold.length === 0) || manglerFelter) && (
                    <Alert variant={aaregManglerData ? "info" : "warning"} className={styles.mb6}>
                        {aaregManglerData
                            ? "Vi kunne ikke se at du er registert i Arbeidsgiver- og arbeidstakerregisteret med noen arbeidsforhold. Hvis dette ikke er riktig, bør du kontakte AA-registeret slik at informasjonen rettes."
                            : "Noen av feltene i arbeidsforhold er ikke utfylt. Vi anbefaler å se over og endre feltene som er tomme."}
                    </Alert>
                )}
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
                            <Button
                                icon={<FileImportIcon aria-hidden />}
                                variant="primary"
                                onClick={() => setSkalHenteData(true)}
                                loading={aaregLaster}
                            >
                                Hent arbeidsforhold
                            </Button>
                            <Button
                                aria-label="Jeg vil legge til arbeidsforhold selv"
                                icon={<PencilWritingIcon aria-hidden />}
                                variant="secondary"
                                onClick={() => toggleModal(true)}
                            >
                                Jeg vil legge til selv
                            </Button>
                        </HStack>
                    </>
                ) : (
                    <>
                        {datosorterElementer(arbeidsforhold).map((erfaring, index) => (
                            <div key={index}>
                                <FormSummary className={styles.mb3}>
                                    <FormSummary.Header>
                                        <FormSummary.Heading id={summaryHeadingId} level="2">
                                            {erfaring.jobTitle || erfaring.alternativeJobTitle}
                                        </FormSummary.Heading>
                                    </FormSummary.Header>
                                    <FormSummary.Answers aria-labelledby={summaryHeadingId}>
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
                                                {(erfaring.description &&
                                                    parse(erfaring.description.replace(/\n/g, "<br>"))) ||
                                                    "Ikke utfylt"}
                                            </FormSummary.Value>
                                        </FormSummary.Answer>
                                    </FormSummary.Answers>
                                </FormSummary>
                                <HStack justify="space-between" className={styles.mb12}>
                                    <Button
                                        aria-label={`Endre arbeidsforhold ${erfaring.jobTitle}`}
                                        icon={<PencilIcon aria-hidden />}
                                        variant="tertiary"
                                        onClick={() => toggleModal(true, index)}
                                    >
                                        Endre
                                    </Button>
                                    <Button
                                        aria-label={`Fjern arbeidsforhold ${erfaring.jobTitle}`}
                                        icon={<TrashIcon aria-hidden />}
                                        variant="tertiary"
                                        onClick={() => slettElement(index)}
                                        loading={lastendeIndex === index}
                                    >
                                        Fjern
                                    </Button>
                                </HStack>
                            </div>
                        ))}
                        <Button
                            aria-label="Legg til flere arbeidsforhold"
                            icon={<PlusIcon aria-hidden />}
                            variant="primary"
                            onClick={() => toggleModal(true)}
                        >
                            Legg til flere
                        </Button>
                    </>
                )}
            </Box>
            {modalÅpen && <ArbeidsforholdModal {...modalProps} />}
        </section>
    );
}
