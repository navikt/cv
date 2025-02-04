import { serverConfig } from "@/app/_common/serverConfig";
import { NextResponse } from "next/server";
import { fetchAktivBruker } from "@/app/_common/utils/veilederUtils";

export async function GET(request) {
    const { erVeileder } = serverConfig;

    if (!erVeileder) return NextResponse.json({ error: "Not Found" }, { status: 404 });

    return fetchAktivBruker(request);
}
