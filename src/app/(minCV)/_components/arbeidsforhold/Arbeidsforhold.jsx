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
                <SeksjonSkeleton
                    icon={<HStack className={[styles.iconArbeidsforholdBig, styles.sectionIcon]} aria-hidden="true" />}
                />
            </section>
        );
    }

    if (aaregLaster) {
        return (
            <section data-section id={SeksjonsIdEnum.ARBEIDSFORHOLD}>
                <HentArbeidsforholdSkeleton
                    icon={<HStack className={[styles.iconArbeidsforholdBig, styles.sectionIcon]} aria-hidden="true" />}
                />
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
                    <HStack className={[styles.iconArbeidsforholdBig, styles.sectionIcon]} aria-hidden="true" />
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
                                        <FormSummary.Heading id={`${summaryHeadingId}-${index}`} level="3">
                                            {erfaring.jobTitle || erfaring.alternativeJobTitle}
                                        </FormSummary.Heading>
                                    </FormSummary.Header>
                                    <FormSummary.Answers aria-labelledby={`${summaryHeadingId}-${index}`}>
                                        <FormSummary.Answer>
                                            <FormSummary.Label>Bedrift</FormSummary.Label>
                                            <FormSummary.Value>{erfaring.employer || "Ikke utfylt"}</FormSummary.Value>
                                        </FormSummary.Answer>
                                        <FormSummary.Answer>
                                            <FormSummary.Label>Sted</FormSummary.Label>
                                            <FormSummary.Value>{erfaring.location || "Ikke utfylt"}</FormSummary.Value>
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
                                        onKeyUp={(e) => {
                                            // Prevent Firefox double action with spacebar
                                            if (e.code === "Space") {
                                                e.preventDefault();
                                                slettElement(index);
                                            }
                                        }}
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
