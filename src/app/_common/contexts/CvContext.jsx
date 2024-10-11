import { useContext, useEffect, useState } from "react";
import React from "react";
import { apiRequest } from "@/app/_common/utils/fetchUtils";
import { AuthenticationContext, AuthenticationStatus } from "@/app/_common/contexts/AuthenticationContext";
import { StatusEnums } from "@/app/_common/enums/fetchEnums";

const initialData = { status: StatusEnums.NOT_FETCHED, data: null, updateStatus: StatusEnums.NOT_FETCHED };
export const CvContext = React.createContext({ cv: initialData });

const CvProvider = ({ children }) => {
    const { authenticationStatus } = useContext(AuthenticationContext);
    const [cv, setCv] = useState(initialData);

    const oppdaterCvSeksjon = async (data, seksjon) => {
        const cvDto = { [seksjon]: data };
        await apiRequest(setCv, `/personbruker/api/cv/${seksjon}`, "PUT", cvDto);
    };

    useEffect(() => {
        if (authenticationStatus === AuthenticationStatus.IS_AUTHENTICATED) apiRequest(setCv, "/personbruker/api/cv");
        else if (authenticationStatus === AuthenticationStatus.NOT_AUTHENTICATED) setCv(initialData);
    }, [authenticationStatus]);

    return <CvContext.Provider value={{ cv, oppdaterCvSeksjon }}>{children}</CvContext.Provider>;
};

export default CvProvider;
