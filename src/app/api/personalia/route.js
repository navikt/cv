import { serverConfig } from "@/app/_common/serverConfig";
import { putData } from "@/app/api/utils";
import metrics from "@/app/_common/observability/prometheus";

export async function PUT(request) {
    const cvApiBaseUrl = serverConfig?.urls?.cvApi;
    const fullUrl = `${cvApiBaseUrl}/v2/personalia`;
    metrics.cvOppdateringCounter.inc({ personalia: 1 });
    return putData(fullUrl, serverConfig?.audience?.cvApi, request);
}
