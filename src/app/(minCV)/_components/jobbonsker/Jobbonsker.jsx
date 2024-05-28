import {
    BodyLong,
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Heading,
    HStack,
    Modal,
    TextField,
    VStack,
} from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { useState } from "react";

export default function Jobbonsker() {
    const [leggTilJobbonske, setLeggTilJobbonske] = useState(false);
    const [jobberOgYrker, setJobberOgYrker] = useState();
    const [hvorKanDuJobbe, setHvorKanDuJobbe] = useState();

    return (
        <div id="3">
            <Box background="surface-default" padding="10" className={styles.box}>
                <Heading level="2" size="large" align="start" spacing>
                    Jobbønsker
                </Heading>
                <BodyLong weight="semibold">Jobber og yrker</BodyLong>
                <BodyLong spacing>
                    Design Architect, Designer, Designer av tilbehør, Fiskearbeider (fiskehandel), Baker,
                    Dagbruddsoperatør, Administrasjonsdirektør, Subeditor, Ergoterapeut, Oralkirurg, Kamera-assistent,
                    Arbeidere innen treindustrien, Industriarbeider
                </BodyLong>
                <div className={styles.divider}></div>
                <BodyLong weight="semibold">Områder</BodyLong>
                <BodyLong spacing>
                    Deatnu-Tana, Agdenes, Aust-Agder, Bjørnafjorden, Oslo, Eidsvoll, Larvik, Bardu, Folldal
                </BodyLong>
                <div className={styles.divider}></div>
                <BodyLong weight="semibold">Heltid eller deltid</BodyLong>
                <BodyLong spacing>Heltid</BodyLong>
                <div className={styles.divider}></div>
                <BodyLong weight="semibold">Arbeidstider</BodyLong>
                <BodyLong spacing>Ukedager, Lørdag, Søndag, Skift, Vakt, Turnus, Dagtid, Kveld, Natt</BodyLong>
                <div className={styles.divider}></div>
                <BodyLong weight="semibold">Ansettelsesform</BodyLong>
                <BodyLong spacing>
                    Fast, Vikariat, Engasjement, Prosjekt, Sesong, Lærling, Selvstendig næringsdrivende, Feriejobb,
                    Annet
                </BodyLong>
                <div className={styles.divider}></div>
                <BodyLong weight="semibold">Oppstart</BodyLong>
                <BodyLong className={styles.mb16}>Jeg har 3 måneders oppsigelse</BodyLong>
                <HStack justify="space-between">
                    <Button
                        icon={<PencilIcon aria-hidden />}
                        variant="primary"
                        onClick={() => setLeggTilJobbonske(true)}
                    >
                        Endre
                    </Button>
                    <Button icon={<TrashIcon aria-hidden />} variant="secondary">
                        Fjern
                    </Button>
                </HStack>
            </Box>
            <Modal
                open={leggTilJobbonske}
                aria-label="Legg til jobbønske"
                onClose={() => setLeggTilJobbonske(false)}
                width="medium"
            >
                <Modal.Header closeButton={true}>
                    <Heading align="start" level="3" size="medium">
                        <HStack gap="1" align="center">
                            Legg til Jobbønsker
                        </HStack>
                    </Heading>
                </Modal.Header>
                <Modal.Body style={{ padding: "1rem 2.8rem 2.5rem 2.8rem" }}>
                    <HStack justify="space-between">
                        <VStack className={styles.element}>
                            <TextField
                                className={styles.mb6}
                                label="Jobber og yrker"
                                description="Må fylles ut"
                                value={jobberOgYrker}
                                onChange={(e) => setJobberOgYrker(e.target.value)}
                            />
                        </VStack>
                        <VStack className={styles.element}>
                            <TextField
                                className={styles.mb6}
                                label="Hvor kan du jobbe"
                                description="Må fylles ut"
                                value={hvorKanDuJobbe}
                                onChange={(e) => setHvorKanDuJobbe(e.target.value)}
                            />
                        </VStack>
                    </HStack>
                    <CheckboxGroup className={styles.mb6} legend="Vil du jobbe heltid eller deltid?">
                        <HStack gap="4">
                            <Checkbox value="heltid">Heltid</Checkbox>
                            <Checkbox value="deltid">Deltid</Checkbox>
                        </HStack>
                    </CheckboxGroup>
                    <CheckboxGroup className={styles.mb6} legend="Når kan du jobbe?">
                        <HStack>
                            <Checkbox className={styles.checkbox} value="dagtid">
                                Dagtid
                            </Checkbox>
                            <Checkbox className={styles.checkbox} value="kveld">
                                Kveld
                            </Checkbox>
                            <Checkbox className={styles.checkbox} value="natt">
                                Natt
                            </Checkbox>
                            <Checkbox className={styles.checkbox} value="ukedager">
                                Ukedager
                            </Checkbox>
                            <Checkbox className={styles.checkbox} value="lordag">
                                Lørdag
                            </Checkbox>
                            <Checkbox className={styles.checkbox} value="sondag">
                                Søndag
                            </Checkbox>
                            <Checkbox className={styles.checkbox} value="skift">
                                Skift
                            </Checkbox>
                            <Checkbox className={styles.checkbox} value="vakt">
                                Vakt
                            </Checkbox>
                            <Checkbox className={styles.checkbox} value="turnus">
                                Turnus
                            </Checkbox>
                        </HStack>
                    </CheckboxGroup>
                    <CheckboxGroup className={styles.mb6} legend="Hva slags ansettelse ønsker du?">
                        <HStack>
                            <Checkbox className={styles.checkbox} value="fast">
                                Fast
                            </Checkbox>
                            <Checkbox className={styles.checkbox} value="vikariat">
                                Vikariat
                            </Checkbox>
                            <Checkbox className={styles.checkbox} value="engasjement">
                                Engasjement
                            </Checkbox>
                            <Checkbox className={styles.checkbox} value="prosjekt">
                                Prosjekt
                            </Checkbox>
                            <Checkbox className={styles.checkbox} value="sesong">
                                Sesong
                            </Checkbox>
                            <Checkbox className={styles.checkbox} value="larling">
                                Lærling
                            </Checkbox>
                            <Checkbox className={styles.checkbox} value="selvstendig">
                                Selvstendig næringsdrivende
                            </Checkbox>
                            <Checkbox className={styles.checkbox} value="feriejobb">
                                Feriejobb
                            </Checkbox>
                            <Checkbox className={styles.checkbox} value="annet">
                                Annet
                            </Checkbox>
                        </HStack>
                    </CheckboxGroup>
                    <CheckboxGroup legend="Når kan du begynne i ny jobb?">
                        <HStack>
                            <Checkbox className={styles.checkbox} value="kanBegynneNa">
                                Jeg kan begynne nå
                            </Checkbox>
                            <Checkbox className={styles.checkbox} value="3MånedersOppsigelse">
                                Jeg har 3 måneders oppsigelse
                            </Checkbox>
                            <Checkbox className={styles.checkbox} value="begynneEtterNarmereAvtale">
                                Jeg kan begynne etter nærmere avtale
                            </Checkbox>
                        </HStack>
                    </CheckboxGroup>
                </Modal.Body>
                <Modal.Footer>
                    <HStack gap="4">
                        <Button variant="secondary" onClick={() => setLeggTilJobbonske(false)}>
                            Avbryt
                        </Button>
                        <Button variant="primary">Lagre</Button>
                    </HStack>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
