import { DownloadIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { useState } from "react";
import { lastNedCvPdf } from "@/app/_common/utils/lastNedCvPdf";
import { usePerson } from "@/app/_common/hooks/swr/usePerson";
import { useCv } from "@/app/_common/hooks/swr/useCv";

export const LastNedCv = ({ disabled = false }) => {
    const { person } = usePerson();
    const { personalia } = person || {};
    const { cv, cvLaster } = useCv();

    const [nedlastingLaster, setNedlastingLaster] = useState(false);

    const lastNedCv = () => {
        if (!personalia || !cv) return;
        setNedlastingLaster(true);
        lastNedCvPdf(cv, personalia);
        setNedlastingLaster(false);
    };

    return (
        <Button
            icon={<DownloadIcon aria-hidden />}
            onClick={() => lastNedCv()}
            loading={nedlastingLaster}
            variant="secondary"
            disabled={disabled}
        >
            Last ned CV
        </Button>
    );
};
