import { requestAzureOboToken, getToken, validateAzureToken } from "@navikt/oasis";

export const isEntraIdTokenValid = async (req) => {
    const accessToken = getToken(req);

    if (accessToken) {
        return (await validateAzureToken(accessToken)).ok;
    }

    return false;
};

export const exchangeEntraIdToken = async (request, audience) => {
    const token = getToken(request);
    return requestAzureOboToken(token, audience);
};
