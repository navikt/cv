import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";
import { v4 as uuidv4 } from "uuid";

export const simpleApiRequest = async (url, method, body = null) => {
    const fetchOptions = {
        method: method,
        credentials: "same-origin",
        headers: {
            "Nav-CallId": `min-side-cv-${uuidv4()}`,
        },
    };

    if (body !== null) fetchOptions["body"] = JSON.stringify(body);

    return await fetch(url, fetchOptions);
};

export const getAPI = async (url) => {
    const response = await simpleApiRequest(url, "GET");

    if (!response.ok) {
        const error = new Error(`Det oppstod en feil ved GET mot ${url}.`);
        error.status = response.status;
        throw error;
    }

    return await response.json();
};

export const putAPI = async (url, body) => {
    const response = await simpleApiRequest(url, "PUT", body);

    if (!response.ok) {
        const error = new Error(`Det oppstod en feil ved PUT mot ${url}.`);
        error.status = response.status;
        throw error;
    }

    return await response.json();
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
        headers: { "Nav-CallId": `min-side-cv-${uuidv4()}` },
    });

    const data = response.ok ? await response.json() : [];
    return mapTypeaheadResponse(data, visningsfelt);
};
