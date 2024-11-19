import { BodyLong, Box, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import { CvSeksjonEnum, SeksjonsIdEnum } from "@/app/_common/enums/cvEnums";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { SeksjonSkeleton } from "@/app/_common/components/SeksjonSkeleton";
import parse from "html-react-parser";
import { useOppdaterCvSeksjonNoCache } from "@/app/_common/hooks/swr/useOppdaterCvSeksjonNoCache";
import { useCvModal } from "@/app/_common/hooks/useCvModal";
import SammendragModal from "@/app/(minCV)/_components/sammendrag/SammendragModal";
import { useId } from "react";

export default function Sammendrag() {
    const { sammendrag, cvLaster } = useCv();
    const oppdateringprops = useOppdaterCvSeksjonNoCache(CvSeksjonEnum.SAMMENDRAG);
    const modalProps = useCvModal(sammendrag, oppdateringprops);
    const { modalÅpen, toggleModal, laster } = modalProps;
    const { triggerOppdatering } = oppdateringprops;
    const headingId = useId();

    return (
        <section aria-labelledby={cvLaster ? undefined : headingId} data-section id={SeksjonsIdEnum.SAMMENDRAG}>
            {cvLaster ? (
                <SeksjonSkeleton icon={<HStack className={[styles.iconSammendragBig, styles.sectionIcon]} />} />
            ) : (
                <Box background="surface-default" padding="10" className={styles.box}>
                    <HStack justify="center">
                        <HStack className={[styles.iconSammendragBig, styles.sectionIcon]} />
                    </HStack>
                    <Heading id={headingId} level="2" size="large" align="start" spacing>
                        Sammendrag
                    </Heading>
                    {!sammendrag ? (
                        <div>
                            <VStack style={{ padding: "1rem" }}>
                                <BodyLong weight="semibold" className={styles.mb3}>
                                    Om meg
                                </BodyLong>
                                <BodyLong className={styles.mb6}>
                                    Her kan du beskrive deg selv, hvordan du er som arbeidstaker og ulike personlige
                                    egenskaper.
                                </BodyLong>
                            </VStack>
                            <Button
                                aria-label="Legg til sammendrag"
                                icon={<PlusIcon aria-hidden />}
                                variant="primary"
                                onClick={() => toggleModal(true)}
                            >
                                Legg til
                            </Button>
                        </div>
                    ) : (
                        <div className={styles.mb6}>
                            <VStack style={{ padding: "1rem" }}>
                                <BodyLong weight="semibold" className={styles.mb3}>
                                    Om meg
                                </BodyLong>
                                <BodyLong className={styles.mb6}>{parse(sammendrag.replace(/\n/g, "<br>"))}</BodyLong>
                            </VStack>
                            <HStack justify="space-between">
                                <Button
                                    aria-label="Endre sammendrag"
                                    icon={<PencilIcon aria-hidden />}
                                    variant="primary"
                                    onClick={() => toggleModal(true)}
                                >
                                    Endre
                                </Button>
                                <Button
                                    aria-label="Fjern sammendrag"
                                    icon={<TrashIcon aria-hidden />}
                                    variant="tertiary"
                                    onClick={() => triggerOppdatering("")}
                                    loading={laster}
                                >
                                    Fjern
                                </Button>
                            </HStack>
                        </div>
                    )}
                </Box>
            )}

            {modalÅpen && (
                <SammendragModal {...modalProps} lagreElement={triggerOppdatering} gjeldendeElement={sammendrag} />
            )}
        </section>
    );
}
