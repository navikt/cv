import { BodyLong, Box, Button, Heading } from "@navikt/ds-react";
import styles from "@/app/page.module.css";

export default function Personalia() {
    return (
        <div>
            <Box id="2" background="surface-default" padding="10" style={{ width: "600px", marginBottom: "2rem" }}>
                <Heading level="2" size="large" align="start" spacing>
                    Personalia
                </Heading>
                <BodyLong weight="semibold">Navn</BodyLong>
                <BodyLong spacing>Luke Skywalker</BodyLong>
                <div className={styles.divider}></div>
                <BodyLong weight="semibold">Telefon</BodyLong>
                <BodyLong spacing>+47 99 99 99 99</BodyLong>
                <div className={styles.divider}></div>
                <BodyLong weight="semibold">E-post</BodyLong>
                <BodyLong spacing>Luke@jedi.no</BodyLong>
                <div className={styles.divider}></div>
                <BodyLong weight="semibold">Adresse</BodyLong>
                <BodyLong spacing>Alderaan gate 24, 0661 Oslo</BodyLong>
                <Button variant="primary">Endre</Button>
            </Box>
        </div>
    );
}
