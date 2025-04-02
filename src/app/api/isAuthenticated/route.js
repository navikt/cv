import { headers } from "next/headers";
import { isTokenValid } from "@/app/_common/utils/tokenUtils/tokenUtils";
import { logger } from "@navikt/next-logger";

export async function GET(request) {
    const bearerToken = (await headers()).get("authorization");
    if (bearerToken) {
        try {
            const validToken = await isTokenValid(request);
            if (validToken) {
                return new Response("OK", {
                    status: 200,
                });
            }
            return new Response("Unauthorized", {
                status: 401,
            });
        } catch (e) {
            logger.error(`Token kunne ikke valideres: ${e.message}`);
            return new Response(e.message, {
                status: 500,
            });
        }
    } else {
        return new Response("No token found", {
            status: 401,
        });
    }
}
