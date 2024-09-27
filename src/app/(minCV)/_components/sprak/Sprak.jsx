import { BodyLong, Box, Button, FormSummary, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import { useContext, useEffect, useState } from "react";
import { CvOgPersonContext } from "@/app/(minCV)/_components/context/CvContext";
import { formatterDato } from "@/app/utils/stringUtils";
import { SpråkEnum } from "@/app/enums/cvEnums";
import SpråkModal from "@/app/(minCV)/_components/sprak/SpråkModal";

export default function Sprak() {
    const cvContext = useContext(CvOgPersonContext).cv;

    const [modalÅpen, setModalÅpen] = useState(false);
    const [språk, setSpråk] = useState([]);
    const [gjeldendeSpråk, setGjeldendeSpråk] = useState(-1);

    useEffect(() => {
        const oppdaterSpråk = (språk) => setSpråk(språk);
        if (cvContext.status === "success") oppdaterSpråk(cvContext.data.spraak || []);
    }, [cvContext]);

    const toggleModal = (åpen, index) => {
        setGjeldendeSpråk(index >= 0 ? index : -1);
        setModalÅpen(åpen);
    };

    const slettSpråk = (index) => {
        const oppdaterteSpråk = [...språk];
        oppdaterteSpråk.splice(index, 1);
        setSpråk(oppdaterteSpråk);
    };

    const lagreSpråk = (oppdatertSpråk) => {
        const oppdaterteSpråk = [...språk];
        if (gjeldendeSpråk >= 0) oppdaterteSpråk.splice(gjeldendeSpråk, 1, oppdatertSpråk);
        else oppdaterteSpråk.push(oppdatertSpråk);

        // TODO: Send oppdatering til backend og oppdater data med responsen / feilmelding
        setSpråk(oppdaterteSpråk);
        setModalÅpen(false);
    };

    const SpråkIcon = () => (
        <svg
            style={{ marginTop: "-4.5rem", marginBottom: "4rem" }}
            width="64"
            height="63"
            viewBox="0 0 64 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="64" height="62.423" rx="31.2115" fill="#7CDAF8" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.3333 21.8783C22.3333 21.6942 22.4826 21.5449 22.6667 21.5449H37.3333C37.5174 21.5449 37.6667 21.6942 37.6667 21.8783V22.5461C37.6667 23.0984 38.1144 23.5461 38.6667 23.5461C39.219 23.5461 39.6667 23.0984 39.6667 22.5461V21.8783C39.6667 20.5896 38.622 19.5449 37.3333 19.5449H22.6667C21.378 19.5449 20.3333 20.5896 20.3333 21.8783V35.2116C20.3333 35.5582 20.5128 35.88 20.8076 36.0622C21.1024 36.2444 21.4706 36.261 21.7805 36.106L23.7823 35.1052C24.2762 34.8582 24.4765 34.2575 24.2295 33.7635C23.9825 33.2695 23.3818 33.0693 22.8878 33.3163L22.3333 33.5936V21.8783ZM28 26.8783C27.8159 26.8783 27.6667 27.0275 27.6667 27.2116V37.8783C27.6667 38.0623 27.8159 38.2116 28 38.2116H37.3333C37.4886 38.2116 37.6417 38.2477 37.7805 38.3172L41.6667 40.2602V27.2116C41.6667 27.0275 41.5174 26.8783 41.3333 26.8783H28ZM25.6667 27.2116C25.6667 25.9229 26.7113 24.8783 28 24.8783H41.3333C42.622 24.8783 43.6667 25.9229 43.6667 27.2116V41.8783C43.6667 42.2248 43.4872 42.5467 43.1924 42.7289C42.8976 42.9111 42.5294 42.9277 42.2195 42.7727L37.0973 40.2116H28C26.7113 40.2116 25.6667 39.1669 25.6667 37.8783V27.2116ZM29.6667 32.5449C29.6667 31.9926 30.1144 31.5449 30.6667 31.5449H30.68C31.2323 31.5449 31.68 31.9926 31.68 32.5449C31.68 33.0972 31.2323 33.5449 30.68 33.5449H30.6667C30.1144 33.5449 29.6667 33.0972 29.6667 32.5449ZM34.6667 31.5449C34.1144 31.5449 33.6667 31.9926 33.6667 32.5449C33.6667 33.0972 34.1144 33.5449 34.6667 33.5449H34.68C35.2323 33.5449 35.68 33.0972 35.68 32.5449C35.68 31.9926 35.2323 31.5449 34.68 31.5449H34.6667ZM37.6667 32.5449C37.6667 31.9926 38.1144 31.5449 38.6667 31.5449H38.68C39.2323 31.5449 39.68 31.9926 39.68 32.5449C39.68 33.0972 39.2323 33.5449 38.68 33.5449H38.6667C38.1144 33.5449 37.6667 33.0972 37.6667 32.5449Z"
                fill="#23262A"
            />
        </svg>
    );

    return (
        <div id="11">
            <Box background="surface-default" padding="10" className={styles.box}>
                <HStack justify="center">
                    <SpråkIcon />
                </HStack>
                <Heading level="2" size="large" align="start" spacing>
                    Språk
                </Heading>
                <>
                    {språk.length === 0 ? (
                        <div>
                            <BodyLong weight="semibold" spacing>
                                Du har ikke lagt til noen språk i CV-en
                            </BodyLong>
                            <BodyLong className={styles.mb12}>
                                Her kan du si hvilke språk du kan, og hvor god du er i dem.
                            </BodyLong>
                        </div>
                    ) : (
                        <div className={styles.mb6}>
                            {språk.map((sp, index) => (
                                <div key={index}>
                                    <FormSummary style={{ marginBottom: "1rem" }}>
                                        <FormSummary.Header id="4">
                                            <FormSummary.Heading level="2">{sp.language}</FormSummary.Heading>
                                        </FormSummary.Header>
                                        <FormSummary.Answers>
                                            <FormSummary.Answer>
                                                <FormSummary.Label>Muntlig</FormSummary.Label>
                                                <FormSummary.Value>{SpråkEnum[sp.oralProficiency]}</FormSummary.Value>
                                            </FormSummary.Answer>
                                            <FormSummary.Answer>
                                                <FormSummary.Label>Skriftlig</FormSummary.Label>
                                                <FormSummary.Value>
                                                    {SpråkEnum[sp.writtenProficiency]}
                                                </FormSummary.Value>
                                            </FormSummary.Answer>
                                        </FormSummary.Answers>
                                    </FormSummary>
                                    <HStack justify="space-between" className={styles.mb6}>
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
                                            onClick={() => slettSpråk(index)}
                                        >
                                            Fjern
                                        </Button>
                                    </HStack>
                                </div>
                            ))}
                        </div>
                    )}
                </>
                <Button icon={<PlusIcon aria-hidden />} variant="primary" onClick={() => toggleModal(true)}>
                    Legg til flere
                </Button>
            </Box>
            {modalÅpen && (
                <SpråkModal
                    modalÅpen={modalÅpen}
                    toggleModal={toggleModal}
                    språk={språk[gjeldendeSpråk]}
                    lagreSpråk={lagreSpråk}
                />
            )}
        </div>
    );
}
