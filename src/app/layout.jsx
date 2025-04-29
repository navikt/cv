// eslint-disable-next-line camelcase
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import "./page.module.css";
import { serverConfig } from "@/app/_common/serverConfig";
import BorgerDekoratørWrapper from "@/app/_common/components/Dekoratør/BorgerDekoratørWrapper";
import VeilederDekoratørWrapper from "@/app/_common/components/Dekoratør/VeilederDekoratørWrapper";
import { logger } from "@navikt/next-logger";
import { MirageInitializer } from "@/app/_common/components/MirageInitializer";

export const dynamic = "force-dynamic";
const sourceSansPro = Source_Sans_3({ subsets: ["latin"], adjustFontFallback: false });

async function RootLayout({ children }) {
    const { erVeileder, erDemoApp } = serverConfig;

    logger.info(
        `Er veileder i layout: ${erVeileder} (direkte-sjekk: ${process.env.NODE_ENV === "development"}, er demo i layout: ${erDemoApp} (direkte-sjekk: ${process.env.ER_DEMO_APP === "true"}`,
    );

    const innhold =
        erVeileder === true ? (
            <VeilederDekoratørWrapper fontClassName={sourceSansPro.className}>{children}</VeilederDekoratørWrapper>
        ) : (
            <BorgerDekoratørWrapper fontClassName={sourceSansPro.className}>{children}</BorgerDekoratørWrapper>
        );

    return <MockWrapper>{innhold}</MockWrapper>;
}

function MockWrapper({ children }) {
    const erDemoApp = process.env.ER_DEMO_APP === "true";
    const erLocalhost = process.env.NODE_ENV === "development";

    if (erDemoApp || erLocalhost) {
        return <MirageInitializer>{children}</MirageInitializer>;
    }

    return children;
}

export default RootLayout;
