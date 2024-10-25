import { BodyLong, Box, Button, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import FagbrevModal from "@/app/(minCV)/_components/fagbrev/FagbrevModal";
import { CvSeksjonEnum, SeksjonsIdEnum } from "@/app/_common/enums/cvEnums";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { useOppdaterCvSeksjon } from "@/app/_common/hooks/swr/useOppdaterCvSeksjon";
import { useCvModal } from "@/app/_common/hooks/useCvModal";
import { SeksjonSkeleton } from "@/app/_common/components/SeksjonSkeleton";

export default function Fagbrev() {
    const { fagbrev, cvLaster } = useCv();
    const { oppdateringOk, laster, feilet, oppdaterMedData, setVisFeilmelding } = useOppdaterCvSeksjon(
        CvSeksjonEnum.FAGBREV,
    );

    const { modalÅpen, gjeldendeElement, toggleModal, lagreElement, slettElement } = useCvModal(
        fagbrev,
        oppdaterMedData,
        oppdateringOk,
        laster,
        feilet,
        setVisFeilmelding,
    );

    function FagbrevIcon() {
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
                    d="M31.7642 21.8647C29.7599 19.8604 26.6909 19.6621 24.2096 20.9569C23.9273 21.1042 23.732 21.3771 23.6838 21.6918C23.6355 22.0065 23.7399 22.3254 23.9651 22.5505L26.9607 25.5462C26.7616 25.844 26.5355 26.1507 26.3432 26.3429C26.151 26.5352 25.8444 26.7612 25.5465 26.9604L22.5508 23.9647C22.3256 23.7395 22.0068 23.6351 21.6921 23.6833C21.3774 23.7316 21.1044 23.9268 20.9571 24.2091C19.6621 26.6905 19.8603 29.7598 21.8647 31.7642C23.4991 33.3986 25.849 33.8326 28.001 33.2336L36.0294 42.0267C37.1142 43.2148 38.9628 43.6386 40.4265 42.6507C40.8478 42.3664 41.3008 42.0267 41.6637 41.6637C42.0267 41.3008 42.3664 40.8478 42.6507 40.4265C43.6386 38.9628 43.2148 37.1142 42.0267 36.0294L33.2336 28.001C33.8326 25.849 33.3986 23.4991 31.7642 21.8647ZM28.577 24.334L26.4849 22.2419C27.9339 21.9361 29.3756 22.3045 30.3499 23.2789C31.5049 24.4338 31.8075 26.2361 31.1484 27.9426C30.9999 28.3272 31.1025 28.7635 31.407 29.0414L40.6781 37.5064C41.2527 38.031 41.3403 38.793 40.9929 39.3077C40.7394 39.6833 40.482 40.017 40.2495 40.2495L40.9566 40.9566L40.2495 40.2495C40.017 40.482 39.6833 40.7394 39.3077 40.9929C38.793 41.3403 38.031 41.2527 37.5064 40.6781L29.0414 31.407C28.7635 31.1025 28.3272 30.9999 27.9426 31.1484C26.2361 31.8075 24.4338 31.5049 23.2789 30.3499C22.3044 29.3754 21.9361 27.9335 22.242 26.4843L24.3344 28.5767C24.8601 29.1024 25.7004 29.2338 26.3692 28.8108L25.8346 27.9657L26.3692 28.8108C26.7401 28.5762 27.3407 28.1738 27.7575 27.7571C28.1742 27.3404 28.5765 26.7398 28.8111 26.3689L27.966 25.8343L28.8111 26.3688C29.2342 25.7001 29.1027 24.8597 28.577 24.334ZM38.548 37.6506C37.9958 37.6506 37.548 38.0983 37.548 38.6506C37.548 39.2029 37.9958 39.6506 38.548 39.6506H38.5614C39.1137 39.6506 39.5614 39.2029 39.5614 38.6506C39.5614 38.0983 39.1137 37.6506 38.5614 37.6506H38.548Z"
                    fill="#23262A"
                />
            </svg>
        );
    }

    return (
        <div data-section id={SeksjonsIdEnum.FAGBREV}>
            {cvLaster ? (
                <SeksjonSkeleton icon={<FagbrevIcon />} />
            ) : (
                <Box background="surface-default" padding="10" className={styles.box}>
                    <HStack justify="center">
                        <FagbrevIcon />
                    </HStack>
                    <Heading className={styles.mb6} level="2" size="large" align="start" spacing>
                        Fagbrev
                    </Heading>
                    <>
                        {fagbrev.length === 0 ? (
                            <div>
                                <BodyLong weight="semibold" spacing>
                                    Du har ikke lagt til noen fagbrev i CV-en
                                </BodyLong>
                                <BodyLong className={styles.mb12}>
                                    Her kan du sette inn ulike fagbrev som du har tatt, f.eks i bilpleie.
                                </BodyLong>
                            </div>
                        ) : (
                            <div className={styles.mb6}>
                                {fagbrev.map((fb, index) => (
                                    <div key={index}>
                                        <BodyLong weight="semibold">• {fb.title}</BodyLong>
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
                                                onClick={() => slettElement(index)}
                                            >
                                                Fjern
                                            </Button>
                                        </HStack>
                                        {index < fagbrev.length - 1 && <div className={styles.divider}></div>}
                                    </div>
                                ))}
                            </div>
                        )}
                        <Button icon={<PlusIcon aria-hidden />} variant="primary" onClick={() => toggleModal(true)}>
                            {fagbrev.length === 0 ? "Legg til" : "Legg til flere"}
                        </Button>
                    </>
                </Box>
            )}
            {modalÅpen && (
                <FagbrevModal
                    modalÅpen={modalÅpen}
                    toggleModal={toggleModal}
                    fagbrev={gjeldendeElement}
                    lagreFagbrev={lagreElement}
                    laster={laster}
                    feilet={feilet}
                />
            )}
        </div>
    );
}
