import logger from "@/app/_common/utils/logger";
import { hentCvApiAudScope, serverConfig } from "@/app/_common/serverConfig";
import metrics from "@/app/_common/observability/prometheus";
import { exchangeToken } from "@/app/_common/utils/tokenUtils/tokenUtils";

export async function GET(request) {
    const scopeEllerAudience = hentCvApiAudScope();
    const token = await exchangeToken(request, scopeEllerAudience);

    logger.info(`Token etter exchange I DEV ALTSÅ ${token} - Brukte scope: ${scopeEllerAudience}`);

    const cvApiBaseUrl = serverConfig?.urls?.cvApi;
    const fullUrl = `${cvApiBaseUrl}/v2/person?medTesttilgang=true`;

    const requestHeaders = new Headers(request.headers);
    const callId = requestHeaders.get("nav-callid");
    requestHeaders.set("authorization", `Bearer ${token}`);
    requestHeaders.set("content-type", "application/json");

    logger.info(`Henter person fra CV`);

    const response = await hentEllerOpprettPerson(fullUrl, requestHeaders);

    if (!response.ok) {
        logger.warn(`Feil ved henting av person fra cv-api. Status code: ${response.status}. CallId: ${callId}`);

        return new Response(response.body, {
            status: response.status,
        });
    }

    const data = await response.json();

    if (data?.erUnderOppfoelging === false) {
        metrics.ikkeUnderOppfølgingCounter.inc();
    }

    return Response.json(data);
}

const hentEllerOpprettPerson = async (url, headers) => {
    const stopTimerHent = metrics.cvApiRequestTidsbrukHistorgram.startTimer({ path: url });
    const response = await fetch(url, {
        credentials: "same-origin",
        method: "GET",
        headers: headers,
    });
    stopTimerHent();

    if (response.status !== 404) return response;

    logger.info("Fant ikke person i cv-api, oppretter...");

    metrics.nyPersonCounter.inc(1);
    const stopTimerOpprett = metrics.cvApiRequestTidsbrukHistorgram.startTimer({ path: url });
    const opprettResponse = await fetch(url, {
        credentials: "same-origin",
        method: "POST",
        headers: headers,
    });
    stopTimerOpprett();
    return opprettResponse;
};
