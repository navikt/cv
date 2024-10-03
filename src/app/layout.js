import { fetchDecoratorReact } from "@navikt/nav-dekoratoren-moduler/ssr";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import "./page.module.css";
import logger from "@/app/_common/utils/logger";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = async (props) => {
    const { children } = props;
    const miljø = process.env.NEXT_PUBLIC_ENV_DEKORATOR;

    const hentDekoratørProps = (miljø, minSideUrl) => ({
        env: miljø,
        params: {
            context: "privatperson",
            redirectToApp: true,
            breadcrumbs: [
                {
                    title: "Min side",
                    url: minSideUrl,
                },
                {
                    title: "Din CV",
                    url: "/personbruker",
                },
            ],
        },
    });

    const ProdDekorator = await fetchDecoratorReact(hentDekoratørProps("prod", "https://www.nav.no/minside"));
    const DevDekoratør = await fetchDecoratorReact(hentDekoratørProps("dev", "https://www.ansatt.dev.nav.no/minside"));

    const headAssets = miljø === "prod" ? ProdDekorator.HeadAssets() : DevDekoratør.HeadAssets();
    const header = miljø === "prod" ? ProdDekorator.Header() : DevDekoratør.Header();
    const footer = miljø === "prod" ? ProdDekorator.Footer() : DevDekoratør.Footer();
    const scripts =
        miljø === "prod" ? ProdDekorator.Scripts({ loader: Script }) : DevDekoratør.Scripts({ loader: Script });

    return (
        <html lang="no">
            <head>
                <title>Din CV - nav.no</title>
                {headAssets}
            </head>
            <body className={inter.className}>
                {header}
                {children}
                {footer}
                {scripts}
            </body>
        </html>
    );
};

export default RootLayout;
