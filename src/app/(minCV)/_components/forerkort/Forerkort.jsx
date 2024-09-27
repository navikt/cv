import { BodyLong, Box, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import { useContext, useEffect, useState } from "react";
import { CvOgPersonContext } from "@/app/(minCV)/_components/context/CvContext";
import { formatterDato } from "@/app/utils/stringUtils";
import FørerkortModal from "@/app/(minCV)/_components/forerkort/FørerkortModal";

export default function Forerkort() {
    const cvContext = useContext(CvOgPersonContext).cv;
    const [førerkort, setFørerkort] = useState([]);
    const [modalÅpen, setModalÅpen] = useState(false);
    const [gjeldendeFørerkort, setGjeldendeFørerkort] = useState(-1);

    useEffect(() => {
        const oppdaterFørerkort = (førerkort) => setFørerkort(førerkort);
        if (cvContext.status === "success") oppdaterFørerkort(cvContext.data.foererkort || []);
    }, [cvContext]);

    const toggleModal = (åpen, index) => {
        setGjeldendeFørerkort(index >= 0 ? index : -1);
        setModalÅpen(åpen);
    };

    const lagreFørerkort = (oppdatertFørerkort) => {
        const oppdaterteFørerkort = [...førerkort];
        if (gjeldendeFørerkort >= 0) oppdaterteFørerkort.splice(gjeldendeFørerkort, 1, oppdatertFørerkort);
        else oppdaterteFørerkort.push(oppdatertFørerkort);

        // TODO: Send oppdatering til backend og oppdater data med responsen / feilmelding
        setFørerkort(oppdaterteFørerkort);
        setModalÅpen(false);
    };

    const slettFørerkort = (index) => {
        const oppdaterteFørerkort = [...førerkort];
        oppdaterteFørerkort.splice(index, 1);
        setFørerkort(oppdaterteFørerkort);
    };
    return (
        <div id="12">
            <Box background="surface-default" padding="10" className={styles.box}>
                <Heading level="2" size="large" align="start" spacing>
                    Førerkort
                </Heading>
                {førerkort.length === 0 ? (
                    <div>
                        <BodyLong weight="semibold" spacing>
                            Du har ikke lagt til noen førerkort i CV-en
                        </BodyLong>
                        <BodyLong className={styles.mb12}>
                            Her kan du sette inn alle ulike førerkort, f.eks lastebil.
                        </BodyLong>
                    </div>
                ) : (
                    <div className={styles.mb6}>
                        {førerkort.map((fk, index) => (
                            <div key={index}>
                                <VStack className={styles.mb3}>
                                    <BodyLong weight="semibold">• {fk.type}</BodyLong>
                                    {fk.acquiredDate && (
                                        <BodyLong weight="regular">
                                            {`Gyldig fra ${formatterDato(fk.acquiredDate)} - ${formatterDato(fk.expiryDate)}`}
                                        </BodyLong>
                                    )}
                                </VStack>
                                <HStack justify="space-between" className={styles.mb3}>
                                    <Button
                                        icon={<PencilIcon aria-hidden />}
                                        variant="tertiary"
                                        onClick={() => toggleModal(true, index)}
                                    >
                                        Endre
                                    </Button>
                                    <Button
                                        icon={<TrashIcon aria-hidden />}
                                        variant="tertiary"
                                        onClick={() => slettFørerkort(index)}
                                    >
                                        Fjern
                                    </Button>
                                </HStack>
                                {index < førerkort.length - 1 && <div className={styles.divider}></div>}
                            </div>
                        ))}
                    </div>
                )}
                <Button icon={<PlusIcon aria-hidden />} variant="primary" onClick={() => toggleModal(true)}>
                    Legg til
                </Button>
            </Box>
            {modalÅpen && (
                <FørerkortModal
                    modalÅpen={modalÅpen}
                    toggleModal={toggleModal}
                    førerkort={førerkort[gjeldendeFørerkort]}
                    lagreFørerkort={lagreFørerkort}
                />
            )}
        </div>
    );
}
