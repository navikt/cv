// eslint-disable-next-line camelcase
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import "./page.module.css";
import { serverConfig } from "@/app/_common/serverConfig";
import BorgerDekoratørWrapper from "@/app/_common/components/Dekoratør/BorgerDekoratørWrapper";
import logger from "@/app/_common/utils/logger";
import VeilederDekoratørWrapper from "@/app/_common/components/Dekoratør/VeilederDekoratørWrapper";

export const dynamic = "force-dynamic";
const sourceSansPro = Source_Sans_3({ subsets: ["latin"], adjustFontFallback: false });

async function RootLayout({ children }) {
    // Dupliser denne for demo, med en annen fil kanskje?
    if (process.env.NODE_ENV === "development") {
        import("../../mocks/mirage").then(() => console.warn("Mirage mocks kjører!"));
    }

    const { erVeileder } = serverConfig;

    logger.info(`Er veileder i layout: ${erVeileder}`);

    return erVeileder === true ? (
        <VeilederDekoratørWrapper />
    ) : (
        <BorgerDekoratørWrapper fontClassName={sourceSansPro.className}>{children}</BorgerDekoratørWrapper>
    );
}

export default RootLayout;
