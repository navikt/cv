import { fetchDecoratorReact } from "@navikt/nav-dekoratoren-moduler/ssr";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = async (props) => {
    const { children } = props;
    const miljø = process.env.NEXT_PUBLIC_ENV_DEKORATOR;

    const hentDekoratørForMiljø = async (miljø) =>
        await fetchDecoratorReact({
            env: miljø,
            params: {
                context: "privatperson",
                redirectToApp: true,
                breadcrumbs: [
                    {
                        title: "Min side",
                        url: miljø === "prod" ? "https://www.nav.no/minside" : "https://www.ansatt.dev.nav.no/minside",
                    },
                    {
                        title: "Din CV",
                        url: "/personbruker",
                    },
                ],
            },
        });

    const ProdDekoratør = await hentDekoratørForMiljø("prod");
    const DevDekoratør = await hentDekoratørForMiljø("dev");
    const Dekoratør = miljø === "prod" ? ProdDekoratør : DevDekoratør;

    return (
        <html lang="no">
            <head>
                <title>Din CV - nav.no</title>
                {Dekoratør.HeadAssets()}
            </head>
            <body className={inter.className}>
                {Dekoratør.Header()}
                {children}
                {Dekoratør.Footer()}
                {Dekoratør.Scripts({ loader: Script })}
            </body>
        </html>
    );
};

export default RootLayout;
