import { cvConfig } from "@/app/_common/config";
import { putData } from "@/app/api/utils";

export async function PUT(request) {
    const cvApiBaseUrl = cvConfig.urls.cvApi;
    const fullUrl = `${cvApiBaseUrl}/v2/personalia`;
    return await putData(fullUrl, cvConfig.audience.cvApi, request);
}
