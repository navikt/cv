import { useContext, useEffect, useState } from "react";
import React from "react";
import { apiRequest } from "@/app/_common/utils/fetchUtils";
import { AuthenticationContext, AuthenticationStatus } from "@/app/_common/contexts/AuthenticationContext";
import { StatusEnums } from "@/app/_common/enums/fetchEnums";

const initialData = { fetchStatus: StatusEnums.NOT_FETCHED, data: null, updateStatus: StatusEnums.NOT_FETCHED };
export const PersonContext = React.createContext({ person: initialData });

const PersonProvider = ({ children }) => {
    const { authenticationStatus } = useContext(AuthenticationContext);
    const [person, setPerson] = useState(initialData);

    const oppdaterPersonalia = async (data) => {
        const dataTransformator = (prevState, newData) => ({ ...prevState.data, personalia: newData });
        await apiRequest(setPerson, `/personbruker/api/personalia`, "PUT", data, dataTransformator);
    };

    useEffect(() => {
        if (authenticationStatus === AuthenticationStatus.IS_AUTHENTICATED)
            apiRequest(setPerson, "/personbruker/api/person");
        else if (authenticationStatus === AuthenticationStatus.NOT_AUTHENTICATED) setPerson(initialData);
    }, [authenticationStatus]);

    return <PersonContext.Provider value={{ person, oppdaterPersonalia }}>{children}</PersonContext.Provider>;
};

export default PersonProvider;
