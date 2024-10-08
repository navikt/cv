import logger from "@/app/_common/utils/logger";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";
import { cvConfig } from "@/app/_common/config";

export async function GET(request) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.append("Accept", "application/json");
    const callId = requestHeaders.get("nav-callid");

    const typeaheadBaseUrl = cvConfig.urls.cvApi;
    const fullUrl = `${typeaheadBaseUrl}/koder/sprak`;

    logger.info(`Henter alternativer for språk fra cv-api. CallId: ${callId}`);

    const response = await fetch(fullUrl, {
        credentials: "same-origin",
        method: "GET",
        headers: requestHeaders,
    });

    if (!response.ok) {
        logger.warn(`Feil ved henting av typeahead språk. Status code: ${response.status}. CallId: ${callId}`);

        return new Response(response.body, {
            status: response.status,
        });
    }

    const data = await response.json();
    return Response.json(data);
}
