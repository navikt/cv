import { getToken, requestTokenxOboToken, validateIdportenToken } from "@navikt/oasis";

export async function isIdPortenTokenValid(req) {
    const accessToken = getToken(req);

    if (accessToken) {
        return (await validateIdportenToken(accessToken)).ok;
    }

    return false;
}

export const exchangeIdPortenToken = async (request, audience) => {
    const token = getToken(request);
    return requestTokenxOboToken(token, audience);
};
