import { fetchDecoratorReact } from "@navikt/nav-dekoratoren-moduler/ssr";
import Script from "next/script";

const dekoratørProps = {
    env: "prod",
    params: {
        utilsBackground: "white",
        context: "privatperson",
        redirectToApp: true,
        redirectToUrlLogout: "/minside",
        breadcrumbs: [
            {
                title: "Min side",
                url: "/minside",
            },
            {
                title: "Din CV",
                url: "/personbruker",
            },
        ],
    },
};

export const hentDekoratør = async () => {
    const { HeadAssets, Header, Footer, Scripts } = await fetchDecoratorReact(dekoratørProps);
    return { HeadAssets: HeadAssets(), Header: Header(), Footer: Footer(), Scripts: Scripts({ loader: Script }) };
};
