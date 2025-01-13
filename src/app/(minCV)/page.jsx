import MinCVPage from "@/app/(minCV)/_components/MinCVPage";
import { initInstrumentation } from "@/app/_common/observability/faro";
import { serverConfig } from "@/app/_common/serverConfig";

export default async function Page() {
    initInstrumentation();
    const { erVeileder, erDemoApp } = serverConfig;
    return <MinCVPage erVeileder={erVeileder} erDemoApp={erDemoApp} />;
}
