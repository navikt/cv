import MinCVPage from "@/app/(minCV)/_components/MinCVPage";
import { initInstrumentation } from "@/app/_common/observability/faro";
import { serverConfig } from "@/app/_common/serverConfig";
import logger from "@/app/_common/utils/logger";

export default async function Page() {
    initInstrumentation();
    const { erVeileder } = serverConfig;
    logger.info(`Er veileder i page: ${erVeileder}`);
    return <MinCVPage erVeileder={erVeileder} />;
}
