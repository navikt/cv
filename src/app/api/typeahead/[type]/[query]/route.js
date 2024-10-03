import logger from "@/app/_common/utils/logger";

export async function GET(request, context) {
    const type = context.params.type;
    const query = context.params.query;
    const requestHeaders = new Headers(request.headers);
    const callId = requestHeaders.get("nav-callid");
    const searchParams = new URLSearchParams({ q: query });

    const typeaheadBaseUrl = process.env.PAM_ONTOLOGI_BASEURL;
    const fullUrl = `${typeaheadBaseUrl}/${type}?${searchParams}`;

    logger.info(`Henter typeahead for ${type} med query ${query}. CallId: ${callId}`);

    const response = await fetch(fullUrl, {
        credentials: "same-origin",
        method: "GET",
        headers: requestHeaders,
    });

    logger.info(
        "Dekoratør process.enver:",
        process.env.NEXT_PUBLIC_ENV_DEKORATOR,
        process.env.NEXT_PUBLIC_NAV_MIN_SIDE_URL,
    );
    console.log(
        "Dekoratør process.enver:",
        process.env.NEXT_PUBLIC_ENV_DEKORATOR,
        process.env.NEXT_PUBLIC_NAV_MIN_SIDE_URL,
    );

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
