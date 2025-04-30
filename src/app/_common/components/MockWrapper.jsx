import { MirageInitializer } from "@/app/_common/components/MirageInitializer";

export function MockWrapper({ children }) {
    const erDemoApp = process.env.ER_DEMO_APP === "true";
    const erLocalhost = process.env.NODE_ENV === "development";

    if (erDemoApp || erLocalhost) {
        return (
            <MirageInitializer erDemoApp={erDemoApp} erLocalHost={erLocalhost}>
                {children}
            </MirageInitializer>
        );
    }

    return children;
}
