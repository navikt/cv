import logger from "@/app/_common/utils/logger";
import { serverConfig } from "@/app/_common/serverConfig";
import metrics from "@/app/_common/observability/prometheus";
import { exchangeToken } from "@/app/_common/utils/tokenUtils/tokenUtils";

export async function GET(request) {
    const token = await exchangeToken(request, serverConfig?.audience?.euresCvEksport);
    const euresCvEksportUrl = serverConfig?.urls?.euresCvEksport;

    const requestHeaders = new Headers(request.headers);
    const callId = requestHeaders.get("nav-callid");
    requestHeaders.set("authorization", `Bearer ${token}`);
    requestHeaders.set("nav-callid", `${callId}`);

    logger.info(`Henter EURES-samtykke`);

    const stopTimer = metrics.cvApiRequestTidsbrukHistorgram.startTimer({ path: euresCvEksportUrl });
    const response = await fetch(euresCvEksportUrl, {
        credentials: "same-origin",
        method: "GET",
        headers: requestHeaders,
    });
    stopTimer();

    if (!response.ok && response.status !== 404) {
        logger.error(`Feil ved henting av EURES-samtykke`);
    }

    return new Response(response.body, {
        status: response.status,
    });
}
