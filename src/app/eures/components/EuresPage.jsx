"use client";

import "@navikt/ds-css";
import ApplicationProvider from "@/app/_common/contexts/ApplicationContext";
import Eures from "@/app/eures/components/Eures";

export default function EuresPage() {
    return (
        <ApplicationProvider>
            <Eures />
        </ApplicationProvider>
    );
}
