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

export const mapTypeaheadResponse = (json) => {
    return json.data.map((e) => ({
        ...e,
        title: e.label || e.term,
        conceptId: e.konseptId,
    }));
};
