import { BodyLong, Box, Button, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";

export default function Jobbonsker() {
    return (
        <div>
            <Box id="3" background="surface-default" padding="10" className={styles.box}>
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
                    <Button icon={<PencilIcon aria-hidden />} variant="primary">
                        Endre
                    </Button>
                    <Button icon={<TrashIcon aria-hidden />} variant="secondary">
                        Fjern
                    </Button>
                </HStack>
            </Box>
        </div>
    );
}
