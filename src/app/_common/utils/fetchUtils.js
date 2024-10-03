import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";
import { v4 as uuidv4 } from "uuid";

export const hentData = async (setData, responseMock, url, headers) => {
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

export const mapTypeaheadResponse = (json, visningsfelt = "title") => {
    return json.map((e) => ({
        ...e,
        [visningsfelt]: e.label || e.term || e.location,
        conceptId: e.konseptId,
    }));
};

export const hentTypeahead = async (query, type, visningsfelt = "title") => {
    const queryString = type !== TypeaheadEnum.SPRÅK ? encodeURIComponent(query) : "";

    const url = `/personbruker/api/typeahead/${type}/${queryString}`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Nav-CallId": `min-side-cv-${uuidv4()}`,
        },
    });

    const data = response.ok ? await response.json() : [];
    return mapTypeaheadResponse(data, visningsfelt);
};
