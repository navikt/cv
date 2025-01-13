import Script from "next/script";
import logger from "@/app/_common/utils/logger";
import { serverConfig } from "@/app/_common/serverConfig";

export default async function VeilederDekoratørWrapper({ children, fontClassName }) {
    const devBundle = "https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/bundle.js";
    const prodBundle = "https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/prod/latest/dist/bundle.js";

    const bundle = serverConfig.naisCluster === "prod-gcp" ? prodBundle : devBundle;
    logger.info(`Nais cluster: ${serverConfig.naisCluster}`);

    return (
        <html lang="no">
            <head>
                <title>Min CV - nav.no - Veileder</title>
                <Script src={bundle} strategy="afterInteractive" />
            </head>
            <body className={fontClassName}>
                <main id="maincontent">{children}</main>
            </body>
        </html>
    );
}
