import logger from "@/app/_common/utils/logger";
import { exchangeToken } from "@/app/_common/utils/tokenUtils";
import { cvConfig } from "@/app/_common/config";

export async function GET(request) {
    const token = await exchangeToken(request, cvConfig.audience.euresCvEksport);
    const euresCvEksportUrl = cvConfig.urls.euresCvEksport;

    const requestHeaders = new Headers(request.headers);
    const callId = requestHeaders.get("nav-callid");
    requestHeaders.set("authorization", `Bearer ${token}`);
    requestHeaders.set("nav-callid", `${callId}`);

    logger.info(`Henter EURES-samtykke`);

    const response = await fetch(euresCvEksportUrl, {
        credentials: "same-origin",
        method: "GET",
        headers: requestHeaders,
    });

    if (!response.ok && response.status !== 404) {
        logger.error(`Feil ved henting av EURES-samtykke`);
    }

    return new Response(response.body, {
        status: response.status,
    });
}
