import { serverConfig } from "@/app/_common/serverConfig";
import { putData } from "@/app/api/utils";
import AppMetrics from "@/app/_common/observability/prometheus";

export async function PUT(request, context) {
    const { seksjon } = context.params;
    const cvApiBaseUrl = serverConfig?.urls?.cvApi;
    const fullUrl = `${cvApiBaseUrl}/v2/cv/${seksjon}`;
    new AppMetrics().cvOppdateringCounter.inc(seksjon, 1);
    return putData(fullUrl, serverConfig?.audience?.cvApi, request);
}
