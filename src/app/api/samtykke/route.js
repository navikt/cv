import logger from "@/app/_common/utils/logger";
import { hentCvApiAudScope, serverConfig } from "@/app/_common/serverConfig";
import metrics from "@/app/_common/observability/prometheus";
import { exchangeToken } from "@/app/_common/utils/tokenUtils/tokenUtils";
import { leggTilVeilederHeaders } from "@/app/_common/utils/veilederUtils";

export async function POST(request) {
    const { erVeileder } = serverConfig;
    const token = await exchangeToken(request, hentCvApiAudScope());
    const cvApiBaseUrl = serverConfig?.urls?.cvApi;

    const path = erVeileder ? "v2/samtykke" : "godta-hjemmel";

    const fullUrl = `${cvApiBaseUrl}/${path}`;

    const requestHeaders = new Headers(request.headers);
    const callId = requestHeaders.get("nav-callid");
    requestHeaders.set("authorization", `Bearer ${token}`);

    if (serverConfig.erVeileder) {
        await leggTilVeilederHeaders(requestHeaders, request);
    }

    logger.info(`Godtar hjemmel mot cv-api`);

    metrics.hjemmelGodtatCounter.inc();
    const stopTimer = metrics.cvApiRequestTidsbrukHistorgram.startTimer({ path: fullUrl });
    const response = await fetch(fullUrl, {
        credentials: "same-origin",
        method: "POST",
        headers: requestHeaders,
    });
    stopTimer();

    if (!response.ok) {
        logger.error(`Feil ved bekreftelse av lest hjemmel. Status code: ${response.status}. CallId: ${callId}`);
    }

    return new Response(response.body, {
        status: response.status,
    });
}
