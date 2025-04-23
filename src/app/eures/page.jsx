import EuresPage from "@/app/eures/components/EuresPage";
import { serverConfig } from "@/app/_common/serverConfig";
import NotFound from "@/app/not-found";

export default async function Page() {
    const { erVeileder, erDemoApp } = serverConfig;
    if (erVeileder) return <NotFound />;

    return <EuresPage erDemoApp={erDemoApp} />;
}
