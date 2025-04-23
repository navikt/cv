// eslint-disable-next-line camelcase
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import "./page.module.css";
import { serverConfig } from "@/app/_common/serverConfig";
import BorgerDekoratørWrapper from "@/app/_common/components/Dekoratør/BorgerDekoratørWrapper";
import VeilederDekoratørWrapper from "@/app/_common/components/Dekoratør/VeilederDekoratørWrapper";
import { logger } from "@navikt/next-logger";

export const dynamic = "force-dynamic";
const sourceSansPro = Source_Sans_3({ subsets: ["latin"], adjustFontFallback: false });

async function RootLayout({ children }) {
    const { erVeileder, erDemoApp } = serverConfig;

    if (erDemoApp) {
        import("../../mocks/mirageDemo").then(() => logger.warn("Mirage mocks kjører i demo-modus!"));
    } else if (process.env.NODE_ENV === "development") {
        import("../../mocks/mirage").then(() => logger.warn("Mirage mocks kjører!"));
    }

    logger.info(`Er veileder i layout: ${erVeileder}`);

    return erVeileder === true ? (
        <VeilederDekoratørWrapper fontClassName={sourceSansPro.className}>{children}</VeilederDekoratørWrapper>
    ) : (
        <BorgerDekoratørWrapper fontClassName={sourceSansPro.className}>{children}</BorgerDekoratørWrapper>
    );
}

export default RootLayout;
