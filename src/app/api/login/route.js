import { serverConfig } from "@/app/_common/serverConfig";

export async function GET() {
    const loginUrl = serverConfig?.urls.login || "https://login.nav.no/oauth2/login";
    const baseUrl = serverConfig?.urls.base || "https://www.nav.no/min-cv";

    const loginRedirect = `${loginUrl}?redirect=${baseUrl}&level=Level3`;

    return Response.redirect(loginRedirect);
}
