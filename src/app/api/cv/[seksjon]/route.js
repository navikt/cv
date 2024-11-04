import { serverConfig } from "@/app/_common/serverConfig";
import { putData } from "@/app/api/utils";

export async function PUT(request, context) {
    const { seksjon } = context.params;
    const cvApiBaseUrl = serverConfig?.urls?.cvApi;
    const fullUrl = `${cvApiBaseUrl}/v2/cv/${seksjon}`;
    const response = await putData(fullUrl, serverConfig?.audience?.cvApi, request);
    return response;
}
