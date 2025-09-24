import { MockWrapper } from "@/app/_common/components/MockWrapper";
import Skyra from "@/app/_common/components/Dekoratør/Skyra";

export function DemoDekoratørWrapper({ fontClassName, children }) {
    return (
        <html lang="no">
            <head>
                <title>Min CV - Demo</title>
                <Skyra />
            </head>
            <body className={fontClassName}>
                <main id="maincontent">
                    <MockWrapper>{children}</MockWrapper>
                </main>
            </body>
        </html>
    );
}
