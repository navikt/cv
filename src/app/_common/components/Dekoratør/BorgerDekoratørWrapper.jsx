import { hentDekoratør } from "@/app/_common/utils/dekoratør";

export default async function BorgerDekoratørWrapper({ children, fontClassName }) {
    const { HeadAssets, Header, Footer, Scripts } = await hentDekoratør();

    return (
        <html lang="no">
            <head>
                <title>Min CV - nav.no</title>
                {HeadAssets}
            </head>
            <body className={fontClassName}>
                {Header}
                <main id="maincontent">{children}</main>
                {Footer}
                {Scripts}
            </body>
        </html>
    );
}
