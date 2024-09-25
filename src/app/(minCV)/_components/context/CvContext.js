import { useEffect, useState } from "react";
import React from "react";
import * as cvMock from "../../../mocks/cvMock.json";
import * as personMock from "../../../mocks/personMock.json";
import { hentData } from "@/app/utils/fetchUtils";

export const CvOgPersonContext = React.createContext({ cv: {}, person: {} });

const CvOgPersonProvider = ({ children }) => {
    const [cv, setCv] = useState({ status: "not-fetched" });
    const [person, setPerson] = useState({ status: "not-fetched" });

    useEffect(() => {
        hentData(setPerson, personMock);
        hentData(setCv, cvMock);
    }, []);

    // responseMock byttes ut med URL når backend integrasjon er klart

    return <CvOgPersonContext.Provider value={{ cv, person }}>{children}</CvOgPersonContext.Provider>;
};

export default CvOgPersonProvider;
