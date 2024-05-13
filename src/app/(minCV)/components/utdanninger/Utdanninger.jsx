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

export default function Utdanninger() {
    const [leggTilUtdanning, setLeggTilUtdanning] = useState(false);

    return (
        <div>
            <Box background="surface-default" padding="10" style={{ width: "600px", marginBottom: "2rem" }}>
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
                    <Button variant="tertiary">Endre</Button>
                    <Button variant="tertiary">Fjern</Button>
                </HStack>
                <Button variant="primary" onClick={() => setLeggTilUtdanning(true)}>
                    + Legg til flere
                </Button>
            </Box>
            <Modal
                open={leggTilUtdanning}
                aria-label="Tilbakemelding"
                onClose={() => setLeggTilUtdanning(false)}
                width="medium"
            >
                <Modal.Header closeButton={true}>
                    <Heading align="center" level="3" size="medium">
                        Legg til utdanning
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
                        <Button variant="primary">Lagre</Button>
                        <Button variant="secondary" onClick={() => setLeggTilUtdanning(false)}>
                            Avbryt
                        </Button>
                    </HStack>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
