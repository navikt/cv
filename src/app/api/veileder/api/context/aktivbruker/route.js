import { serverConfig } from "@/app/_common/serverConfig";
import { NextResponse } from "next/server";
import { fetchModiaContextWithObo } from "@/app/_common/utils/tokenUtils/oboProxy";

export async function DELETE(request) {
    const { erVeileder, scope, urls } = serverConfig;

    if (!erVeileder) return NextResponse.json({ error: "Not Found" }, { status: 404 });

    return fetchModiaContextWithObo(
        `${urls.modiaDekorator}/context/aktivbruker`,
        scope.modiaDekorator,
        request,
        "DELETE",
    );
}
