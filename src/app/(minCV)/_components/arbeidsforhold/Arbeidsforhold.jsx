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
