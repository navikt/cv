import { BodyLong, Box, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import NextLink from "next/link";
import styles from "@/app/page.module.css";
import HeaderPanel from "@/app/_common/components/HeaderPanel";
import { cvConfig } from "@/app/_common/config";

export function Feilside({ årsak }) {
    return (
        <>
            <HeaderPanel visTag={false} />
            <HStack
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    paddingBottom: "4rem",
                }}
            >
                <Box padding="10" className={[styles.box, styles.mt3]}>
                    <VStack>
                        <Heading level="1" size="xlarge" className="text-center" spacing>
                            CV er ikke tilgjengelig
                        </Heading>
                        <BodyLong className={["text-center", styles.mb12]}>{årsak}</BodyLong>

                        <HStack gap="4" className={[styles.mb3]}>
                            <NextLink href={`${cvConfig.urls.nav}/person/kontakt-oss/nb`} passHref legacyBehavior>
                                <Button variant="primary" as="a">
                                    Kontakt oss
                                </Button>
                            </NextLink>
                            <Button variant="secondary" as="a" onClick={() => history.back()}>
                                Gå tilbake
                            </Button>
                        </HStack>
                    </VStack>
                </Box>
            </HStack>
        </>
    );
}

export const FeilsideTekst = Object.freeze({
    IKKE_UNDER_OPPFØLGING:
        "Du er ikke under arbeidsrettet oppfølging og har derfor ikke tilgang til din CV. Ønsker du å se CV-en din kan du ta kontakt med oss.",
    FETCH_ERROR: "Det har skjedd en feil under lasting av CVen din. Vennligst prøv igjen eller kom tilbake senere.",
    IKKE_LOGGET_INN: "Du er ikke logget inn. Min CV er en innlogget tjensete. Vennligst logg inn, eller gå tilbake.",
});
