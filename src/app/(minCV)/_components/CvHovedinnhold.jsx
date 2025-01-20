import { Box, Button, HStack, Link, Show, VStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import Personalia from "@/app/(minCV)/_components/personalia/Personalia";
import Jobbonsker from "@/app/(minCV)/_components/jobbonsker/Jobbonsker";
import Utdanninger from "@/app/(minCV)/_components/utdanninger/Utdanninger";
import Fagbrev from "@/app/(minCV)/_components/fagbrev/Fagbrev";
import Arbeidsforhold from "@/app/(minCV)/_components/arbeidsforhold/Arbeidsforhold";
import AndreErfaringer from "@/app/(minCV)/_components/andreErfaringer/AndreErfaringer";
import Kompetanser from "@/app/(minCV)/_components/kompetanser/Kompetanser";
import OffentligeGodkjenninger from "@/app/(minCV)/_components/offentligeGodkjenninger/OffentligeGodkjenninger";
import AndreGodkjenninger from "@/app/(minCV)/_components/andreGodkjenninger/AndreGodkjenninger";
import Sprak from "@/app/(minCV)/_components/sprak/Sprak";
import Forerkort from "@/app/(minCV)/_components/forerkort/Forerkort";
import Kurs from "@/app/(minCV)/_components/kurs/Kurs";
import Sammendrag from "@/app/(minCV)/_components/sammendrag/Sammendrag";
import DelingAvCV from "@/app/(minCV)/_components/delingAvCV/DelingAvCV";
import { HotjarWrapper } from "@/app/_common/components/HotjarWrapper";
import { EyeIcon } from "@navikt/aksel-icons";
import { LastNedCv } from "@/app/(minCV)/_components/lastNedCv/LastNedCv";
import { useContext } from "react";
import { ApplicationContext } from "@/app/_common/contexts/ApplicationContext";
import VeilederBanner from "@/app/_common/components/VeilederBanner/VeilederBanner";

export default function CvHovedinnhold({ cvLaster, setVisHovedinnhold }) {
    const { erVeileder } = useContext(ApplicationContext);

    return (
        <div>
            {erVeileder && <VeilederBanner />}
            <Box className={styles.main}>
                <HStack gap="4">
                    <VStack>
                        <Personalia />
                        <Jobbonsker />
                        <Utdanninger />
                        <Fagbrev />
                        <Arbeidsforhold />
                        <AndreErfaringer />
                        <Kompetanser />
                        <OffentligeGodkjenninger />
                        <AndreGodkjenninger />
                        <Sprak />
                        <Forerkort />
                        <Kurs />
                        <Sammendrag />
                        <DelingAvCV />
                        <HotjarWrapper />
                    </VStack>
                </HStack>
            </Box>
            <Show below="xl">
                <HStack justify="center" style={{ padding: "4rem 0 2rem 0" }}>
                    <VStack gap="4">
                        <Button
                            icon={<EyeIcon aria-hidden />}
                            variant="primary"
                            onClick={() => setVisHovedinnhold(false)}
                            disabled={cvLaster}
                        >
                            Forhåndsvis CV
                        </Button>
                        <LastNedCv />
                        <Link inlineText href="/min-cv/personvern">
                            Personvernserklæring for Min CV
                        </Link>
                    </VStack>
                </HStack>
            </Show>
        </div>
    );
}
