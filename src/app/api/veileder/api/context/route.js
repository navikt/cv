import { serverConfig } from "@/app/_common/serverConfig";
import { NextResponse } from "next/server";
import { fetchModiaContextWithObo } from "@/app/_common/utils/tokenUtils/oboProxy";

export async function POST(request) {
    const { erVeileder, urls, scope } = serverConfig;
    if (!erVeileder) return NextResponse.json({ error: "Not Found" }, { status: 404 });
    return fetchModiaContextWithObo(`${urls.modiaDekorator}/context`, scope.modiaDekorator, request, "POST");
}
