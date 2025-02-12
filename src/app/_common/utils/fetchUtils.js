import { v4 as uuidv4 } from "uuid";

export const simpleApiRequest = async (url, method, body = null, includeCredentials = true) => {
    const fetchOptions = {
        method: method,
        headers: { "Nav-CallId": `min-cv-${uuidv4()}` },
    };

    if (includeCredentials) fetchOptions.credentials = "same-origin";
    if (body !== null) fetchOptions.body = JSON.stringify(body);

    const reponse = await fetch(url, fetchOptions);
    return reponse;
};

export const getAPI = async (url) => {
    const response = await simpleApiRequest(url, "GET");

    if (!response.ok) {
        const error = new Error(`Det oppstod en feil ved GET mot ${url}.`);
        error.status = response.status;
        throw error;
    }

    const responseJson = await response.json();
    return responseJson;
};

export const putAPI = async (url, body) => {
    const response = await simpleApiRequest(url, "PUT", body);

    if (!response.ok) {
        const error = new Error(`Det oppstod en feil ved PUT mot ${url}.`);
        error.status = response.status;
        throw error;
    }
    const responseJson = await response.json();
    return responseJson;
};

export const postAPI = async (url, body) => {
    const response = await simpleApiRequest(url, "POST", body);

    if (!response.ok) {
        const error = new Error(`Det oppstod en feil ved POST mot ${url}.`);
        error.status = response.status;
        throw error;
    }
    const responseJson = await response.json();
    return responseJson;
};

export const deleteAPI = async (url) => {
    const response = await simpleApiRequest(url, "DELETE");

    if (!response.ok) {
        const error = new Error(`Det oppstod en feil ved DELETE mot ${url}.`);
        error.status = response.status;
        throw error;
    }
};
