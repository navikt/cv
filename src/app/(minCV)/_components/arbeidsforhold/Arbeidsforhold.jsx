import { BodyLong, Box, Button, FormSummary, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useState } from "react";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";

export default function Arbeidsforhold() {
    const [arbeidsforhold, setArbeidsforhold] = useState(true);

    return (
        <div>
            <Box id="6" background="surface-default" padding="10" className={styles.box}>
                <Heading level="2" size="large" align="start" spacing>
                    Arbeidsforhold
                </Heading>
                {!arbeidsforhold && (
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
                            <Button variant="secondary">Jeg vil legge til selv</Button>
                        </HStack>
                    </>
                )}
                {arbeidsforhold && (
                    <>
                        <FormSummary className={styles.mb3}>
                            <FormSummary.Header>
                                <FormSummary.Heading level="2">Jedi Knight</FormSummary.Heading>
                            </FormSummary.Header>
                            <FormSummary.Answers>
                                <FormSummary.Answer>
                                    <FormSummary.Label>Bedrift</FormSummary.Label>
                                    <FormSummary.Value>The Jedi Temple</FormSummary.Value>
                                </FormSummary.Answer>
                                <FormSummary.Answer>
                                    <FormSummary.Label>Sted</FormSummary.Label>
                                    <FormSummary.Value>Coruscant gate 1</FormSummary.Value>
                                </FormSummary.Answer>
                                <FormSummary.Answer>
                                    <FormSummary.Label>Start- og sluttdato</FormSummary.Label>
                                    <FormSummary.Value>Januar 2020 - nå</FormSummary.Value>
                                </FormSummary.Answer>
                                <FormSummary.Answer>
                                    <FormSummary.Label>Arbeidsoppgaver</FormSummary.Label>
                                    <FormSummary.Value>Ikke utfylt</FormSummary.Value>
                                </FormSummary.Answer>
                            </FormSummary.Answers>
                        </FormSummary>
                        <HStack justify="space-between" className={styles.mb12}>
                            <Button icon={<PencilIcon aria-hidden />} variant="tertiary">
                                Endre
                            </Button>
                            <Button icon={<TrashIcon aria-hidden />} variant="tertiary">
                                Fjern
                            </Button>
                        </HStack>
                        <FormSummary className={styles.mb3}>
                            <FormSummary.Header>
                                <FormSummary.Heading level="2">Padawan</FormSummary.Heading>
                            </FormSummary.Header>
                            <FormSummary.Answers>
                                <FormSummary.Answer>
                                    <FormSummary.Label>Bedrift</FormSummary.Label>
                                    <FormSummary.Value>Yoda’s camp for Force-sensitive children</FormSummary.Value>
                                </FormSummary.Answer>
                                <FormSummary.Answer>
                                    <FormSummary.Label>Sted</FormSummary.Label>
                                    <FormSummary.Value>Dagobah system 17</FormSummary.Value>
                                </FormSummary.Answer>
                                <FormSummary.Answer>
                                    <FormSummary.Label>Start- og sluttdato</FormSummary.Label>
                                    <FormSummary.Value>September 2017 - November 2019</FormSummary.Value>
                                </FormSummary.Answer>
                                <FormSummary.Answer>
                                    <FormSummary.Label>Arbeidsoppgaver</FormSummary.Label>
                                    <FormSummary.Value>Ikke utfylt</FormSummary.Value>
                                </FormSummary.Answer>
                            </FormSummary.Answers>
                        </FormSummary>
                        <HStack justify="space-between" className={styles.mb12}>
                            <Button icon={<PencilIcon aria-hidden />} variant="tertiary">
                                Endre
                            </Button>
                            <Button icon={<TrashIcon aria-hidden />} variant="tertiary">
                                Fjern
                            </Button>
                        </HStack>
                        <Button icon={<PlusIcon aria-hidden />} variant="primary">
                            Legg til flere
                        </Button>
                    </>
                )}
            </Box>
        </div>
    );
}
