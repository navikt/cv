import logger from "@/app/_common/utils/logger";
import { serverConfig } from "@/app/_common/config";

export async function GET(request, context) {
    const { type } = context.params;
    const { query } = context.params;
    const requestHeaders = new Headers(request.headers);
    const callId = requestHeaders.get("nav-callid");
    const searchParams = new URLSearchParams({ q: query });

    const typeaheadBaseUrl = serverConfig?.urls?.pamOntologi;
    const fullUrl = `${typeaheadBaseUrl}/${type}?${searchParams}`;

    logger.info(`Henter typeahead for ${type} med query ${query}. CallId: ${callId}`);

    const response = await fetch(fullUrl, {
        credentials: "same-origin",
        method: "GET",
        headers: requestHeaders,
    });

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
