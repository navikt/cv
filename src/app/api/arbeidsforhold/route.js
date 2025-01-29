import logger from "@/app/_common/utils/logger";
import { hentCvApiAudScope, serverConfig } from "@/app/_common/serverConfig";
import metrics from "@/app/_common/observability/prometheus";
import { exchangeToken } from "@/app/_common/utils/tokenUtils/tokenUtils";
import { leggTilVeilederHeaders } from "@/app/_common/utils/veilederUtils";

export async function GET(request) {
    const token = await exchangeToken(request, hentCvApiAudScope());
    const cvApiBaseUrl = serverConfig?.urls?.cvApi;
    const fullUrl = `${cvApiBaseUrl}/aareg`;

    const requestHeaders = new Headers(request.headers);
    const callId = requestHeaders.get("nav-callid");
    requestHeaders.set("authorization", `Bearer ${token}`);
    requestHeaders.set("content-type", "application/json");

    if (serverConfig.erVeileder) {
        await leggTilVeilederHeaders(requestHeaders, request);
    }

    logger.info(`Henter arbeidsforhold fra aareg`);

    metrics.hentArbeidsforholdCounter.inc();
    const stopTimer = metrics.cvApiRequestTidsbrukHistorgram.startTimer({ path: fullUrl });
    const response = await fetch(fullUrl, {
        credentials: "same-origin",
        method: "GET",
        headers: requestHeaders,
    });
    stopTimer();

    if (!response.ok && response.status !== 404) {
        logger.warn(`Feil ved henting av arbeidsforhold fra aareg. Status code: ${response.status}. CallId: ${callId}`);

        return new Response(response.body, {
            status: response.status,
        });
    }

    const data = response.status === 404 ? [] : await response.json();
    return Response.json(data);
}
