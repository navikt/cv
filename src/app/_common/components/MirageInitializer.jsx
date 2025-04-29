"use client";

import { useEffect, useState } from "react";
import { Loader } from "@navikt/ds-react";
import { makeLocalhostServer } from "../../../../mocks/mirage";
import { makeDemoServer } from "../../../../mocks/mirageDemo";

let mirageServer = null;

export function MirageInitializer({ erDemoApp, erLocalHost, children }) {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        if (!mirageServer) {
            try {
                if (erDemoApp) {
                    mirageServer = makeDemoServer();
                } else if (erLocalHost) {
                    mirageServer = makeLocalhostServer();
                }
            } catch (error) {
                console.error("klarte ikke å starte Mirage server:", error);
            }
        }

        setIsInitialized(true);

        return () => {
            if (typeof window !== "undefined") {
                window.addEventListener("beforeunload", () => {
                    if (mirageServer) {
                        console.log("Stopper Mirage...");
                        mirageServer.shutdown();
                        mirageServer = null;
                    }
                });
            }
        };
    }, []);

    if (!isInitialized) {
        return <Loader />;
    }

    return children;
}
