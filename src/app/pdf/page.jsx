import { initInstrumentation } from "@/app/_common/observability/faro";
import { serverConfig } from "@/app/_common/serverConfig";
import Pdfside from "@/app/pdf/_components/Pdfside";
import NotFound from "@/app/not-found";

export default async function Page() {
    initInstrumentation();
    const { erVeileder } = serverConfig;

    if (!erVeileder) return <NotFound />;

    return <Pdfside erVeileder={erVeileder} />;
}
