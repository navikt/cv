import { useContext, useEffect, useState } from "react";
import React from "react";
import { apiRequest } from "@/app/_common/utils/fetchUtils";
import { AuthenticationContext, AuthenticationStatus } from "@/app/_common/contexts/AuthenticationProvider";

export const PersonOgCvContext = React.createContext({ cv: {}, person: {} });

const initialData = { status: "not-fetched", data: null };

const PersonOgCvProvider = ({ children }) => {
    const { authenticationStatus } = useContext(AuthenticationContext);
    const [cv, setCv] = useState(initialData);
    const [person, setPerson] = useState(initialData);

    const oppdaterPersonMedPersonalia = (oppdatertPersonalia) => {
        console.log("Oppdaterer personalia fra backend med", oppdatertPersonalia);
        setPerson({
            ...person,
            status: oppdatertPersonalia.status,
            personalia: oppdatertPersonalia.data,
        });
    };

    const oppdaterCvSeksjon = async (data, seksjon) => {
        const cvDto = { [seksjon]: data };
        await apiRequest(setCv, `/personbruker/api/cv/${seksjon}`, "PUT", cvDto);
    };

    const oppdaterPersonaliaData = async (data) => {
        const dataTransformator = (prevState, newData) => ({ ...prevState.data, personalia: newData });
        await apiRequest(setPerson, `/personbruker/api/personalia`, "PUT", data, dataTransformator);
    };

    useEffect(() => {
        const hentPersonOgCv = async () => {
            await apiRequest(setPerson, "/personbruker/api/person");
            await apiRequest(setCv, "/personbruker/api/cv");
        };

        const clearData = () => {
            setPerson(initialData);
            setCv(initialData);
        };

        if (authenticationStatus === AuthenticationStatus.IS_AUTHENTICATED) hentPersonOgCv();
        else if (authenticationStatus === AuthenticationStatus.NOT_AUTHENTICATED) clearData();
    }, [authenticationStatus]);

    return (
        <PersonOgCvContext.Provider value={{ cv, person, oppdaterCvSeksjon, oppdaterPersonaliaData }}>
            {children}
        </PersonOgCvContext.Provider>
    );
};

export default PersonOgCvProvider;
