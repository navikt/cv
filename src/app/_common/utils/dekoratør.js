import { fetchDecoratorReact } from "@navikt/nav-dekoratoren-moduler/ssr";
import { hentDekoratørProps, hentServermiljø } from "@/app/_common/serverConfig";
import Script from "next/script";

const hentDekoratørForMiljø = async (miljø) => {
    const { HeadAssets, Header, Footer, Scripts } = await fetchDecoratorReact(hentDekoratørProps(miljø));
    return { HeadAssets: HeadAssets(), Header: Header(), Footer: Footer(), Scripts: Scripts({ loader: Script }) };
};

const lokalDekoratør = hentDekoratørForMiljø("localhost");
const devDekoratør = hentDekoratørForMiljø("dev");
const prodDekoratør = hentDekoratørForMiljø("prod");

export const hentDekoratør = async () => {
    const servermiljø = hentServermiljø();

    if (process.env.NODE_ENV === "development" || !servermiljø) return lokalDekoratør;
    return servermiljø === "prod" ? prodDekoratør : devDekoratør;
};
