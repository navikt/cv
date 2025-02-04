import { BodyLong, BodyShort, Box, Button, Heading, HStack, Link } from "@navikt/ds-react";
import { SeksjonsIdEnum } from "@/app/_common/enums/cvEnums";
import { useBekreftTidligereCv } from "@/app/_common/hooks/swr/useBekreftTidligereCv";
import { usePerson } from "@/app/_common/hooks/swr/usePerson";
import Euresdeling from "@/app/(minCV)/_components/delingAvCV/Euresdeling";
import { DelingTag } from "@/app/(minCV)/_components/delingAvCV/DelingTag";
import { useContext } from "react";
import { ApplicationContext } from "@/app/_common/contexts/ApplicationContext";
import styles from "../../../page.module.css";

function NavLogoIcon() {
    return (
        <svg
            aria-hidden="true"
            width="55"
            height="35"
            viewBox="0 0 55 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_2705_18081)">
                <g id="Modul-forslag">
                    <g>
                        <g id="Page-1-Copy">
                            <path
                                id="Fill-1"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M25.6208 34.988C16.0846 34.988 8.35205 27.1561 8.35205 17.4952C8.35205 7.83337 16.0846 0 25.6208 0C35.1606 0 42.8939 7.83337 42.8939 17.4952C42.8939 27.1561 35.1606 34.988 25.6208 34.988Z"
                                fill="#C30000"
                            />
                            <path
                                id="Fill-3"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 25.1334L3.53002 16.2842H6.92182L3.3963 25.1334H0Z"
                                fill="#C30000"
                            />
                            <path
                                id="Fill-5"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M43.5592 25.1334L47.044 16.2842H48.8932L45.4085 25.1334H43.5592Z"
                                fill="#C30000"
                            />
                            <g id="Group-9">
                                <g>
                                    <mask
                                        id="mask0_2705_18081"
                                        style={{ maskType: "luminance" }}
                                        maskUnits="userSpaceOnUse"
                                        x="50"
                                        y="16"
                                        width="5"
                                        height="10"
                                    >
                                        <g id="Group">
                                            <path
                                                id="Vector"
                                                d="M54.8788 25.1334V16.2842H50.4126V25.1334H54.8788Z"
                                                fill="white"
                                            />
                                        </g>
                                    </mask>
                                    <g mask="url(#mask0_2705_18081)">
                                        <path
                                            id="Fill-7"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M50.4126 25.1334L53.8968 16.2842H54.8789L51.3942 25.1334H50.4126Z"
                                            fill="#C30000"
                                        />
                                    </g>
                                </g>
                            </g>
                            <path
                                id="Fill-10"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M40.3525 16.2842H37.2823C37.2823 16.2842 37.0707 16.2842 36.9959 16.4735L35.2968 21.7419L33.5991 16.4735C33.5243 16.2842 33.3115 16.2842 33.3115 16.2842H27.4083C27.2805 16.2842 27.1733 16.3923 27.1733 16.5209V18.31C27.1733 16.8908 25.6824 16.2842 24.8094 16.2842C22.8543 16.2842 21.5456 17.5885 21.1381 19.5715C21.116 18.256 21.008 17.7846 20.6582 17.3019C20.4975 17.0654 20.2652 16.8665 20.0123 16.7021C19.4915 16.3931 19.0239 16.2842 18.019 16.2842H16.8391C16.8391 16.2842 16.6258 16.2842 16.5506 16.4735L15.477 19.1685V16.5209C15.477 16.3923 15.3706 16.2842 15.2431 16.2842H12.5127C12.5127 16.2842 12.3019 16.2842 12.2252 16.4735L11.1091 19.2757C11.1091 19.2757 10.9976 19.556 11.2524 19.556H12.3019V24.8958C12.3019 25.0284 12.4049 25.1334 12.5364 25.1334H15.2431C15.3706 25.1334 15.477 25.0284 15.477 24.8958V19.556H16.532C17.1374 19.556 17.2656 19.5727 17.5011 19.6839C17.643 19.7382 17.7708 19.848 17.8405 19.9745C17.9832 20.2466 18.019 20.5734 18.019 21.5371V24.8958C18.019 25.0284 18.1241 25.1334 18.2539 25.1334H20.8481C20.8481 25.1334 21.1413 25.1334 21.2573 24.8401L21.8322 23.4008C22.5967 24.4854 23.8549 25.1334 25.4187 25.1334H25.7603C25.7603 25.1334 26.0554 25.1334 26.1721 24.8401L27.1733 22.3284V24.8958C27.1733 25.0284 27.2805 25.1334 27.4083 25.1334H30.0565C30.0565 25.1334 30.3486 25.1334 30.466 24.8401C30.466 24.8401 31.5251 22.1766 31.5292 22.1565H31.5308C31.5715 21.9349 31.2951 21.9349 31.2951 21.9349H30.3499V17.3646L33.3237 24.8401C33.4399 25.1334 33.7327 25.1334 33.7327 25.1334H36.8611C36.8611 25.1334 37.1555 25.1334 37.2717 24.8401L40.5686 16.5708C40.6827 16.2842 40.3525 16.2842 40.3525 16.2842ZM27.1733 21.9349H25.3945C24.6865 21.9349 24.1105 21.3542 24.1105 20.6362C24.1105 19.9194 24.6865 19.335 25.3945 19.335H25.892C26.5982 19.335 27.1733 19.9194 27.1733 20.6362V21.9349Z"
                                fill="#FEFEFE"
                            />
                        </g>
                    </g>
                </g>
            </g>
            <defs>
                <clipPath id="clip0_2705_18081">
                    <rect width="55" height="35" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}

export default function DelingAvCV() {
    const { erVeileder } = useContext(ApplicationContext);
    const { måBekrefteTidligereCv, personLaster } = usePerson();
    const { bekreftLaster, bekreftHarFeil, setBekreft } = useBekreftTidligereCv();

    const bekreftTidligereCv = () => {
        if (måBekrefteTidligereCv) setBekreft(true);
    };

    return (
        <div data-section id={SeksjonsIdEnum.DELING_AV_CV}>
            <Box background="surface-default" padding="10" className={styles.box}>
                <HStack justify="center">
                    <HStack className={[styles.iconDelingAvCVBig, styles.sectionIcon]} />
                </HStack>
                <Heading level="2" size="large" align="start" className={styles.mb12}>
                    Deling av CV
                </Heading>
                <HStack gap="3" align="center" className={styles.mb3}>
                    <NavLogoIcon />
                    <BodyShort size="small" weight="semibold">
                        Deling med Nav
                    </BodyShort>
                </HStack>
                <BodyLong spacing>
                    Alle opplysninger i din CV og jobbønsker deles med Nav så lenge du er registrert hos Nav.{" "}
                    <Link rel="noopener noreferrer" href="/min-cv/slik-bruker-nav-cv-opplysningene" inlineText>
                        Les mer her
                    </Link>
                    .
                </BodyLong>
                <DelingTag
                    deltMed="Nav"
                    erDelt={!måBekrefteTidligereCv}
                    laster={bekreftLaster || personLaster}
                    error={bekreftHarFeil}
                />
                {måBekrefteTidligereCv && (
                    <div>
                        <BodyLong spacing className={styles.mt6}>
                            Før du deler CV-en din, kan du slette eller endre innhold du ikke ønsker å dele. Du vil
                            fortsatt ha mulighet til å endre innholdet i CV-en etter deling.
                        </BodyLong>
                        <Button loading={bekreftLaster} onClick={() => bekreftTidligereCv()}>
                            Del CV
                        </Button>
                    </div>
                )}
                {!erVeileder && <Euresdeling />}
            </Box>
        </div>
    );
}
