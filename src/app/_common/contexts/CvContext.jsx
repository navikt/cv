import { useEffect, useState } from "react";
import React from "react";
import { getJsonRequest, putJsonRequest } from "@/app/_common/utils/fetchUtils";
import { StatusEnums } from "@/app/_common/enums/fetchEnums";
import { useErInnlogget } from "@/app/_common/hooks/swr/useErInnlogget";

const initialData = { fetchStatus: StatusEnums.INITIAL, data: null, updateStatus: StatusEnums.INITIAL };
export const CvContext = React.createContext({ cv: initialData });

const CvProvider = ({ children }) => {
    const { erInnlogget } = useErInnlogget();
    const [cv, setCv] = useState(initialData);

    const oppdaterCvSeksjon = async (data, seksjon) => {
        const cvDto = { [seksjon]: data };
        await putJsonRequest(setCv, `/personbruker/api/cv/${seksjon}`, cvDto);
    };

    useEffect(() => {
        if (erInnlogget) getJsonRequest(setCv, "/personbruker/api/cv");
        else if (!erInnlogget) setCv(initialData);
    }, [erInnlogget]);

    return <CvContext.Provider value={{ cv, oppdaterCvSeksjon }}>{children}</CvContext.Provider>;
};

export default CvProvider;
