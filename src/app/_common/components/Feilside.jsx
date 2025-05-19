import { BodyLong, Box, Button, Heading, HStack, Link, VStack } from "@navikt/ds-react";
import NextLink from "next/link";
import styles from "@/app/page.module.css";
import HeaderPanel from "@/app/_common/components/HeaderPanel";
import { arbeidsplassenBaseUrl, navBaseUrl } from "@/app/_common/utils/urlUtils";

export function Feilside({ årsak }) {
    return (
        <>
            <HeaderPanel />
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
    IKKE_UNDER_OPPFØLGING_VEILEDER: {
        tittel: "Bruker er ikke under oppfølging",
        tekst: "Brukeren er ikke under oppfølging, og du har som veileder derfor ikke tilgang til CVen.",
    },
    IKKE_MANUELL_VEILEDER: {
        tittel: "Bruker er ikke manuell",
        tekst: 'Brukeren er ikke manuell, og du har som veileder derfor ikke tilgang til brukers CV i "Min CV". Hvis du ønsker å se CV-en til bruker kan du gjøre det i Modia.',
    },
    FETCH_ERROR: {
        tittel: "CV er ikke tilgjengelig",
        tekst: "Vi klarte dessverre ikke å hente din CV akkurat nå. Vennligst prøv igjen eller kom tilbake senere.",
    },
    FETCH_ERROR_VEILEDER: {
        tittel: "CV er ikke tilgjengelig",
        tekst: "Vi klarte dessverre ikke å hente CV for bruker. Pass på at bruker er valgt i modia, og at du har tilgang til brukers CV.",
    },
    IKKE_LOGGET_INN: {
        tittel: "Du er ikke logget inn",
        body: (
            <BodyLong className={["text-center", styles.mb12]}>
                Du er ikke logget inn. "Min CV" er en innlogget tjeneste. Vennligst{" "}
                <Link rel="noopener noreferrer" href="/min-cv/api/login" inlineText>
                    logg inn
                </Link>
                , eller gå tilbake til Nav.no.
            </BodyLong>
        ),
    },
    LOGGET_UT: {
        tittel: "Du har blitt logget ut",
        body: (
            <BodyLong className={["text-center", styles.mb12]}>
                Du har blitt logget ut på grunn av inaktivitet. Vennligst{" "}
                <Link rel="noopener noreferrer" href="/min-cv/api/login" inlineText>
                    logg inn
                </Link>{" "}
                igjen, eller gå tilbake til Nav.no.
            </BodyLong>
        ),
    },
});
