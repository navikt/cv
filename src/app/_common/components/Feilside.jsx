import { BodyLong, Box, Button, Heading, HStack, Link, VStack } from "@navikt/ds-react";
import NextLink from "next/link";
import styles from "@/app/page.module.css";
import HeaderPanel from "@/app/_common/components/HeaderPanel";
import { arbeidsplassenBaseUrl, navBaseUrl } from "@/app/_common/utils/urlUtils";

export function Feilside({ årsak }) {
    return (
        <>
            <HeaderPanel visTag={false} />
            <HStack className={styles.pageContainer}>
                <Box padding="10" className={[styles.box, styles.mt3]}>
                    <VStack>
                        <Heading level="1" size="xlarge" className="text-center" spacing>
                            {årsak.tittel}
                        </Heading>
                        {årsak.body ? (
                            årsak.body
                        ) : (
                            <BodyLong className={["text-center", styles.mb12]}>{årsak.tekst}</BodyLong>
                        )}
                        <HStack gap="4" className={styles.mb3}>
                            <NextLink href={`${navBaseUrl}/person/kontakt-oss/nb`} passHref legacyBehavior>
                                <Button variant="primary" as="a" role="link">
                                    Kontakt oss
                                </Button>
                            </NextLink>
                            <NextLink href={navBaseUrl} passHref legacyBehavior>
                                <Button variant="secondary" as="a" role="link">
                                    Gå til nav.no
                                </Button>
                            </NextLink>
                        </HStack>
                    </VStack>
                </Box>
            </HStack>
        </>
    );
}

export const FeilsideÅrsak = Object.freeze({
    IKKE_UNDER_OPPFØLGING: {
        tittel: "Din CV er ikke tilgjengelig",
        body: (
            <VStack gap="4" className={styles.mb12}>
                <BodyLong className="text-center">
                    Du er ikke under oppfølging av NAV og har ikke tilgang til din CV her.
                </BodyLong>
                <BodyLong className="text-center">
                    For å se og endre din CV, gå til{" "}
                    <Link rel="noopener noreferrer" href={`${arbeidsplassenBaseUrl}/cv`} inlineText>
                        arbeidsplassen.no/cv
                    </Link>
                    .
                </BodyLong>
            </VStack>
        ),
    },
    FETCH_ERROR: {
        tittel: "CV er ikke tilgjengelig",
        tekst: "Det har skjedd en feil under lasting av CVen din. Vennligst prøv igjen eller kom tilbake senere.",
    },
    IKKE_LOGGET_INN: {
        tittel: "Du er ikke logget inn",
        tekst: "Du er ikke logget inn. Min CV er en innlogget tjeneste. Vennligst logg inn, eller gå tilbake til Nav.no.",
    },
    LOGGET_UT: {
        tittel: "Du har blitt logget ut",
        tekst: "Du har blitt logget ut på grunn av inaktivitet. Vennligst logg inn igjen, eller gå tilbake til Nav.no.",
    },
});
