// eslint-disable-next-line camelcase
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import "./page.module.css";
import { serverConfig } from "@/app/_common/serverConfig";
import BorgerDekoratørWrapper from "@/app/_common/components/Dekoratør/BorgerDekoratørWrapper";
import VeilederDekoratørWrapper from "@/app/_common/components/Dekoratør/VeilederDekoratørWrapper";
import { DemoDekoratørWrapper } from "@/app/_common/components/Dekoratør/DemoDekoratørWrapper";

export const dynamic = "force-dynamic";
const sourceSansPro = Source_Sans_3({ subsets: ["latin"], adjustFontFallback: false });

async function RootLayout({ children }) {
    const { erVeileder, erDemoApp } = serverConfig;

    if (erVeileder === true)
        return <VeilederDekoratørWrapper fontClassName={sourceSansPro.className}>{children}</VeilederDekoratørWrapper>;

    if (erDemoApp)
        return <DemoDekoratørWrapper fontClassName={sourceSansPro.className}>{children}</DemoDekoratørWrapper>;

    return <BorgerDekoratørWrapper fontClassName={sourceSansPro.className}>{children}</BorgerDekoratørWrapper>;
}

export default RootLayout;
