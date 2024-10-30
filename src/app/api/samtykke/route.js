import logger from "@/app/_common/utils/logger";
import { exchangeToken } from "@/app/_common/utils/tokenUtils";
import { serverConfig } from "@/app/_common/config";

export async function POST(request) {
    const token = await exchangeToken(request, serverConfig.audience.cvApi);
    const cvApiBaseUrl = serverConfig.urls.cvApi;
    const fullUrl = `${cvApiBaseUrl}/godta-hjemmel`;

    const requestHeaders = new Headers(request.headers);
    const callId = requestHeaders.get("nav-callid");
    requestHeaders.set("authorization", `Bearer ${token}`);

    logger.info(`Godtar hjemmel mot cv-api`);

    const response = await fetch(fullUrl, {
        credentials: "same-origin",
        method: "POST",
        headers: requestHeaders,
    });

    if (!response.ok) {
        logger.error(`Feil ved bekreftelse av lest hjemmel. Status code: ${response.status}. CallId: ${callId}`);
    }

    return new Response(response.body, {
        status: response.status,
    });
}
