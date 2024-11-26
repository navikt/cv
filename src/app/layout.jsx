// eslint-disable-next-line camelcase
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import "./page.module.css";
import { hentDekoratør } from "@/app/_common/utils/dekoratør";

export const dynamic = "force-dynamic";
const sourceSansPro = Source_Sans_3({ subsets: ["latin"], adjustFontFallback: false });

async function RootLayout({ children }) {
    if (process.env.NODE_ENV === "development") {
        import("../../mocks/mirage").then(() => console.warn("Mirage mocks kjører!"));
    }

    const { HeadAssets, Header, Footer, Scripts } = await hentDekoratør();

    return (
        <html lang="no">
            <head>
                <title>Min CV - nav.no</title>
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
