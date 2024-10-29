import { cvConfig } from "@/app/_common/config";
import { putData } from "@/app/api/utils";

export async function PUT(request, context) {
    const { seksjon } = context.params;
    const cvApiBaseUrl = cvConfig.urls.cvApi;
    const fullUrl = `${cvApiBaseUrl}/v2/cv/${seksjon}`;
    return await putData(fullUrl, cvConfig.audience.cvApi, request);
}
