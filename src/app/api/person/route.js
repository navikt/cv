import logger from "@/app/_common/utils/logger";
import { exchangeToken } from "@/app/_common/utils/tokenUtils";
import { serverConfig } from "@/app/_common/config";

export async function GET(request) {
    const token = await exchangeToken(request, serverConfig?.audience?.cvApi);
    const cvApiBaseUrl = serverConfig?.urls?.cvApi;
    const fullUrl = `${cvApiBaseUrl}/v2/person`;

    const requestHeaders = new Headers(request.headers);
    const callId = requestHeaders.get("nav-callid");
    requestHeaders.set("authorization", `Bearer ${token}`);
    requestHeaders.set("content-type", "application/json");

    logger.info(`Henter person fra CV`);

    const response = await hentEllerOpprettPerson(fullUrl, requestHeaders);

    if (!response.ok) {
        logger.warn(`Feil ved henting av person fra cv-api. Status code: ${response.status}. CallId: ${callId}`);

        return new Response(response.body, {
            status: response.status,
        });
    }

    const data = await response.json();
    return Response.json(data);
}

const hentEllerOpprettPerson = async (url, headers) => {
    const response = await fetch(url, {
        credentials: "same-origin",
        method: "GET",
        headers: headers,
    });

    if (response.status !== 404) return response;

    logger.info("Fant ikke person i cv-api, oppretter...");

    return await fetch(url, {
        credentials: "same-origin",
        method: "POST",
        headers: headers,
    });
};
