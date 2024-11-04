import { BodyLong, Box, Button, FormSummary, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import { formatterFullDato, formatterTidsenhet } from "@/app/_common/utils/stringUtils";
import KursModal from "@/app/(minCV)/_components/kurs/KursModal";
import { CvSeksjonEnum, SeksjonsIdEnum } from "@/app/_common/enums/cvEnums";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { SeksjonSkeleton } from "@/app/_common/components/SeksjonSkeleton";
import { useOppdaterCvSeksjon } from "@/app/_common/hooks/swr/useOppdaterCvSeksjon";
import { useCvModal } from "@/app/_common/hooks/useCvModal";
import { useId } from "react";

function KursIcon() {
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
                d="M27 24C27 23.4477 27.4477 23 28 23H36C36.5523 23 37 23.4477 37 24V28C37 28.5523 36.5523 29 36 29H28C27.4477 29 27 28.5523 27 28V24ZM29 25V27H35V25H29Z"
                fill="#23262A"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.3333 19C23.3083 19 21.6667 20.6416 21.6667 22.6667V41.3333C21.6667 43.3584 23.3083 45 25.3333 45H41.3333C41.6799 45 42.0018 44.8205 42.184 44.5257C42.3662 44.2309 42.3828 43.8628 42.2278 43.5528L42.087 43.2713C41.477 42.0513 41.477 40.6154 42.087 39.3954L42.2278 39.1139C42.2981 38.9733 42.3331 38.8207 42.3333 38.6684V38.5333V20.6667C42.3333 19.7462 41.5871 19 40.6667 19H25.3333ZM40.3333 21H25.3333C24.4129 21 23.6667 21.7462 23.6667 22.6667V38.0665C24.1667 37.8109 24.7332 37.6667 25.3333 37.6667H40.3333V21ZM39.8527 43C39.5551 41.9092 39.5551 40.7575 39.8527 39.6667H25.3333C24.4129 39.6667 23.6667 40.4129 23.6667 41.3333C23.6667 42.2538 24.4129 43 25.3333 43H39.8527Z"
                fill="#23262A"
            />
        </svg>
    );
}

export default function Kurs() {
    const { kurs, cvLaster } = useCv();
    const oppdateringprops = useOppdaterCvSeksjon(CvSeksjonEnum.KURS);
    const modalProps = useCvModal(kurs, oppdateringprops);
    const { modalÅpen, toggleModal, slettElement, lastendeIndex } = modalProps;
    const headingId = useId();

    return (
        <section aria-labelledby={cvLaster ? undefined : headingId} data-section id={SeksjonsIdEnum.KURS}>
            {cvLaster ? (
                <SeksjonSkeleton icon={<KursIcon />} />
            ) : (
                <Box background="surface-default" padding="10" className={styles.box}>
                    <HStack justify="center">
                        <KursIcon />
                    </HStack>
                    <Heading id={headingId} level="2" size="large" align="start" spacing>
                        Kurs
                    </Heading>
                    {kurs.length === 0 ? (
                        <div>
                            <BodyLong weight="semibold" spacing>
                                Du har ikke lagt til noen kurs i CV-en
                            </BodyLong>
                            <BodyLong className={styles.mb12}>
                                Her kan du sette inn kurs som du har tatt, f.eks skredkurs.
                            </BodyLong>
                        </div>
                    ) : (
                        <div className={styles.mb6}>
                            {kurs.map((k, index) => (
                                <div key={index}>
                                    <FormSummary style={{ marginBottom: "1rem" }}>
                                        <FormSummary.Header>
                                            <FormSummary.Heading level="2">{k.title}</FormSummary.Heading>
                                        </FormSummary.Header>
                                        <FormSummary.Answers>
                                            <FormSummary.Answer>
                                                <FormSummary.Label>Utsteder</FormSummary.Label>
                                                <FormSummary.Value>{k.issuer}</FormSummary.Value>
                                            </FormSummary.Answer>
                                            <FormSummary.Answer>
                                                <FormSummary.Label>Fullført</FormSummary.Label>
                                                <FormSummary.Value>{formatterFullDato(k.date)}</FormSummary.Value>
                                            </FormSummary.Answer>
                                            <FormSummary.Answer>
                                                <FormSummary.Label>Kursvarighet</FormSummary.Label>
                                                <FormSummary.Value>{`${k.duration} ${formatterTidsenhet(k.durationUnit, k.duration)}`}</FormSummary.Value>
                                            </FormSummary.Answer>
                                        </FormSummary.Answers>
                                    </FormSummary>
                                    <HStack justify="space-between" className={styles.mb6}>
                                        <Button
                                            aria-label={"Endre kurs " + k.title}
                                            icon={<PencilIcon aria-hidden />}
                                            variant="tertiary"
                                            onClick={() => toggleModal(true, index)}
                                        >
                                            Endre
                                        </Button>
                                        <Button
                                            aria-label={"Fjern kurs " + k.title}
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
                        aria-label={kurs.length === 0 ? "Legg til kurs" : "Legg til flere kurs"}
                        icon={<PlusIcon aria-hidden />}
                        variant="primary"
                        onClick={() => toggleModal(true)}
                    >
                        {kurs.length === 0 ? "Legg til" : "Legg til flere"}
                    </Button>
                </Box>
            )}
            {modalÅpen && <KursModal {...modalProps} />}
        </section>
    );
}
