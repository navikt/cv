// eslint-disable-next-line camelcase
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import "./page.module.css";
import { serverConfig } from "@/app/_common/serverConfig";
import BorgerDekoratørWrapper from "@/app/_common/components/Dekoratør/BorgerDekoratørWrapper";

export const dynamic = "force-dynamic";
const sourceSansPro = Source_Sans_3({ subsets: ["latin"], adjustFontFallback: false });

async function RootLayout({ children }) {
    // Dupliser denne for demo, med en annen fil kanskje?
    if (process.env.NODE_ENV === "development") {
        import("../../mocks/mirage").then(() => console.warn("Mirage mocks kjører!"));
    }

    const { erVeileder } = serverConfig;

    return erVeileder === true ? (
        <html lang="no">
            <head>
                <title>Min CV - nav.no - Veileder</title>
            </head>
            <body className={sourceSansPro.className}>
                <main id="maincontent">{children}</main>
            </body>
        </html>
    ) : (
        <BorgerDekoratørWrapper fontClassName={sourceSansPro.className}>{children}</BorgerDekoratørWrapper>
    );
}

export default RootLayout;
