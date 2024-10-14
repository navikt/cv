import { useContext, useEffect, useState } from "react";
import React from "react";
import {
    getJsonRequest,
    fetchHasError,
    isFetching,
    putJsonRequest,
    simpleApiRequest,
} from "@/app/_common/utils/fetchUtils";
import { AuthenticationContext, AuthenticationStatus } from "@/app/_common/contexts/AuthenticationContext";
import { StatusEnums } from "@/app/_common/enums/fetchEnums";
import { Feilside, FeilsideTekst } from "@/app/_common/components/Feilside";
import { MidlertidigLasteside } from "@/app/_common/components/MidlertidigLasteside";
import Hjemmelside from "@/app/(minCV)/_components/hjemmelside/Hjemmelside";

const initialData = { fetchStatus: StatusEnums.INITIAL, data: null, updateStatus: StatusEnums.INITIAL };
export const PersonContext = React.createContext({ person: initialData });

const PersonProvider = ({ children }) => {
    const { authenticationStatus } = useContext(AuthenticationContext);
    const [person, setPerson] = useState(initialData);
    const [erUnderOppfølging, setErUnderOppfølging] = useState(false);
    const [harSettHjemmel, setHarSettHjemmel] = useState(true);

    const hentPerson = async (statusfelt) => {
        return await getJsonRequest(setPerson, "/personbruker/api/person", statusfelt);
    };

    const oppdaterPersonalia = async (data) => {
        const dataTransformator = (prevState, newData) => ({ ...prevState.data, personalia: newData });
        await putJsonRequest(setPerson, `/personbruker/api/personalia`, data, dataTransformator);
    };

    const bekreftSettHjemmel = async () => {
        setPerson((prevState) => ({ ...prevState, updateStatus: StatusEnums.PENDING }));
        const response = await simpleApiRequest("/personbruker/api/samtykke", "POST");

        if (!response.ok) {
            setPerson((prevState) => ({ ...prevState, updateStatus: StatusEnums.ERROR }));
            return;
        }

        await hentPerson("updateStatus");
    };

    useEffect(() => {
        if (authenticationStatus === AuthenticationStatus.IS_AUTHENTICATED) hentPerson("fetchStatus");
        else if (authenticationStatus === AuthenticationStatus.NOT_AUTHENTICATED) setPerson(initialData);
    }, [authenticationStatus]);

    useEffect(() => {
        const oppdaterPersonContext = () => {
            setErUnderOppfølging(person.data.erUnderOppfoelging);
            setHarSettHjemmel(person.data.harSettHjemmelEllerSamtykket);
        };

        if (person.data) oppdaterPersonContext(person);
    }, [person]);

    const medProvider = (children) => (
        <PersonContext.Provider value={{ person, oppdaterPersonalia, bekreftSettHjemmel }}>
            {children}
        </PersonContext.Provider>
    );

    if (authenticationStatus === AuthenticationStatus.NOT_AUTHENTICATED) {
        return <Feilside årsak={FeilsideTekst.IKKE_LOGGET_INN} />;
    }

    if (isFetching(person)) {
        return medProvider(<MidlertidigLasteside />);
    }

    if (fetchHasError(person)) {
        return medProvider(<Feilside årsak={FeilsideTekst.FETCH_ERROR} />);
    }

    if (!erUnderOppfølging) {
        return medProvider(<Feilside årsak={FeilsideTekst.IKKE_UNDER_OPPFØLGING} />);
    }

    if (!harSettHjemmel) {
        return medProvider(<Hjemmelside />);
    }

    return medProvider(children);
};

export default PersonProvider;
