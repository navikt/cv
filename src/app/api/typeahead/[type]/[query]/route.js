import { serverConfig } from "@/app/_common/serverConfig";
import metrics from "@/app/_common/observability/prometheus";
import { filterOutAuthorizationHeader } from "@/app/api/utils";
import { logger } from "@navikt/next-logger";

export async function GET(request, context) {
    const { type, query } = await context.params;
    const originalHeaders = new Headers(request.headers);
    const requestHeaders = filterOutAuthorizationHeader(originalHeaders);
    const callId = requestHeaders.get("nav-callid");
    const searchParams = new URLSearchParams({ q: query });

    const typeaheadBaseUrl = serverConfig?.urls?.pamOntologi;
    const fullUrl = `${typeaheadBaseUrl}/${type}?${searchParams}`;

    logger.info(`Henter typeahead for ${type} med query ${query}. CallId: ${callId}`);

    const stopTimer = metrics.cvApiRequestTidsbrukHistorgram.startTimer({
        path: `${typeaheadBaseUrl}/${type}`,
    });

    const response = await fetch(fullUrl, {
        credentials: "same-origin",
        method: "GET",
        headers: requestHeaders,
    });
    stopTimer();

    if (!response.ok) {
        logger.warn(
            `Feil ved henting av typeahead ${type} med query ${query}. Status code: ${response.status}. CallId: ${callId}`,
        );

        return new Response(response.body, {
            status: response.status,
        });
    }

    const data = await response.json();
    return Response.json(data);
}
