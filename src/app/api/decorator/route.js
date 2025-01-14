import { serverConfig } from "@/app/_common/serverConfig";
import { proxyWithOBO } from "../../_common/utils/oboProxy";

export async function GET(request) {
    const { erVeileder, urls, scope } = serverConfig;

    if (!erVeileder) return; // 404 response

    return proxyWithOBO(urls.modiaDekorator, "", scope.modiaDekorator, request);
}
