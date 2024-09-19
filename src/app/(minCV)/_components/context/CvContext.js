import { useEffect, useState } from "react";
import React from "react";
import * as cvMock from "../../../mocks/cvMock.json";
import * as personMock from "../../../mocks/personMock.json";

export const CvOgPersonContext = React.createContext({ cv: {}, person: {} });

const CvOgPersonProvider = ({ children }) => {
    const [cv, setCv] = useState({ status: "not-fetched" });
    const [person, setPerson] = useState({ status: "not-fetched" });

    useEffect(() => {
        hentData(setPerson, personMock);
        hentData(setCv, cvMock);
    }, []);

    // responseMock byttes ut med URL når backend integrasjon er klart
    const hentData = async (setData, responseMock) => {
        setData((prevState) => ({
            ...prevState,
            status: "pending",
        }));

        // const response = await fetch(url, {credentials: "same-origin"})*/
        const response = { status: 200, json: async () => responseMock };

        if (response.status === 200) {
            const json = await response.json();
            setData((prevState) => ({
                ...prevState,
                status: "success",
                data: json,
            }));
        } else {
            setData((prevState) => ({
                ...prevState,
                status: "error",
            }));
        }
    };

    return <CvOgPersonContext.Provider value={{ cv, person }}>{children}</CvOgPersonContext.Provider>;
};

export default CvOgPersonProvider;
