import logger from "@/app/_common/utils/logger";
import { exchangeToken } from "@/app/_common/utils/tokenUtils";
import { serverConfig } from "@/app/_common/serverConfig";

export async function GET(request) {
    const token = await exchangeToken(request, serverConfig?.audience?.cvApi);
    const cvApiBaseUrl = serverConfig?.urls?.cvApi;
    const fullUrl = `${cvApiBaseUrl}/v2/cv`;

    const requestHeaders = new Headers(request.headers);
    const callId = requestHeaders.get("nav-callid");
    requestHeaders.set("authorization", `Bearer ${token}`);
    requestHeaders.set("content-type", "application/json");

    logger.info(`Henter CV fra cv-api`);

    const response = await fetch(fullUrl, {
        credentials: "same-origin",
        method: "GET",
        headers: requestHeaders,
    });

    if (response.status === 404) {
        logger.info(`Fant ikke eksisterende CV`);
        return Response.json({});
    }

    if (!response.ok && response.status !== 404) {
        logger.warn(`Feil ved henting av cv fra cv-api. Status code: ${response.status}. CallId: ${callId}`);

        return new Response(response.body, {
            status: response.status,
        });
    }

    const data = await response.json();
    return Response.json(data);
}
