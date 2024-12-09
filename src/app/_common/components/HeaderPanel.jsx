import { BodyShort, Box, Detail, Heading, Hide, HStack, Show, Skeleton, VStack } from "@navikt/ds-react";
import { formatterFullDatoMedFallback } from "@/app/_common/utils/stringUtils";
import { usePerson } from "@/app/_common/hooks/swr/usePerson";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import styles from "@/app/page.module.css";

function HeaderPanel({ title = "Min CV" }) {
    const { personalia } = usePerson();
    const { cv } = useCv();

    const navn = personalia ? `${personalia?.fornavn} ${personalia?.etternavn}`.toUpperCase() : null;
    const sistEndret = cv ? new Date(cv.sistEndret) : null;

    const navnKomponent = !navn ? (
        <BodyShort as={Skeleton} size="small">
            OLA NORDMANN
        </BodyShort>
    ) : (
        <BodyShort size="small" className={styles.wrapText}>
            {navn}
        </BodyShort>
    );

    const sistEndretKomponent = !sistEndret ? (
        <Detail as={Skeleton}>Sist endret 1. januar 1970</Detail>
    ) : (
        <Detail>{`Sist endret ${formatterFullDatoMedFallback(sistEndret)}`}</Detail>
    );

    return (
        <Box as="header" borderWidth="0 0 4 0" borderColor="surface-info">
            <Box background="surface-default" paddingInline="4" paddingBlock="6 6">
                <VStack align="center">
                    <HStack align="start" gap="6">
                        <Hide below="md">
                            <Pictogram />
                        </Hide>
                        <VStack gap={{ xs: "3", md: "3" }}>
                            <HStack gap="6" align="center">
                                <Heading level="1" size="large">
                                    {title}
                                </Heading>
                            </HStack>
                            <Hide below="md">
                                <HStack gap="4" align="center">
                                    {navnKomponent}
                                    <svg
                                        width="4"
                                        height="4"
                                        viewBox="0 0 4 4"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle id="Ellipse_16" cx="2" cy="2" r="2" fill="#B5F1FF" />
                                    </svg>
                                    {sistEndretKomponent}
                                </HStack>
                            </Hide>
                            <Show below="md">
                                <VStack gap="2">
                                    {navnKomponent}
                                    {sistEndretKomponent}
                                </VStack>
                            </Show>
                        </VStack>
                    </HStack>
                </VStack>
            </Box>
        </Box>
    );
}

export function Pictogram() {
    return (
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="72" height="72" rx="36" fill="#B5F1FF" />
            <g clipPath="url(#clip0_2035_24190)">
                <rect
                    x="60.5"
                    y="25.2085"
                    width="37.3333"
                    height="7"
                    transform="rotate(-180 60.5 25.2085)"
                    fill="#EBFCFF"
                />
                <rect
                    x="53.5"
                    y="41.5415"
                    width="37.3333"
                    height="7"
                    transform="rotate(-180 53.5 41.5415)"
                    fill="#EBFCFF"
                />
                <rect
                    x="45.334"
                    y="57.2915"
                    width="37.3333"
                    height="7"
                    transform="rotate(-180 45.334 57.2915)"
                    fill="#EBFCFF"
                />
                <path
                    d="M12.8758 14.7697L13.7326 16.0461L17.6075 13.3213"
                    stroke="#23262A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M21.0438 26.2565L21.9006 27.5329L25.7754 24.8081"
                    stroke="#23262A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path d="M21.416 15H24.916" stroke="#23262A" strokeWidth="2" strokeLinecap="round" />
                <path d="M12.666 20.8335H16.166" stroke="#23262A" strokeWidth="2" strokeLinecap="round" />
                <path d="M12.666 26.6665H16.166" stroke="#23262A" strokeWidth="2" strokeLinecap="round" />
                <path d="M21.416 20.8335H24.916" stroke="#23262A" strokeWidth="2" strokeLinecap="round" />
                <path d="M29.584 20.8335H33.084" stroke="#23262A" strokeWidth="2" strokeLinecap="round" />
                <path d="M29.584 15H33.084" stroke="#23262A" strokeWidth="2" strokeLinecap="round" />
                <mask id="path-13-inside-1_2035_24190" fill="white">
                    <rect x="8" y="8" width="30.3333" height="24.5" rx="1.33333" />
                </mask>
                <rect
                    x="8"
                    y="8"
                    width="30.3333"
                    height="24.5"
                    rx="1.33333"
                    stroke="#23262A"
                    strokeWidth="4"
                    mask="url(#path-13-inside-1_2035_24190)"
                />
                <path
                    d="M37.5248 44.642C37.7235 43.9182 38.3814 43.4165 39.132 43.4165H60.5033C61.6034 43.4165 62.4017 44.4635 62.1105 45.5244L57.8099 61.191C57.6112 61.9148 56.9532 62.4165 56.2027 62.4165H34.8313C33.7312 62.4165 32.9329 61.3695 33.2241 60.3086L37.5248 44.642Z"
                    stroke="#23262A"
                    strokeWidth="2"
                />
                <path
                    d="M36.459 48.8521L47.0276 53.9327L61.1191 48.8521"
                    stroke="#23262A"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_2035_24190">
                    <rect width="56" height="56" fill="white" transform="translate(8 8)" />
                </clipPath>
            </defs>
        </svg>
    );
}

export default HeaderPanel;
