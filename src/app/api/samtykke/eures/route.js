import { serverConfig } from "@/app/_common/serverConfig";
import metrics from "@/app/_common/observability/prometheus";
import { createAuthorizationAndContentTypeHeaders, exchangeToken } from "@/app/_common/utils/tokenUtils/tokenUtils";
import { headers } from "next/headers";
import { logger } from "@navikt/next-logger";

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
        logger.error(`Feil ved henting av EURES-samtykke. Status: ${response.status}`);
    }

    return new Response(response.body, {
        status: response.status,
    });
}

export async function POST(request) {
    const { urls, audience } = serverConfig;
    const token = await exchangeToken(request, audience.euresCvEksport);
    const euresCvEksportUrl = urls.euresCvEksport;
    const headerList = headers();
    const callId = headerList.get("nav-callid");
    const requestHeaders = createAuthorizationAndContentTypeHeaders(token, callId);
    const requestBody = await request.json();

    logger.info(`Oppdaterer EURES-samtykke`);

    const stopTimer = metrics.cvApiRequestTidsbrukHistorgram.startTimer({ path: euresCvEksportUrl });
    const response = await fetch(euresCvEksportUrl, {
        credentials: "same-origin",
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
    });
    stopTimer();

    if (!response.ok) {
        logger.warn(`Feil ved POST til ${euresCvEksportUrl}. Status code: ${response.status}. CallId: ${callId}`);

        return new Response(response.body, {
            status: response.status,
        });
    }

    const data = await response.json();
    return Response.json(data);
}

export async function DELETE(request) {
    const { urls, audience } = serverConfig;
    const token = await exchangeToken(request, audience.euresCvEksport);
    const euresCvEksportUrl = urls.euresCvEksport;
    const headerList = headers();
    const callId = headerList.get("nav-callid");
    const requestHeaders = createAuthorizationAndContentTypeHeaders(token, callId);

    logger.info(`Trekker EURES-samtykke`);

    const stopTimer = metrics.cvApiRequestTidsbrukHistorgram.startTimer({ path: euresCvEksportUrl });
    const response = await fetch(euresCvEksportUrl, {
        credentials: "same-origin",
        method: "DELETE",
        headers: requestHeaders,
    });
    stopTimer();

    if (!response.ok) {
        logger.error(`Feil ved trekking av EURES-samtykke`);
    }

    return new Response(response.body, {
        status: response.status,
    });
}
