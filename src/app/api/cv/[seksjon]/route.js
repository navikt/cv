import { serverConfig } from "@/app/_common/config";
import { putData } from "@/app/api/utils";

export async function PUT(request, context) {
    const { seksjon } = context.params;
    const cvApiBaseUrl = serverConfig?.urls?.cvApi;
    const fullUrl = `${cvApiBaseUrl}/v2/cv/${seksjon}`;
    return await putData(fullUrl, serverConfig?.audience?.cvApi, request);
}
