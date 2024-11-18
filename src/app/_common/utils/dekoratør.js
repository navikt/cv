import { fetchDecoratorReact } from "@navikt/nav-dekoratoren-moduler/ssr";
import Script from "next/script";

const dekoratørProps = {
    env: "dev",
    params: {
        utilsBackground: "white",
        context: "privatperson",
        redirectToApp: true,
        breadcrumbs: [
            {
                title: "Min side",
                url: "/minside",
            },
            {
                title: "Min CV",
                url: "/min-cv",
            },
        ],
    },
};

export const hentDekoratør = async () => {
    const { HeadAssets, Header, Footer, Scripts } = await fetchDecoratorReact(dekoratørProps);
    return { HeadAssets: HeadAssets(), Header: Header(), Footer: Footer(), Scripts: Scripts({ loader: Script }) };
};
