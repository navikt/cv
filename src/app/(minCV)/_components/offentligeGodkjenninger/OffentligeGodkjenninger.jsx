import { BodyLong, Box, Button, FormSummary, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { PencilIcon, PlusIcon, TrashIcon } from "@navikt/aksel-icons";
import { formatterFullDato } from "@/app/_common/utils/stringUtils";
import OffentligeGodkjenningerModal from "@/app/(minCV)/_components/offentligeGodkjenninger/OffentligeGodkjenningerModal";
import { CvSeksjonEnum, SeksjonsIdEnum } from "@/app/_common/enums/cvEnums";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { SeksjonSkeleton } from "@/app/_common/components/SeksjonSkeleton";
import { useOppdaterCvSeksjonNoCache } from "@/app/_common/hooks/swr/useOppdaterCvSeksjonNoCache";
import { useCvModal } from "@/app/_common/hooks/useCvModal";
import { useId } from "react";

function OffentligeGodkjenningerIcon() {
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
                d="M34.6788 20.0683C33.2295 18.5176 30.7705 18.5176 29.3212 20.0683L28.2699 21.1931C27.9414 21.5446 27.4769 21.737 26.996 21.7208L25.4573 21.6688C23.336 21.5971 21.5972 23.3359 21.6688 25.4572L21.7208 26.9959C21.7371 27.4768 21.5447 27.9413 21.1932 28.2698L20.0684 29.3211C18.5177 30.7704 18.5177 33.2294 20.0684 34.6787L21.1932 35.73C21.5447 36.0585 21.7371 36.523 21.7208 37.0039L21.6688 38.5426C21.5972 40.6639 23.336 42.4027 25.4573 42.331L26.996 42.279C27.4769 42.2628 27.9414 42.4552 28.2699 42.8067L29.3212 43.9315C30.7705 45.4822 33.2295 45.4822 34.6788 43.9315L35.7301 42.8067C36.0586 42.4552 36.5231 42.2628 37.004 42.279L38.5427 42.331C40.664 42.4027 42.4028 40.6639 42.3311 38.5426L42.2791 37.0039C42.2629 36.523 42.4553 36.0585 42.8068 35.73L43.9316 34.6787C45.4823 33.2294 45.4823 30.7704 43.9316 29.3211L42.8068 28.2698C42.4553 27.9413 42.2629 27.4768 42.2791 26.9959L42.3311 25.4572C42.4028 23.3359 40.664 21.5971 38.5427 21.6688L37.004 21.7208C36.5231 21.737 36.0586 21.5446 35.7301 21.1931L34.6788 20.0683ZM30.7824 21.4339C31.4411 20.7291 32.5589 20.7291 33.2176 21.4339L34.2689 22.5587C34.9917 23.3321 36.0136 23.7554 37.0716 23.7196L38.6103 23.6676C39.5745 23.635 40.3649 24.4254 40.3323 25.3896L40.2803 26.9283C40.2445 27.9863 40.6678 29.0082 41.4412 29.731L42.566 30.7823C43.2708 31.441 43.2708 32.5588 42.566 33.2175L41.4412 34.2688C40.6678 34.9916 40.2445 36.0135 40.2803 37.0715L40.3323 38.6102C40.3649 39.5744 39.5745 40.3648 38.6103 40.3322L37.0716 40.2802C36.0136 40.2444 34.9917 40.6677 34.2689 41.4411L33.2176 42.5659C32.5589 43.2707 31.4411 43.2707 30.7824 42.5659L29.7311 41.4411C29.0083 40.6677 27.9864 40.2444 26.9284 40.2802L25.3897 40.3322C24.4255 40.3648 23.6351 39.5744 23.6677 38.6102L23.7197 37.0715C23.7555 36.0135 23.3322 34.9916 22.5588 34.2688L21.434 33.2175C20.7292 32.5588 20.7292 31.441 21.434 30.7823L22.5588 29.731C23.3322 29.0082 23.7555 27.9863 23.7197 26.9283L23.6677 25.3896C23.6351 24.4254 24.4255 23.635 25.3897 23.6676L26.9284 23.7196C27.9864 23.7554 29.0083 23.3321 29.7311 22.5587L30.7824 21.4339ZM37.0404 29.707C37.431 29.3165 37.431 28.6833 37.0404 28.2928C36.6499 27.9023 36.0167 27.9023 35.6262 28.2928L30.6667 33.2524L28.3738 30.9595C27.9832 30.569 27.3501 30.569 26.9596 30.9595C26.569 31.35 26.569 31.9832 26.9596 32.3737L29.9596 35.3737C30.3501 35.7642 30.9832 35.7642 31.3738 35.3737L37.0404 29.707Z"
                fill="#23262A"
            />
        </svg>
    );
}

export default function OffentligeGodkjenninger() {
    const { offentligeGodkjenninger, cvLaster } = useCv();
    const oppdateringprops = useOppdaterCvSeksjonNoCache(CvSeksjonEnum.OFFENTLIGE_GODKJENNINGER);
    const modalProps = useCvModal(offentligeGodkjenninger, oppdateringprops);
    const { modalÅpen, toggleModal, lastendeIndex, slettElement } = modalProps;
    const headingId = useId();
    const summaryHeadingId = useId();

    return (
        <section
            aria-labelledby={cvLaster ? undefined : headingId}
            data-section
            id={SeksjonsIdEnum.OFFENTLIGE_GODKJENNINGER}
        >
            {cvLaster ? (
                <SeksjonSkeleton icon={<OffentligeGodkjenningerIcon />} />
            ) : (
                <Box background="surface-default" padding="10" className={styles.box}>
                    <HStack justify="center">
                        <OffentligeGodkjenningerIcon />
                    </HStack>
                    <Heading id={headingId} level="2" size="large" align="start" spacing>
                        Offentlige godkjenninger
                    </Heading>
                    {offentligeGodkjenninger.length === 0 ? (
                        <div>
                            <BodyLong weight="semibold" spacing>
                                Du har ikke lagt til noen offentlige godkjenninger i CV-en
                            </BodyLong>
                            <BodyLong className={styles.mb12}>
                                En offentlig godkjenning er utsendt av et statlig organ, som f.eks truckførerbevis eller
                                autorisasjon som sykepleier.
                            </BodyLong>
                        </div>
                    ) : (
                        <div className={styles.mb6}>
                            {offentligeGodkjenninger.map((godkjenning, index) => (
                                <div key={index}>
                                    <FormSummary style={{ marginBottom: "1rem" }}>
                                        <FormSummary.Header>
                                            <FormSummary.Heading id={summaryHeadingId} level="2">
                                                {godkjenning.title}
                                            </FormSummary.Heading>
                                        </FormSummary.Header>
                                        <FormSummary.Answers aria-labelledby={summaryHeadingId}>
                                            <FormSummary.Answer>
                                                <FormSummary.Label>Utsteder</FormSummary.Label>
                                                <FormSummary.Value>{godkjenning.issuer}</FormSummary.Value>
                                            </FormSummary.Answer>
                                            <FormSummary.Answer>
                                                <FormSummary.Label>{`Gyldig${godkjenning.toDate ? "" : " fra"}`}</FormSummary.Label>
                                                <FormSummary.Value>
                                                    {`${formatterFullDato(godkjenning.fromDate)}${godkjenning.toDate ? ` - ${formatterFullDato(godkjenning.toDate)}` : ""}`}
                                                </FormSummary.Value>
                                            </FormSummary.Answer>
                                        </FormSummary.Answers>
                                    </FormSummary>
                                    <HStack justify="space-between" className={styles.mb6}>
                                        <Button
                                            aria-label={`Endre offentlig godkjenning ${godkjenning.title}`}
                                            icon={<PencilIcon aria-hidden />}
                                            variant="tertiary"
                                            onClick={() => toggleModal(true, index)}
                                        >
                                            Endre
                                        </Button>
                                        <Button
                                            aria-label={`Fjern offentlig godkjenning ${godkjenning.title}`}
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
                        aria-label={
                            offentligeGodkjenninger.length === 0
                                ? "Legg til offentlig godkjenning"
                                : "Legg til flere offentlige godkjenninger"
                        }
                        icon={<PlusIcon aria-hidden />}
                        variant="primary"
                        onClick={() => toggleModal(true)}
                    >
                        {offentligeGodkjenninger.length === 0 ? "Legg til" : "Legg til flere"}
                    </Button>
                </Box>
            )}
            {modalÅpen && <OffentligeGodkjenningerModal {...modalProps} />}
        </section>
    );
}
