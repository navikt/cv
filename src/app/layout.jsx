// eslint-disable-next-line camelcase
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import "./page.module.css";
import { serverConfig } from "@/app/_common/serverConfig";
import BorgerDekoratørWrapper from "@/app/_common/components/Dekoratør/BorgerDekoratørWrapper";
import VeilederDekoratørWrapper from "@/app/_common/components/Dekoratør/VeilederDekoratørWrapper";
import { logger } from "@navikt/next-logger";
import { makeDemoServer } from "../../mocks/mirageDemo";
import { makeLocalhostServer } from "../../mocks/mirage";

export const dynamic = "force-dynamic";
const sourceSansPro = Source_Sans_3({ subsets: ["latin"], adjustFontFallback: false });

async function RootLayout({ children }) {
    const { erVeileder, erDemoApp } = serverConfig;

    if (process.env.ER_DEMO_APP === "true") {
        makeDemoServer();
        logger.warn("Mirage mocks kjører i demo-modus!");
    } else if (process.env.NODE_ENV === "development") {
        makeLocalhostServer();
        logger.warn("Mirage mocks kjører!");
    }

    logger.info(
        `Er veileder i layout: ${erVeileder} (direkte-sjekk: ${process.env.NODE_ENV === "development"}, er demo i layout: ${erDemoApp} (direkte-sjekk: ${process.env.ER_DEMO_APP === "true"}`,
    );

    return erVeileder === true ? (
        <VeilederDekoratørWrapper fontClassName={sourceSansPro.className}>{children}</VeilederDekoratørWrapper>
    ) : (
        <BorgerDekoratørWrapper fontClassName={sourceSansPro.className}>{children}</BorgerDekoratørWrapper>
    );
}

export default RootLayout;
