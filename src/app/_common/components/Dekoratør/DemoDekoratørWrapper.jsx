import { MockWrapper } from "@/app/_common/components/MockWrapper";

export function DemoDekoratørWrapper({ fontClassName, children }) {
    return (
        <html lang="no">
            <head>
                <title>Min CV - Demo</title>
            </head>
            <body className={fontClassName}>
                <main id="maincontent">
                    <MockWrapper>{children}</MockWrapper>
                </main>
            </body>
        </html>
    );
}
