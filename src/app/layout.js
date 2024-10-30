import { fetchDecoratorReact } from "@navikt/nav-dekoratoren-moduler/ssr";
import Script from "next/script";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import "./page.module.css";
import { serverConfig, serverMiljø } from "@/app/_common/config";
import logger from "@/app/_common/utils/logger";

const sourceSansPro = Source_Sans_3({ subsets: ["latin"] });

async function RootLayout(props) {
    if (process.env.NODE_ENV === "development") {
        import("../../mocks/mirage").then(() => console.warn("Mirage mock`s kjører!"));
    }

    const { children } = props;

    logger.info(`Jeg har funnet miljø i layout: ${serverMiljø()}`);

    const Decorator = await fetchDecoratorReact({
        env: serverConfig.dekoratoren.miljø,
        params: {
            utilsBackground: "white",
            context: "privatperson",
            redirectToApp: true,
            breadcrumbs: [
                {
                    title: "Min side",
                    url: serverConfig.dekoratoren.minSideUrl,
                },
                {
                    title: "Din CV",
                    url: "/personbruker",
                },
            ],
        },
    });

    return (
        <html lang="no">
            <head>
                <title>Din CV - nav.no</title>
                <Decorator.HeadAssets />
            </head>
            <body className={sourceSansPro.className}>
                <Decorator.Header />
                <main id="maincontent">{children}</main>
                <Decorator.Footer />
                <Decorator.Scripts loader={Script} />
            </body>
        </html>
    );
}

export default RootLayout;
