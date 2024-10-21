import { DownloadIcon } from "@navikt/aksel-icons";
import { Button } from "@navikt/ds-react";
import { useContext, useState } from "react";
import { PersonContext } from "@/app/_common/contexts/PersonContext";
import { CvContext } from "@/app/_common/contexts/CvContext";
import { lastNedCvPdf } from "@/app/_common/utils/lastNedCvPdf";
import { isFetched } from "@/app/_common/utils/fetchUtils";

export const LastNedCv = () => {
    const { person } = useContext(PersonContext);
    const { cv } = useContext(CvContext);

    const [nedlastingLaster, setNedlastingLaster] = useState(false);

    const lastNedCv = () => {
        if (!isFetched(person) || !isFetched(cv)) return;
        setNedlastingLaster(true);
        lastNedCvPdf(cv.data, person.data.personalia);
        setNedlastingLaster(false);
    };

    return (
        <Button
            icon={<DownloadIcon aria-hidden />}
            onClick={() => lastNedCv()}
            loading={nedlastingLaster}
            variant="secondary"
        >
            Last ned CV
        </Button>
    );
};
