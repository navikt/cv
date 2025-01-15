import { serverConfig } from "@/app/_common/serverConfig";
import { logger } from "@navikt/next-logger";
import { proxyWithOBO } from "../../_common/utils/tokenUtils/oboProxy";

export async function GET(request) {
    const { erVeileder, urls, scope } = serverConfig;

    if (!erVeileder) return; // 404 response

    logger.info(
        `Er i decorator/route.js med auth-header: ${request.headers.get("authorization")}. Alle headers: ${request.headers}`,
    );

    return proxyWithOBO(`${urls.modiaDekorator}/decorator/v2`, "", scope.modiaDekorator, request);
}
