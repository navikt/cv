import { NextResponse } from "next/server";
import { serverConfig } from "@/app/_common/serverConfig";

export async function middleware(request) {
    const isLocal = process.env.NEXT_PUBLIC_ENVIRONMENT === "localhost";
    const { erVeileder } = serverConfig;

    if (erVeileder) {
        const requestUrl = new URL(request.url);
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-path", requestUrl.pathname + requestUrl.search);
        if (requestHeaders.get("authorization") == null && !isLocal) {
            const redirectUrl = request.nextUrl.clone();
            redirectUrl.pathname = `/oauth2/login`;
            redirectUrl.searchParams.set("redirect", requestUrl.pathname);

            return NextResponse.redirect(redirectUrl);
        }

        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
    missing: [{ type: "header", key: "x-path" }],
};
