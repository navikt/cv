import { headers } from "next/headers";
import { createAuthorizationAndContentTypeHeaders, exchangeToken } from "@/app/_common/utils/tokenUtils";
import { serverConfig } from "@/app/_common/config";
import logger from "@/app/_common/utils/logger";

export const putData = async (url, audience, request) => {
    const headerList = headers();
    const callId = headerList.get("nav-callid");

    const token = await exchangeToken(request, serverConfig.audience.cvApi);
    const requestHeaders = createAuthorizationAndContentTypeHeaders(token, callId);
    const requestBody = await request.json();

    logger.info(`Gjør PUT til ${url} med callId ${callId}`);

    const response = await fetch(url, {
        credentials: "same-origin",
        method: "PUT",
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        logger.warn(`Feil ved PUT til ${url}. Status code: ${response.status}. CallId: ${callId}`);

        return new Response(response.body, {
            status: response.status,
        });
    }

    const data = await response.json();
    return Response.json(data);
};
