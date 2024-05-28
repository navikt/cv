import {
    BodyLong,
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    FormSummary,
    Heading,
    HStack,
    Modal,
    Select,
    Textarea,
    TextField,
} from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useState } from "react";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";

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
    const [leggTilUtdanning, setLeggTilUtdanning] = useState(false);

    return (
        <div id="4">
            <Box background="surface-default" padding="10" className={styles.box}>
                <HStack justify="center">
                    <UtdanningerIcon />
                </HStack>
                <Heading level="2" size="large" align="start" spacing>
                    Utdanninger
                </Heading>
                <FormSummary style={{ marginBottom: "2rem" }}>
                    <FormSummary.Header id="4">
                        <FormSummary.Heading level="2">Doktorgrad</FormSummary.Heading>
                    </FormSummary.Header>

                    <FormSummary.Answers>
                        <FormSummary.Answer>
                            <FormSummary.Label>Skole/studiested</FormSummary.Label>
                            <FormSummary.Value>The Jedi Temple</FormSummary.Value>
                        </FormSummary.Answer>

                        <FormSummary.Answer>
                            <FormSummary.Label>Start- og sluttdato</FormSummary.Label>
                            <FormSummary.Value>April 2022 - nå</FormSummary.Value>
                        </FormSummary.Answer>

                        <FormSummary.Answer>
                            <FormSummary.Label>Beskrivelse</FormSummary.Label>
                            <FormSummary.Value>Jedi-knight in training</FormSummary.Value>
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
                <Button icon={<PlusIcon aria-hidden />} variant="primary" onClick={() => setLeggTilUtdanning(true)}>
                    Legg til flere
                </Button>
            </Box>
            <Modal
                open={leggTilUtdanning}
                aria-label="Legg til utdanning"
                onClose={() => setLeggTilUtdanning(false)}
                width="medium"
            >
                <Modal.Header closeButton={true}>
                    <Heading align="start" level="3" size="medium">
                        Legg til Utdanning
                    </Heading>
                </Modal.Header>
                <Modal.Body>
                    <BodyLong>
                        <b>Utdanningsnivå</b> *obligatorisk
                    </BodyLong>
                    <Select id="test" label="Hvilken type utdanning har du gått?" className={styles.mb6}>
                        <option value="">Velg</option>
                        <option value="grunnskole">Grunnskole</option>
                        <option value="folkehøgskole">Folkehøgskole</option>
                        <option value="videregående/yrkesskole">Videregående/yrkesskole</option>
                        <option value="fagskole">Fagskole</option>
                        <option value="høyere utdanning, 1-4 år">Høyere utdanning, 1-4 år</option>
                        <option value="høyere utdanning, 4+ år">Høyere utdanning, 4+ år</option>
                        <option value="doktorgrad">Doktorgrad</option>
                    </Select>
                    <TextField
                        label="Grad og utdanningsretning"
                        description="Eksempel: elektrofag, bachelor i historie"
                        className={styles.mb6}
                    />
                    <TextField
                        label="Skole/studiested"
                        description="Eksempel: Drammen videregående, Universitetet i Tromsø"
                        className={styles.mb6}
                    />
                    <Textarea
                        label="Beskriv utdanningen"
                        description="Eksempel: Studieretning eller fag du har fordypet deg i"
                        className={styles.mb6}
                    />
                    <CheckboxGroup legend="" className={styles.mb6}>
                        <Checkbox value="utdanning">Utdanning jeg tar nå</Checkbox>
                    </CheckboxGroup>
                    <HStack gap="32">
                        <BodyLong>
                            <b>Fra</b> *obligatorisk
                        </BodyLong>
                        <BodyLong>
                            <b>Til</b> *obligatorisk
                        </BodyLong>
                    </HStack>
                    <HStack gap="8">
                        <HStack gap="4">
                            <Select label="">
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
                            <Select label="">
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
                        <HStack gap="4">
                            <Select label="">
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
                            <Select label="">
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
                    </HStack>
                </Modal.Body>
                <Modal.Footer>
                    <HStack gap="4">
                        <Button variant="secondary" onClick={() => setLeggTilUtdanning(false)}>
                            Avbryt
                        </Button>
                        <Button variant="primary">Lagre</Button>
                    </HStack>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
