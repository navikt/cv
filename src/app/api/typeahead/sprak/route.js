import logger from "@/app/_common/utils/logger";
import { serverConfig } from "@/app/_common/serverConfig";
import metrics from "@/app/_common/observability/prometheus";

export async function GET(request) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.append("Accept", "application/json");
    const callId = requestHeaders.get("nav-callid");

    const typeaheadBaseUrl = serverConfig?.urls?.cvApi;
    const fullUrl = `${typeaheadBaseUrl}/koder/sprak`;

    logger.info(`Henter alternativer for språk fra cv-api. CallId: ${callId}`);

    const stopTimer = metrics.cvApiRequestTidsbrukHistorgram.startTimer({ path: fullUrl });
    const response = await fetch(fullUrl, {
        credentials: "same-origin",
        method: "GET",
        headers: requestHeaders,
    });
    stopTimer();

    if (!response.ok) {
        logger.warn(`Feil ved henting av typeahead språk. Status code: ${response.status}. CallId: ${callId}`);

        return new Response(response.body, {
            status: response.status,
        });
    }

    const data = await response.json();
    return Response.json(data);
}
