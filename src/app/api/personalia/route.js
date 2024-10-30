import { serverConfig } from "@/app/_common/config";
import { putData } from "@/app/api/utils";

export async function PUT(request) {
    const cvApiBaseUrl = serverConfig.urls.cvApi;
    const fullUrl = `${cvApiBaseUrl}/v2/personalia`;
    return await putData(fullUrl, serverConfig.audience.cvApi, request);
}
