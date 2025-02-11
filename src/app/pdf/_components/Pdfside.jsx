"use client";

import ApplicationProvider from "@/app/_common/contexts/ApplicationContext";
import { PdfNedlasting } from "@/app/pdf/_components/PdfNedlasting";

export default function Pdfside({ erVeileder }) {
    return (
        <ApplicationProvider erVeileder={erVeileder}>
            <PdfNedlasting />
        </ApplicationProvider>
    );
}
