import {
    BodyLong,
    Box,
    Button,
    Checkbox,
    FormSummary,
    Heading,
    HStack,
    Modal,
    Select,
    Textarea,
    TextField,
    VStack,
} from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useState } from "react";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";

export default function Arbeidsforhold() {
    const [arbeidsforhold, setArbeidsforhold] = useState(true);
    const [leggTilArbeidsforhold, setLeggTilArbeidsforhold] = useState(false);
    const [stillingYrke, setStillingYrke] = useState();
    const [alternativTittel, setAlternativTittel] = useState();
    const [bedrift, setBedrift] = useState();
    const [sted, setSted] = useState();
    const [bekreftJobbJegHarNa, setBekreftJobbJegHarNa] = useState(false);

    return (
        <div id="6">
            <Box background="surface-default" padding="10" className={styles.box}>
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
                        <Button
                            icon={<PlusIcon aria-hidden />}
                            variant="primary"
                            onClick={() => setLeggTilArbeidsforhold(true)}
                        >
                            Legg til flere
                        </Button>
                    </>
                )}
            </Box>
            <Modal
                open={leggTilArbeidsforhold}
                aria-label="Legg til arbeidsforhold"
                onClose={() => setLeggTilArbeidsforhold(false)}
                width="medium"
            >
                <Modal.Header closeButton={true}>
                    <Heading align="start" level="3" size="medium">
                        <HStack gap="1" align="center">
                            Legg til Arbeidsforhold
                        </HStack>
                    </Heading>
                </Modal.Header>
                <Modal.Body>
                    <HStack justify="space-between">
                        <VStack className={styles.element}>
                            <TextField
                                className={styles.mb6}
                                label="Stilling/yrke"
                                description="Må fylles ut"
                                value={stillingYrke}
                                onChange={(e) => setStillingYrke(e.target.value)}
                            />
                        </VStack>
                        <VStack className={styles.element}>
                            <TextField
                                className={styles.mb6}
                                label="Alternativ tittel"
                                description="Dersom ditt yrke ikke står i listen"
                                value={alternativTittel}
                                onChange={(e) => setAlternativTittel(e.target.value)}
                            />
                        </VStack>
                    </HStack>
                    <HStack justify="space-between">
                        <VStack className={styles.element}>
                            <TextField
                                className={styles.mb6}
                                label="Bedrift"
                                value={bedrift}
                                onChange={(e) => setBedrift(e.target.value)}
                            />
                        </VStack>
                        <VStack className={styles.element}>
                            <TextField
                                className={styles.mb6}
                                label="Sted"
                                value={sted}
                                onChange={(e) => setSted(e.target.value)}
                            />
                        </VStack>
                    </HStack>
                    <Textarea
                        label="Arbeidsoppgaver"
                        description="Skriv litt om rollen din og de viktigste oppgavene dine"
                        className={styles.mb6}
                    />
                    <Checkbox
                        value="jobbJegHarNå"
                        checked={bekreftJobbJegHarNa}
                        onChange={() => setBekreftJobbJegHarNa((x) => !x)}
                    >
                        Jobb jeg har nå
                    </Checkbox>
                    <HStack gap="8">
                        <HStack gap="4">
                            <Select label="Fra">
                                <option value="måned">Måned</option>
                                <option value="januar">Januar</option>
                                <option value="februar">Februar</option>
                                <option value="mars">Mars</option>
                                <option value="april">April</option>
                                <option value="mai">Mai</option>
                                <option value="juni">Juni</option>
                                <option value="juli">Juli</option>
                                <option value="august">August</option>
                                <option value="september">September</option>
                                <option value="oktober">Oktober</option>
                                <option value="november">November</option>
                                <option value="desember">Desember</option>
                            </Select>
                            <Select label="&nbsp;">
                                <option value="år">År</option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                                <option value="2015">2015</option>
                                <option value="2014">2014</option>
                                <option value="2013">2013</option>
                            </Select>
                        </HStack>
                        {!bekreftJobbJegHarNa && (
                            <HStack gap="4">
                                <Select label="Til">
                                    <option value="måned">Måned</option>
                                    <option value="januar">Januar</option>
                                    <option value="februar">Februar</option>
                                    <option value="mars">Mars</option>
                                    <option value="april">April</option>
                                    <option value="mai">Mai</option>
                                    <option value="juni">Juni</option>
                                    <option value="juli">Juli</option>
                                    <option value="august">August</option>
                                    <option value="september">September</option>
                                    <option value="oktober">Oktober</option>
                                    <option value="november">November</option>
                                    <option value="desember">Desember</option>
                                </Select>
                                <Select label="&nbsp;">
                                    <option value="år">År</option>
                                    <option value="2024">2024</option>
                                    <option value="2023">2023</option>
                                    <option value="2022">2022</option>
                                    <option value="2021">2021</option>
                                    <option value="2020">2020</option>
                                    <option value="2019">2019</option>
                                    <option value="2018">2018</option>
                                    <option value="2017">2017</option>
                                    <option value="2016">2016</option>
                                    <option value="2015">2015</option>
                                    <option value="2014">2014</option>
                                    <option value="2013">2013</option>
                                </Select>
                            </HStack>
                        )}
                    </HStack>
                </Modal.Body>
                <Modal.Footer>
                    <HStack gap="4">
                        <Button variant="secondary" onClick={() => setLeggTilArbeidsforhold(false)}>
                            Avbryt
                        </Button>
                        <Button variant="primary">Lagre</Button>
                    </HStack>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
