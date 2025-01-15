import { serverConfig } from "@/app/_common/serverConfig";
import { exchangeEntraIdToken, isEntraIdTokenValid } from "@/app/_common/utils/tokenUtils/entraIdTokenUtils";
import { exchangeIdPortenToken, isIdPortenTokenValid } from "@/app/_common/utils/tokenUtils/idPortenTokenUtils";
import logger from "@/app/_common/utils/logger";

export const CSRF_COOKIE_NAME = "XSRF-TOKEN-ARBEIDSPLASSEN";

export async function isTokenValid(req) {
    const { erVeileder } = serverConfig;

    if (erVeileder) return isEntraIdTokenValid(req);

    return isIdPortenTokenValid(req);
}

export const exchangeToken = async (request, audience) => {
    const { erVeileder } = serverConfig;

    const oboResponse = erVeileder
        ? await exchangeEntraIdToken(request, audience)
        : await exchangeIdPortenToken(request, audience);

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
