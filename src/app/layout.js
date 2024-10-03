import { fetchDecoratorReact } from "@navikt/nav-dekoratoren-moduler/ssr";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import "./page.module.css";
import { cvConfig } from "@/app/_common/config";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = async (props) => {
    const { children } = props;

    const Dekorator = await fetchDecoratorReact({
        env: cvConfig.dekoratoren.miljø,
        params: {
            context: "privatperson",
            redirectToApp: true,
            breadcrumbs: [
                {
                    title: "Min side",
                    url: cvConfig.dekoratoren.minSideUrl,
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
                {Dekorator.HeadAssets()}
            </head>
            <body className={inter.className}>
                {Dekorator.Header()}
                {children}
                {Dekorator.Footer()}
                {Dekorator.Scripts({ loader: Script })}
            </body>
        </html>
    );
};

export default RootLayout;
