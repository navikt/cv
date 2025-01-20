import { serverConfig } from "@/app/_common/serverConfig";
import { fetchWithObo } from "@/app/_common/utils/tokenUtils/oboProxy";
import logger from "@/app/_common/utils/logger";

export async function leggTilVeilederHeaders(headers, request) {
    const { urls, scope, erVeileder } = serverConfig;

    if (!erVeileder) return headers;

    const aktivBrukerResponse = await fetchWithObo(
        `${urls.modiaDekorator}/context/v2/aktivbruker`,
        scope.modiaDekorator,
        request,
    );

    if (!aktivBrukerResponse.ok) {
        logger.warn("Kunne ikke finne aktiv bruker");
        throw Error("Kunne ikke finne aktiv bruker");
    }

    headers.set("fnr", `${aktivBrukerResponse.aktivBruker}`);
    return headers;
}
