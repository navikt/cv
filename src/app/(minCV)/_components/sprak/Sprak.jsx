import { BodyLong, Box, Button, FormSummary, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import { CvSeksjonEnum, SeksjonsIdEnum, SpråkEnum } from "@/app/_common/enums/cvEnums";
import SpråkModal from "@/app/(minCV)/_components/sprak/SpråkModal";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { SeksjonSkeleton } from "@/app/_common/components/SeksjonSkeleton";
import { useOppdaterCvSeksjonNoCache } from "@/app/_common/hooks/swr/useOppdaterCvSeksjonNoCache";
import { useCvModal } from "@/app/_common/hooks/useCvModal";
import { useId } from "react";

function SpråkIcon() {
    return (
        <svg
            aria-hidden="true"
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
                d="M22.3333 22.6668C22.3333 22.4827 22.4826 22.3335 22.6667 22.3335H37.3333C37.5174 22.3335 37.6667 22.4827 37.6667 22.6668V23.3347C37.6667 23.887 38.1144 24.3347 38.6667 24.3347C39.219 24.3347 39.6667 23.887 39.6667 23.3347V22.6668C39.6667 21.3782 38.622 20.3335 37.3333 20.3335H22.6667C21.378 20.3335 20.3333 21.3782 20.3333 22.6668V36.0002C20.3333 36.3467 20.5128 36.6686 20.8076 36.8508C21.1024 37.033 21.4706 37.0496 21.7805 36.8946L23.7823 35.8937C24.2762 35.6467 24.4765 35.0461 24.2295 34.5521C23.9825 34.0581 23.3818 33.8579 22.8878 34.1049L22.3333 34.3821V22.6668ZM28 27.6668C27.8159 27.6668 27.6667 27.8161 27.6667 28.0002V38.6668C27.6667 38.8509 27.8159 39.0002 28 39.0002H37.3333C37.4886 39.0002 37.6417 39.0363 37.7805 39.1057L41.6667 41.0488V28.0002C41.6667 27.8161 41.5174 27.6668 41.3333 27.6668H28ZM25.6667 28.0002C25.6667 26.7115 26.7113 25.6668 28 25.6668H41.3333C42.622 25.6668 43.6667 26.7115 43.6667 28.0002V42.6668C43.6667 43.0134 43.4872 43.3353 43.1924 43.5175C42.8976 43.6997 42.5294 43.7162 42.2195 43.5613L37.0973 41.0002H28C26.7113 41.0002 25.6667 39.9555 25.6667 38.6668V28.0002ZM29.6667 33.3335C29.6667 32.7812 30.1144 32.3335 30.6667 32.3335H30.68C31.2323 32.3335 31.68 32.7812 31.68 33.3335C31.68 33.8858 31.2323 34.3335 30.68 34.3335H30.6667C30.1144 34.3335 29.6667 33.8858 29.6667 33.3335ZM34.6667 32.3335C34.1144 32.3335 33.6667 32.7812 33.6667 33.3335C33.6667 33.8858 34.1144 34.3335 34.6667 34.3335H34.68C35.2323 34.3335 35.68 33.8858 35.68 33.3335C35.68 32.7812 35.2323 32.3335 34.68 32.3335H34.6667ZM37.6667 33.3335C37.6667 32.7812 38.1144 32.3335 38.6667 32.3335H38.68C39.2323 32.3335 39.68 32.7812 39.68 33.3335C39.68 33.8858 39.2323 34.3335 38.68 34.3335H38.6667C38.1144 34.3335 37.6667 33.8858 37.6667 33.3335Z"
                fill="#23262A"
            />
        </svg>
    );
}

export default function Sprak() {
    const { språk, cvLaster } = useCv();
    const oppdateringprops = useOppdaterCvSeksjonNoCache(CvSeksjonEnum.SPRÅK);
    const modalProps = useCvModal(språk, oppdateringprops);
    const { modalÅpen, toggleModal, slettElement, lastendeIndex } = modalProps;
    const headingId = useId();
    const summaryHeadingId = useId();

    return (
        <section aria-labelledby={cvLaster ? undefined : headingId} data-section id={SeksjonsIdEnum.SPRÅK}>
            {cvLaster ? (
                <SeksjonSkeleton icon={<SpråkIcon />} />
            ) : (
                <Box background="surface-default" padding="10" className={styles.box}>
                    <HStack justify="center">
                        <SpråkIcon />
                    </HStack>
                    <Heading id={headingId} level="2" size="large" align="start" spacing>
                        Språk
                    </Heading>

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
                                        <FormSummary.Header>
                                            <FormSummary.Heading id={summaryHeadingId} level="2">
                                                {sp.language}
                                            </FormSummary.Heading>
                                        </FormSummary.Header>
                                        <FormSummary.Answers aria-labelledby={summaryHeadingId}>
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
                                            aria-label={`Endre språk ${sp.language}`}
                                            icon={<PencilIcon aria-hidden />}
                                            variant="tertiary"
                                            onClick={() => toggleModal(true, index)}
                                        >
                                            Endre
                                        </Button>
                                        <Button
                                            aria-label={`Fjern språk ${sp.language}`}
                                            icon={<TrashIcon aria-hidden />}
                                            variant="tertiary"
                                            onClick={() => slettElement(index)}
                                            loading={lastendeIndex === index}
                                        >
                                            Fjern
                                        </Button>
                                    </HStack>
                                </div>
                            ))}
                        </div>
                    )}

                    <Button
                        aria-label={språk.length === 0 ? "Legg til språk" : "Legg til flere språk"}
                        icon={<PlusIcon aria-hidden />}
                        variant="primary"
                        onClick={() => toggleModal(true)}
                    >
                        {språk.length === 0 ? "Legg til" : "Legg til flere"}
                    </Button>
                </Box>
            )}
            {modalÅpen && <SpråkModal {...modalProps} />}
        </section>
    );
}
