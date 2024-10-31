// eslint-disable-next-line camelcase
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import "./page.module.css";
import { hentDekoratør } from "@/app/_common/utils/dekoratør";
import { serverConfig } from "@/app/_common/serverConfig";

export const dynamic = "force-dynamic";
const sourceSansPro = Source_Sans_3({ subsets: ["latin"] });

async function RootLayout({ children }) {
    if (serverConfig.nodeEnv) {
        import("../../mocks/mirage").then(() => console.warn("Mirage mock`s kjører!"));
    }

    const { HeadAssets, Header, Footer, Scripts } = await hentDekoratør();

    return (
        <html lang="no">
            <head>
                <title>Din CV - nav.no</title>
                {HeadAssets}
            </head>
            <body className={sourceSansPro.className}>
                {Header}
                <main id="maincontent">{children}</main>
                {Footer}
                {Scripts}
            </body>
        </html>
    );
}

export default RootLayout;
