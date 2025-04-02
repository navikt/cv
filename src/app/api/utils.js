import { headers } from "next/headers";
import { hentCvApiAudScope, serverConfig } from "@/app/_common/serverConfig";
import metrics from "@/app/_common/observability/prometheus";
import { createAuthorizationAndContentTypeHeaders, exchangeToken } from "@/app/_common/utils/tokenUtils/tokenUtils";
import { leggTilVeilederHeaders } from "@/app/_common/utils/veilederUtils";
import { logger } from "@navikt/next-logger";

export const putData = async (url, audience, request) => {
    const headerList = await headers();
    const callId = headerList.get("nav-callid");

    const token = await exchangeToken(request, hentCvApiAudScope());
    const requestHeaders = createAuthorizationAndContentTypeHeaders(token, callId);

    if (serverConfig.erVeileder) {
        await leggTilVeilederHeaders(requestHeaders, request);
    }

    const requestBody = await request.json();

    logger.info(`Gjør PUT til ${url} med callId ${callId}`);

    const stopTimer = metrics.cvApiRequestTidsbrukHistorgram.startTimer({ path: url });
    const response = await fetch(url, {
        credentials: "same-origin",
        method: "PUT",
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
    });
    stopTimer();

    if (!response.ok) {
        logger.warn(`Feil ved PUT til ${url}. Status code: ${response.status}. CallId: ${callId}`);

        return new Response(response.body, {
            status: response.status,
        });
    }

    const data = await response.json();
    return Response.json(data);
};

export const filterOutAuthorizationHeader = (originalHeaders) => {
    const requestHeaders = new Headers(originalHeaders);
    requestHeaders.delete("Authorization");
    return requestHeaders;
};

export const filterOutAmplitudeCookiesFromHeaders = (originalHeaders) => {
    const requestHeaders = new Headers(originalHeaders);
    const cookie = requestHeaders.get("cookie");
    if (cookie) {
        const filteredCookies = cookie
            .split(";")
            .filter((c) => !c.trim().startsWith("AMP_"))
            .join(";");
        if (filteredCookies) {
            requestHeaders.set("cookie", filteredCookies);
        } else {
            requestHeaders.delete("cookie");
        }
    }

    return requestHeaders;
};
