import EuresPage from "@/app/eures/components/EuresPage";
import { serverConfig } from "@/app/_common/serverConfig";
import NotFound from "@/app/not-found";

export default async function Page() {
    if (serverConfig.erVeileder) return <NotFound />;

    return <EuresPage />;
}
