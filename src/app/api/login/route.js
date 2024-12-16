import { serverConfig } from "@/app/_common/serverConfig";

export async function GET() {
    const loginUrl = serverConfig?.urls.login;
    const baseUrl = serverConfig?.urls.base;

    const loginRedirect = `${loginUrl}?redirect=${baseUrl}&level=Level3`;

    return Response.redirect(loginRedirect);
}
