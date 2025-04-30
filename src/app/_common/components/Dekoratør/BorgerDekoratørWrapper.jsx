import { hentDekoratør } from "@/app/_common/utils/dekoratør";
import { MockWrapper } from "@/app/_common/components/MockWrapper";

export default async function BorgerDekoratørWrapper({ children, fontClassName }) {
    const { HeadAssets, Header, Footer, Scripts } = await hentDekoratør();

    const erLocalhost = process.env.NODE_ENV === "development";

    const content = erLocalhost ? <MockWrapper>{children}</MockWrapper> : children;

    return (
        <html lang="no">
            <head>
                <title>Min CV - nav.no</title>
                {HeadAssets}
            </head>
            <body className={fontClassName}>
                {Header}
                <main id="maincontent">{content}</main>
                {Footer}
                {Scripts}
            </body>
        </html>
    );
}
