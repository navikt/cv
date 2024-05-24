import { BodyLong, Box, Button, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import { useState } from "react";

export default function Fagbrev() {
    const [fagbrev, setFagbrev] = useState(true);

    return (
        <div>
            <Box id="5" background="surface-default" padding="10" className={styles.box}>
                <Heading className={styles.mb6} level="2" size="large" align="start" spacing>
                    Fagbrev
                </Heading>
                {!fagbrev && (
                    <>
                        <BodyLong weight="semibold" spacing>
                            Du har ikke lagt til noen fagbrev i CV-en
                        </BodyLong>
                        <BodyLong className={styles.mb12}>
                            Her kan du sette inn ulike fagbrev som du har tatt, f.eks i bilpleie.
                        </BodyLong>
                        <Button icon={<PlusIcon aria-hidden />} variant="primary">
                            Legg til
                        </Button>
                    </>
                )}
                {fagbrev && (
                    <>
                        <BodyLong weight="semibold">Yrkeskompetanse mediedesigner</BodyLong>
                        <HStack justify="space-between" className={styles.mb3}>
                            <Button icon={<PencilIcon aria-hidden />} variant="tertiary">
                                Endre
                            </Button>
                            <Button icon={<TrashIcon aria-hidden />} variant="tertiary">
                                Fjern
                            </Button>
                        </HStack>
                        <div className={styles.divider}></div>
                        <BodyLong weight="semibold">Svennebrev profileringsdesigner</BodyLong>
                        <HStack justify="space-between" className={styles.mb3}>
                            <Button icon={<PencilIcon aria-hidden />} variant="tertiary">
                                Endre
                            </Button>
                            <Button icon={<TrashIcon aria-hidden />} variant="tertiary">
                                Fjern
                            </Button>
                        </HStack>
                        <div className={styles.divider}></div>
                        <BodyLong weight="semibold">Mesterbrev profileringsdesigner</BodyLong>
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
