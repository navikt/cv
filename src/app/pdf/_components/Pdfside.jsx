"use client";

import ApplicationProvider from "@/app/_common/contexts/ApplicationContext";
import { PdfNedlasting } from "@/app/pdf/_components/PdfNedlasting";
import initLogger from "@/app/_common/utils/logger";

initLogger();

export default function Pdfside({ erVeileder }) {
    return (
        <ApplicationProvider erVeileder={erVeileder} erPdf>
            <PdfNedlasting />
        </ApplicationProvider>
    );
}
