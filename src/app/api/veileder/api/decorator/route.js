import { serverConfig } from "@/app/_common/serverConfig";
import { NextResponse } from "next/server";
import { fetchModiaContextWithObo } from "@/app/_common/utils/tokenUtils/oboProxy";

export async function GET(request) {
    const { erVeileder, urls, scope } = serverConfig;

    if (!erVeileder) return NextResponse.json({ error: "Not Found" }, { status: 404 });
    return fetchModiaContextWithObo(`${urls.modiaDekorator}/decorator/v2`, scope.modiaDekorator, request, "GET");
}
