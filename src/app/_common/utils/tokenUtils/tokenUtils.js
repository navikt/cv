import { serverConfig } from "@/app/_common/serverConfig";
import { exchangeEntraIdToken, isEntraIdTokenValid } from "@/app/_common/utils/tokenUtils/entraIdTokenUtils";
import { exchangeIdPortenToken, isIdPortenTokenValid } from "@/app/_common/utils/tokenUtils/idPortenTokenUtils";
import metrics from "@/app/_common/observability/prometheus";
import { logger } from "@navikt/next-logger";

export const CSRF_COOKIE_NAME = "XSRF-TOKEN-ARBEIDSPLASSEN";

export async function isTokenValid(request) {
    const { erVeileder } = serverConfig;

    if (!request.headers.get("authorization")) return false;

    if (erVeileder) return isEntraIdTokenValid(request);

    return isIdPortenTokenValid(request);
}

export const exchangeToken = async (request, audience) => {
    const { erVeileder } = serverConfig;

    if (!request.headers.get("authorization")) return false;

    const stopTimer = metrics.tokenExchangeTidsbrukHistogram.startTimer();

    const oboResponse = erVeileder
        ? await exchangeEntraIdToken(request, audience)
        : await exchangeIdPortenToken(request, audience);

    stopTimer();

    if (oboResponse.ok) {
        return oboResponse.token;
    }

    logger.error(`Kunne ikke veksle inn token i path ${request.nextUrl.pathname}: ${oboResponse.error}`);
    return "";
};

export function createAuthorizationAndContentTypeHeaders(token, callId, csrf) {
    const requestHeaders = new Headers();

    requestHeaders.set("authorization", `Bearer ${token}`);
    requestHeaders.set("content-type", "application/json");
    requestHeaders.set("nav-callid", `${callId}`);

    if (csrf) {
        requestHeaders.set("cookie", `${CSRF_COOKIE_NAME}=${csrf}`);
        requestHeaders.set(`X-${CSRF_COOKIE_NAME}`, csrf);
    }

    return requestHeaders;
}
