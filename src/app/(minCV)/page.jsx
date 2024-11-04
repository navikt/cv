import MinCVPage from "@/app/(minCV)/_components/MinCVPage";
import { initInstrumentation } from "@/app/_common/observability/faro";

export default async function Page() {
    initInstrumentation();

    return <MinCVPage />;
}
