import { fetchDecoratorReact } from "@navikt/nav-dekoratoren-moduler/ssr";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import "./page.module.css";
import logger from "@/app/_common/utils/logger";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = async (props) => {
    const { children } = props;
    logger.info(
        "Dekoratør process.enver:",
        process.env.NEXT_PUBLIC_ENV_DEKORATOR,
        process.env.NEXT_PUBLIC_NAV_MIN_SIDE_URL,
    );
    console.log(
        "Dekoratør process.enver:",
        process.env.NEXT_PUBLIC_ENV_DEKORATOR,
        process.env.NEXT_PUBLIC_NAV_MIN_SIDE_URL,
    );
    const Decorator = await fetchDecoratorReact({
        env: process.env.NEXT_PUBLIC_ENV_DEKORATOR,
        params: {
            context: "privatperson",
            redirectToApp: true,
            breadcrumbs: [
                {
                    title: "Min side",
                    url: process.env.NEXT_PUBLIC_NAV_MIN_SIDE_URL,
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
