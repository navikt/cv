import { serverConfig } from "@/app/_common/serverConfig";
import { logger } from "@navikt/next-logger";
import { NextResponse } from "next/server";
import { fetchWithObo } from "../../../_common/utils/tokenUtils/oboProxy";

export async function GET(request) {
    const { erVeileder, urls, scope } = serverConfig;

    if (!erVeileder) return NextResponse.json({ error: "Not Found" }, { status: 404 });

    logger.info(
        `Er i decorator/route.js med auth-header: ${request.headers.get("authorization")}. Alle headers: ${request.headers}`,
    );

    return fetchWithObo(`${urls.modiaDekorator}/decorator/v2`, scope.modiaDekorator, request);
}
