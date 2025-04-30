// eslint-disable-next-line camelcase
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import "./page.module.css";
import { serverConfig } from "@/app/_common/serverConfig";
import BorgerDekoratørWrapper from "@/app/_common/components/Dekoratør/BorgerDekoratørWrapper";
import VeilederDekoratørWrapper from "@/app/_common/components/Dekoratør/VeilederDekoratørWrapper";
import { MirageInitializer } from "@/app/_common/components/MirageInitializer";

export const dynamic = "force-dynamic";
const sourceSansPro = Source_Sans_3({ subsets: ["latin"], adjustFontFallback: false });

async function RootLayout({ children }) {
    const { erVeileder } = serverConfig;

    return erVeileder === true ? (
        <VeilederDekoratørWrapper fontClassName={sourceSansPro.className}>
            <MockWrapper>{children}</MockWrapper>
        </VeilederDekoratørWrapper>
    ) : (
        <BorgerDekoratørWrapper fontClassName={sourceSansPro.className}>
            <MockWrapper>{children}</MockWrapper>
        </BorgerDekoratørWrapper>
    );
}

function MockWrapper({ children }) {
    const erDemoApp = process.env.ER_DEMO_APP === "true";
    const erLocalhost = process.env.NODE_ENV === "development";

    if (erDemoApp || erLocalhost) {
        return (
            <MirageInitializer erDemoApp={erDemoApp} erLocalHost={erLocalhost}>
                {children}
            </MirageInitializer>
        );
    }

    return children;
}

export default RootLayout;
