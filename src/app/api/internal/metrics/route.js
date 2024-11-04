import { register } from "prom-client";

export const dynamic = "force-dynamic";

export async function GET() {
    const metrics = await register.metrics();
    return new Response(metrics, {
        headers: {
            "Content-type": register.contentType,
        },
    });
}
