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

    const FørerkortIcon = () => (
        <svg
            style={{ marginTop: "-4.5rem", marginBottom: "4rem" }}
            width="64"
            height="62"
            viewBox="0 0 64 62"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="64" height="61.3877" rx="30.6939" fill="#7CDAF8" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23.7333 23.1605C24.4258 22.2372 25.5126 21.6938 26.6667 21.6938H33.3333C34.4874 21.6938 35.5742 22.2372 36.2667 23.1605L39.2914 27.1934L43.486 28.7664C44.3967 29.1079 45 29.9785 45 30.9512V32.9861C45 34.0568 44.2713 34.9901 43.2326 35.2498L42.3264 35.4764C42.331 35.5483 42.3333 35.6208 42.3333 35.6938C42.3333 37.5348 40.841 39.0272 39 39.0272C37.1591 39.0272 35.6667 37.5348 35.6667 35.6938H29C29 37.5348 27.5076 39.0272 25.6667 39.0272C23.8257 39.0272 22.3333 37.5348 22.3333 35.6938H21.3333C20.0447 35.6938 19 34.6492 19 33.3605V29.3605C19 28.2608 19.7607 27.3388 20.7847 27.092L23.7333 23.1605ZM25.3333 24.3605L23.3333 27.0272H27.6667V23.6938H26.6667C26.1421 23.6938 25.6481 23.9408 25.3333 24.3605ZM34.6667 24.3605L36.6667 27.0272H29.6667V23.6938H33.3333C33.8579 23.6938 34.3519 23.9408 34.6667 24.3605ZM42.7837 30.6391L38.4853 29.0272H21.3434L21.3277 29.0272C21.1462 29.0302 21 29.1783 21 29.3605V33.3605C21 33.5446 21.1492 33.6938 21.3333 33.6938H22.9998C23.6079 32.8842 24.5761 32.3605 25.6667 32.3605C26.7572 32.3605 27.7254 32.8842 28.3336 33.6938H36.3331C36.9412 32.8842 37.9095 32.3605 39 32.3605C40.047 32.3605 40.9813 32.8433 41.5924 33.5983L42.7475 33.3095C42.8959 33.2724 43 33.1391 43 32.9861V30.9512C43 30.8122 42.9138 30.6879 42.7837 30.6391ZM24.3333 35.6938C24.3333 34.9575 24.9303 34.3605 25.6667 34.3605C26.403 34.3605 27 34.9575 27 35.6938C27 36.4302 26.403 37.0272 25.6667 37.0272C24.9303 37.0272 24.3333 36.4302 24.3333 35.6938ZM37.6667 35.6938C37.6667 34.9575 38.2636 34.3605 39 34.3605C39.7364 34.3605 40.3333 34.9575 40.3333 35.6938C40.3333 36.4302 39.7364 37.0272 39 37.0272C38.2636 37.0272 37.6667 36.4302 37.6667 35.6938Z"
                fill="#23262A"
            />
        </svg>
    );

    return (
        <div data-section id="12">
            <Box background="surface-default" padding="10" className={styles.box}>
                <HStack justify="center">
                    <FørerkortIcon />
                </HStack>
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
                    Legg til flere
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
