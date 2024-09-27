import { BodyLong, Box, Button, FormSummary, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import { useContext, useEffect, useState } from "react";
import { CvOgPersonContext } from "@/app/(minCV)/_components/context/CvContext";
import { UtdanningsnivåEnum } from "@/app/enums/cvEnums";
import { formatterDato } from "@/app/utils/stringUtils";
import { UtdanningModal } from "@/app/(minCV)/_components/utdanninger/UtdanningModal";
import { AndreErfaringerModal } from "@/app/(minCV)/_components/andreErfaringer/AndreErfaringerModal";

export default function AndreErfaringer() {
    const cvContext = useContext(CvOgPersonContext).cv;

    const [modalÅpen, setModalÅpen] = useState(false);
    const [andreErfaringer, setAndreErfaringer] = useState([]);
    const [gjeldendeErfaring, setGjeldendeErfaring] = useState(-1);

    useEffect(() => {
        const oppdaterAndreErfaringer = (erfaringer) => setAndreErfaringer(erfaringer);
        if (cvContext.status === "success") oppdaterAndreErfaringer(cvContext.data.annenErfaring || []);
    }, [cvContext]);

    const toggleModal = (åpen, index) => {
        setGjeldendeErfaring(index >= 0 ? index : -1);
        setModalÅpen(åpen);
    };

    const slettErfaring = (index) => {
        const oppdaterteErfaringer = [...andreErfaringer];
        oppdaterteErfaringer.splice(index, 1);
        setAndreErfaringer(oppdaterteErfaringer);
    };

    const lagreErfaring = (oppdatertErfaring) => {
        const oppdaterteErfaringer = [...andreErfaringer];
        if (gjeldendeErfaring >= 0) oppdaterteErfaringer.splice(gjeldendeErfaring, 1, oppdatertErfaring);
        else oppdaterteErfaringer.push(oppdatertErfaring);

        // TODO: Send oppdatering til backend og oppdater data med responsen / feilmelding
        setAndreErfaringer(oppdaterteErfaringer);
        setModalÅpen(false);
    };

    const AndreErfaringerIcon = () => (
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
                d="M31.7643 21.8651C29.76 19.8609 26.691 19.6626 24.2097 20.9574C23.9274 21.1047 23.7322 21.3776 23.6839 21.6923C23.6356 22.007 23.7401 22.3259 23.9652 22.551L26.9608 25.5466C26.7617 25.8445 26.5356 26.1512 26.3434 26.3434C26.1511 26.5356 25.8445 26.7617 25.5466 26.9609L22.5509 23.9651C22.3258 23.74 22.0069 23.6355 21.6922 23.6838C21.3775 23.7321 21.1046 23.9273 20.9573 24.2096C19.6622 26.691 19.8604 29.7603 21.8648 31.7646C23.4993 33.3991 25.8491 33.8331 28.0011 33.2341L36.0296 42.0272C37.1144 43.2153 38.9629 43.639 40.4267 42.6511C40.8479 42.3669 41.3009 42.0272 41.6639 41.6642C42.0268 41.3013 42.3665 40.8482 42.6508 40.427C43.6387 38.9633 43.2149 37.1147 42.0268 36.0299L33.2337 28.0015C33.8327 25.8495 33.3988 23.4996 31.7643 21.8651ZM28.5771 24.3345L26.485 22.2424C27.934 21.9366 29.3757 22.305 30.3501 23.2794C31.505 24.4343 31.8076 26.2366 31.1485 27.9431C31 28.3277 31.1027 28.7639 31.4071 29.0419L40.6783 37.5069C41.2528 38.0315 41.3404 38.7935 40.993 39.3082C40.7395 39.6838 40.4821 40.0175 40.2496 40.25L40.9567 40.9571L40.2496 40.25C40.0172 40.4825 39.6834 40.7399 39.3078 40.9934C38.7931 41.3408 38.0311 41.2532 37.5065 40.6786L29.0415 31.4074C28.7636 31.103 28.3273 31.0004 27.9428 31.1489C26.2362 31.808 24.4339 31.5054 23.279 30.3504C22.3045 29.3759 21.9362 27.934 22.2421 26.4848L24.3345 28.5772C24.8602 29.1029 25.7005 29.2343 26.3693 28.8113L25.8347 27.9662L26.3693 28.8113C26.7402 28.5767 27.3409 28.1743 27.7576 27.7576C28.1743 27.3409 28.5766 26.7403 28.8113 26.3693L27.9661 25.8348L28.8113 26.3693C29.2343 25.7006 29.1028 24.8602 28.5771 24.3345ZM38.5482 37.6511C37.9959 37.6511 37.5482 38.0988 37.5482 38.6511C37.5482 39.2033 37.9959 39.6511 38.5482 39.6511H38.5615C39.1138 39.6511 39.5615 39.2033 39.5615 38.6511C39.5615 38.0988 39.1138 37.6511 38.5615 37.6511H38.5482Z"
                fill="#23262A"
            />
        </svg>
    );

    return (
        <div id="7">
            <Box background="surface-default" padding="10" className={styles.box}>
                <HStack justify="center">
                    <AndreErfaringerIcon />
                </HStack>
                <Heading level="2" size="large" align="start" spacing>
                    Andre erfaringer
                </Heading>
                <>
                    {andreErfaringer.length === 0 ? (
                        <div>
                            <BodyLong weight="semibold" spacing>
                                Du har ikke lagt til noen andre erfaringer i CV-en
                            </BodyLong>
                            <BodyLong className={styles.mb12}>
                                En “annen erfaring” er f.eks frivillig arbeid som du gjør som en fotballtrener.
                            </BodyLong>
                        </div>
                    ) : (
                        <div className={styles.mb6}>
                            {andreErfaringer.map((erfaring, index) => (
                                <div key={index}>
                                    <FormSummary style={{ marginBottom: "1rem" }}>
                                        <FormSummary.Header id="4">
                                            <FormSummary.Heading level="2">{erfaring.role}</FormSummary.Heading>
                                        </FormSummary.Header>

                                        <FormSummary.Answers>
                                            <FormSummary.Answer>
                                                <FormSummary.Label>Dato</FormSummary.Label>
                                                <FormSummary.Value>{`${formatterDato(erfaring.fromDate)} - ${formatterDato(erfaring.toDate)}`}</FormSummary.Value>
                                            </FormSummary.Answer>

                                            <FormSummary.Answer>
                                                <FormSummary.Label>Beskrivelse</FormSummary.Label>
                                                <FormSummary.Value>{erfaring.description}</FormSummary.Value>
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
                                            onClick={() => slettErfaring(index)}
                                        >
                                            Fjern
                                        </Button>
                                    </HStack>
                                </div>
                            ))}
                        </div>
                    )}
                    <Button icon={<PlusIcon aria-hidden />} variant="primary" onClick={() => toggleModal(true)}>
                        Legg til flere
                    </Button>
                </>
            </Box>
            {modalÅpen && (
                <AndreErfaringerModal
                    modalÅpen={modalÅpen}
                    toggleModal={toggleModal}
                    erfaring={andreErfaringer[gjeldendeErfaring]}
                    lagreErfaring={lagreErfaring}
                />
            )}
        </div>
    );
}
