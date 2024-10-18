import logger from "@/app/_common/utils/logger";
import { exchangeToken } from "@/app/_common/utils/tokenUtils";
import { cvConfig } from "@/app/_common/config";

export async function GET(request) {
    const token = await exchangeToken(request, cvConfig.audience.cvApi);
    const cvApiBaseUrl = cvConfig.urls.cvApi;
    const fullUrl = `${cvApiBaseUrl}/aareg`;

    const requestHeaders = new Headers(request.headers);
    const callId = requestHeaders.get("nav-callid");
    requestHeaders.set("authorization", `Bearer ${token}`);
    requestHeaders.set("content-type", "application/json");

    logger.info(`Henter arbeidsforhold fra aareg`);

    const response = await fetch(fullUrl, {
        credentials: "same-origin",
        method: "GET",
        headers: requestHeaders,
    });

    if (!response.ok) {
        logger.warn(`Feil ved henting av arbeidsforhold fra aareg. Status code: ${response.status}. CallId: ${callId}`);

        return new Response(response.body, {
            status: response.status,
        });
    }

    const data = await response.json();
    return Response.json(data);
}
