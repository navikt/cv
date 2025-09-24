import Script from "next/script";
import { serverConfig } from "@/app/_common/serverConfig";
import ModiaDekoratør from "@/app/_common/components/Dekoratør/ModiaDekoratør";
import { MockWrapper } from "@/app/_common/components/MockWrapper";
import Skyra from "@/app/_common/components/Dekoratør/Skyra";

export default async function VeilederDekoratørWrapper({ children, fontClassName }) {
    const devBundle = "https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/dev/latest/dist/bundle.js";
    const prodBundle = "https://cdn.nav.no/personoversikt/internarbeidsflate-decorator-v3/prod/latest/dist/bundle.js";

    const bundle = serverConfig.naisCluster === "prod-gcp" ? prodBundle : devBundle;
    const erLocalhost = process.env.NODE_ENV === "development";

    const content = erLocalhost ? <MockWrapper>{children}</MockWrapper> : children;

    return (
        <html lang="no">
            <head>
                <title>Min CV - nav.no - Veileder</title>
                <Script src={bundle} strategy="afterInteractive" />
                <Skyra />
            </head>
            <body className={fontClassName}>
                <ModiaDekoratør />
                <main id="maincontent">{content}</main>
            </body>
        </html>
    );
}
