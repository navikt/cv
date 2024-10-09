import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";
import { v4 as uuidv4 } from "uuid";

export const apiRequest = async (setData, url, method = "GET", body = null, dataTransformator = null) => {
    setData((prevState) => ({
        ...prevState,
        status: "pending",
    }));

    const fetchOptions = {
        method: method,
        credentials: "same-origin",
        headers: {
            "Nav-CallId": `min-side-cv-${uuidv4()}`,
        },
    };

    if (body !== null) fetchOptions["body"] = JSON.stringify(body);

    const response = await fetch(url, fetchOptions);

    if (response.status === 200) {
        const json = await response.json();
        setData((prevState) => ({
            ...prevState,
            status: "success",
            data: dataTransformator ? dataTransformator(prevState, json) : json,
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
