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

function JobbonskerIcon() {
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
                d="M31.9991 22.6257C33.8646 20.9692 35.7005 20.167 37.4991 20.167C39.5245 20.167 41.2639 21.1842 42.7062 22.6266C45.8695 25.7899 45.6481 31.0989 41.3729 35.3741L32.7071 44.0399L31.9991 43.3337L31.2919 44.0407L22.6253 35.3741C18.3501 31.0989 18.1287 25.7899 21.292 22.6266C22.7343 21.1842 24.4737 20.167 26.4991 20.167C28.2977 20.167 30.1336 20.9692 31.9991 22.6257ZM31.9991 43.3337L31.2919 44.0407C31.4795 44.2282 31.7339 44.3337 31.9991 44.3337C32.2643 44.3337 32.5195 44.2275 32.7071 44.0399L31.9991 43.3337ZM31.9991 41.9194L39.9587 33.9599C43.6835 30.2351 43.462 26.2108 41.292 24.0408C40.0677 22.8164 38.807 22.167 37.4991 22.167C36.1912 22.167 34.5972 22.8164 32.7062 24.7074C32.5187 24.895 32.2643 25.0003 31.9991 25.0003C31.7339 25.0003 31.4795 24.895 31.292 24.7074C29.401 22.8164 27.807 22.167 26.4991 22.167C25.1912 22.167 23.9306 22.8164 22.7062 24.0408C20.5362 26.2108 20.3147 30.2351 24.0395 33.9599L31.9991 41.9194Z"
                fill="#23262A"
            />
        </svg>
    );
}

export default function Jobbonsker() {
    const [leggTilJobbonske, setLeggTilJobbonske] = useState(false);
    const [jobberOgYrker, setJobberOgYrker] = useState();
    const [hvorKanDuJobbe, setHvorKanDuJobbe] = useState();

    return (
        <div id="3">
            <Box background="surface-default" padding="10" className={styles.box}>
                <HStack justify="center">
                    <JobbonskerIcon />
                </HStack>
                <Heading level="2" size="large" align="start" spacing>
                    Jobbønsker
                </Heading>
                <BodyLong weight="semibold">Jobber og yrker</BodyLong>
                <BodyLong spacing>
                    Jedi master, Bounty hunter, Smuggler, Sith lord, Stormtrooper, Moisture farmer, Pilot
                </BodyLong>
                <div className={styles.divider}></div>
                <BodyLong weight="semibold">Områder</BodyLong>
                <BodyLong spacing>
                    Tatooine, Coruscant, Naboo, Bespin, Endor, Hoth, Dagobah, Mustafar, Geonosis, Kamino
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
