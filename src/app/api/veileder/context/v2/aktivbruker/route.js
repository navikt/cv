import { serverConfig } from "@/app/_common/serverConfig";
import { logger } from "@navikt/next-logger";
import { NextResponse } from "next/server";
import { fetchWithObo } from "@/app/_common/utils/tokenUtils/oboProxy";

export async function GET(request) {
    const { erVeileder, urls, scope } = serverConfig;

    if (!erVeileder) return NextResponse.json({ error: "Not Found" }, { status: 404 });

    logger.info(
        `Er i context/v2/aktivbruker/route.js med auth-header: ${request.headers.get("authorization")}. Alle headers: ${request.headers}`,
    );

    return fetchWithObo(`${urls.modiaDekorator}/context/v2/aktivbruker`, scope.modiaDekorator, request);
}
