import { serverConfig } from "@/app/_common/serverConfig";
import { fetchModiaContextWithObo } from "@/app/_common/utils/tokenUtils/oboProxy";
import logger from "@/app/_common/utils/logger";

export async function leggTilVeilederHeaders(headers, request) {
    const { erVeileder, nodeEnv } = serverConfig;

    if (!erVeileder) return headers;

    if (nodeEnv === "development") {
        headers.set("fnr", "04010100653");
        return headers;
    }

    const aktivBrukerResponse = await fetchAktivBruker(request);

    if (!aktivBrukerResponse.ok) {
        logger.warn("Kunne ikke finne aktiv bruker");
        throw Error("Kunne ikke finne aktiv bruker");
    }

    const aktivBrukerResponseBody = await aktivBrukerResponse.json();

    headers.set("fnr", `${aktivBrukerResponseBody.aktivBruker}`);
    return headers;
}

export const fetchAktivBruker = async (request) => {
    const { urls, scope } = serverConfig;

    return fetchModiaContextWithObo(
        `${urls.modiaDekorator}/context/v2/aktivbruker`,
        scope.modiaDekorator,
        request,
        "GET",
    );
};
