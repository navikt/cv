import { hentCvApiAudScope, serverConfig } from "@/app/_common/serverConfig";
import { putData } from "@/app/api/utils";
import metrics from "@/app/_common/observability/prometheus";

export async function PUT(request, context) {
    const { seksjon } = context.params;
    const cvApiBaseUrl = serverConfig?.urls?.cvApi;
    const fullUrl = `${cvApiBaseUrl}/v2/cv/${seksjon}`;
    metrics.cvOppdateringCounter.inc({ seksjon: seksjon });
    return putData(fullUrl, hentCvApiAudScope(), request);
}
