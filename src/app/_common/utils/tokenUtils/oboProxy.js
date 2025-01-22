// eslint-disable-next-line import/no-extraneous-dependencies
import { getToken } from "@navikt/oasis";
import { NextResponse } from "next/server";
import { logger } from "@navikt/next-logger";
import { exchangeToken } from "@/app/_common/utils/tokenUtils/tokenUtils";

export const fetchModiaContextWithObo = async (url, scope, req, method = "GET") => {
    const isLocal = process.env.NEXT_PUBLIC_ENVIRONMENT === "localhost";

    if (!url) {
        return NextResponse.json({ beskrivelse: "Ingen url oppgitt for proxy" }, { status: 500 });
    }

    if (!isLocal && !getToken(req)) {
        logger.warn("Kunne ikke hente token");
        return NextResponse.json({ beskrivelse: "Kunne ikke hente token" }, { status: 500 });
    }

    let oboToken;

    try {
        oboToken = isLocal ? { ok: true, token: "DEV" } : await exchangeToken(req, scope);
    } catch (error) {
        logger.error(`Feil ved henting av OBO-token: ${error}`);
        return NextResponse.json({ beskrivelse: "Kunne ikke hente OBO-token" }, { status: 500 });
    }

    if (!oboToken) {
        logger.error(`Ugyldig OBO-token mottatt`);
        return NextResponse.json({ beskrivelse: "Ugyldig OBO-token mottatt" }, { status: 500 });
    }

    try {
        const originalHeaders = new Headers(req.headers);
        originalHeaders.set("Authorization", `Bearer ${oboToken}`);
        originalHeaders.set("Content-Type", "application/json");

        // Filter out AMP_ cookies
        const cookie = originalHeaders.get("cookie");
        if (cookie) {
            const filteredCookies = cookie
                .split(";")
                .filter((c) => !c.trim().startsWith("AMP_"))
                .join(";");
            if (filteredCookies) {
                originalHeaders.set("cookie", filteredCookies);
            } else {
                originalHeaders.delete("cookie");
            }
        }

        const fetchOptions = {
            method: method,
            headers: originalHeaders,
        };

        if (method === "POST" || method === "PUT") {
            try {
                const body = await new Response(req.body).json();
                if (body) {
                    fetchOptions.body = JSON.stringify(body);
                }
            } catch (error) {
                logger.error("Failed to parse request body as JSON:", error);
                return NextResponse.json({ beskrivelse: "Invalid JSON in request body" }, { status: 400 });
            }
        }

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            const { status, statusText, url: urlFraResponse, body, ok, headers } = response;

            logger.error(
                {
                    headers,
                    status,
                    statusText,
                    url,
                    urlFraResponse,
                    body,
                    ok,
                },
                "Responsen er ikke OK i proxy",
            );
        }

        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
            const data = await response.json();
            return NextResponse.json(data);
        }
        // Handle non-JSON responses (empty body, text, etc.)
        const text = await response.text();
        return new NextResponse(text || "", {
            status: response.status,
            headers: {
                "Content-Type": contentType || "text/plain",
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            logger.error(error, `Feil ved fetch med obo til url: ${url}`);
        } else {
            logger.error({ msg: "Unknown error", error }, `Feil ved fetch med obo til url: ${url}`);
        }
        return NextResponse.json({ beskrivelse: error.message || "Feil i proxy" }, { status: error.status || 500 });
    }
};
