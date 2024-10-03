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
    const minSideUrl = process.env.NEXT_PUBLIC_ENV_DEKORATOR;

    logger.info(`Henter dekoratør med miljø: ${miljø} og min-side-url: ${minSideUrl}`);
    console.log(`Henter dekoratør med miljø: ${miljø} og min-side-url: ${minSideUrl}`);
    const Decorator = await fetchDecoratorReact({
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

    return (
        <html lang="no">
            <head>
                <title>Din CV - nav.no</title>
                {Decorator.HeadAssets()}
            </head>
            <body className={inter.className}>
                {Decorator.Header()}
                {children}
                {Decorator.Footer()}
                {Decorator.Scripts({ loader: Script })}
            </body>
        </html>
    );
};

export default RootLayout;
