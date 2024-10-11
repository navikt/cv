import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";
import { v4 as uuidv4 } from "uuid";
import { StatusEnums } from "@/app/_common/enums/fetchEnums";

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

export const getJsonRequest = async (setData, url, statusfelt = null) => {
    console.log("STATUSFELT I GETJSONREQUEST", statusfelt);
    await apiJsonRequest(setData, url, "GET", null, null, statusfelt);
};

export const putJsonRequest = async (setData, url, body, dataTransformator, statusfelt = null) => {
    await apiJsonRequest(setData, url, "PUT", body, dataTransformator, statusfelt);
};

const apiJsonRequest = async (
    setData,
    url,
    method = "GET",
    body = null,
    dataTransformator = null,
    statusfelt = null,
) => {
    const requestStatusFelt = statusfelt ? statusfelt : method === "GET" ? "fetchStatus" : "updateStatus";

    setData((prevState) => ({
        ...prevState,
        [requestStatusFelt]: StatusEnums.PENDING,
    }));

    const response = await simpleApiRequest(url, method, body);

    if (response.status === 200) {
        const json = await response.json();
        setData((prevState) => ({
            ...prevState,
            [requestStatusFelt]: StatusEnums.SUCCESS,
            data: dataTransformator ? dataTransformator(prevState, json) : json,
        }));
    } else {
        setData((prevState) => ({
            ...prevState,
            [requestStatusFelt]: StatusEnums.ERROR,
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
        headers: { "Nav-CallId": `min-side-cv-${uuidv4()}` },
    });

    const data = response.ok ? await response.json() : [];
    return mapTypeaheadResponse(data, visningsfelt);
};

export const isFetching = (data) =>
    data.fetchStatus === StatusEnums.INITIAL || data.fetchStatus === StatusEnums.PENDING;
export const isFetched = (data) => data.fetchStatus === StatusEnums.SUCCESS;
export const fetchHasError = (data) => data.fetchStatus === StatusEnums.ERROR;
