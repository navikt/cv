import { BodyLong, Box, Button, Heading, HStack, List } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon } from "@navikt/aksel-icons";
import KompetanserModal from "@/app/(minCV)/_components/kompetanser/KompetanserModal";
import { CvSeksjonEnum, SeksjonsIdEnum } from "@/app/_common/enums/cvEnums";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { SeksjonSkeleton } from "@/app/_common/components/SeksjonSkeleton";
import { useOppdaterCvSeksjonNoCache } from "@/app/_common/hooks/swr/useOppdaterCvSeksjonNoCache";
import { useCvModal } from "@/app/_common/hooks/useCvModal";
import { useId } from "react";

export default function Kompetanser() {
    const { kompetanser, cvLaster } = useCv();
    const oppdateringprops = useOppdaterCvSeksjonNoCache(CvSeksjonEnum.KOMPETANSER);
    const { triggerOppdatering } = oppdateringprops;
    const modalProps = useCvModal(kompetanser, oppdateringprops);
    const { modalÅpen, toggleModal } = modalProps;
    const headingId = useId();

    return (
        <section aria-labelledby={cvLaster ? undefined : headingId} data-section id={SeksjonsIdEnum.KOMPETANSER}>
            {cvLaster ? (
                <SeksjonSkeleton
                    icon={<HStack className={[styles.iconKompetanserBig, styles.sectionIcon]} aria-hidden="true" />}
                />
            ) : (
                <Box background="surface-default" padding="10" className={styles.box}>
                    <HStack justify="center">
                        <HStack className={[styles.iconKompetanserBig, styles.sectionIcon]} aria-hidden="true" />
                    </HStack>
                    <Heading id={headingId} className={styles.mb6} level="2" size="large" align="start" spacing>
                        Kompetanser
                    </Heading>
                    {kompetanser.length === 0 ? (
                        <div>
                            <BodyLong weight="semibold" spacing>
                                Du har ikke lagt til noen kompetanser i CV-en
                            </BodyLong>
                            <BodyLong className={styles.mb12}>
                                Her kan du sette inn de ulike kompetanser som spesifikke egenskaper f.eks undervisning
                                eller butikkarbeid.
                            </BodyLong>
                        </div>
                    ) : (
                        <List as="ul" className={styles.mb6}>
                            {kompetanser.map((kompetanse) => (
                                <List.Item key={kompetanse.title}>{kompetanse.title}</List.Item>
                            ))}
                        </List>
                    )}
                    <HStack justify="space-between">
                        <Button
                            aria-label={
                                kompetanser.length === 0
                                    ? "Legg til kompetanse"
                                    : "Endre eller legg til flere kompetanser"
                            }
                            icon={kompetanser.length === 0 ? <PlusIcon aria-hidden /> : <PencilIcon aria-hidden />}
                            variant="primary"
                            onClick={() => toggleModal(true)}
                        >
                            {kompetanser.length === 0 ? "Legg til" : "Endre eller legg til flere"}
                        </Button>
                    </HStack>
                </Box>
            )}
            {modalÅpen && (
                <KompetanserModal {...modalProps} alleredeValgte={kompetanser} lagreKompetanser={triggerOppdatering} />
            )}
        </section>
    );
}
