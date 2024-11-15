import z from "zod";

const handleOneLevelZodError = ({ issues }) => {
    const formData = {};
    if (issues.length === 1 && issues[0].path.length < 1) return issues[0].message;

    issues.forEach(({ path, message }) => {
        formData[path.join("-")] = message;
    });

    return formData;
};

export const handleZodValidation = (params) => {
    const { data, onError, onSuccess, schema } = params;

    try {
        const res = schema.parse(data);
        onSuccess(res);
    } catch (error) {
        if (error) {
            const formattedErr = handleOneLevelZodError(error);
            onError(formattedErr);
        } else {
            throw new Error(error);
        }
    }
};

export const revalidate = (e, schema, errors, setErrors) => {
    // Don`t revalidate single field if form is submitted
    if (e.relatedTarget?.type === "submit") {
        return;
    }
    const formData = new FormData();
    formData.append(e.target.name, e.target.value);
    const data = Object.fromEntries(formData);
    const oneValueSchema = z.object({ [e.target.name]: schema.shape[e.target.name] });

    handleZodValidation({
        onError: () => {},
        data: data,
        onSuccess: () => {
            const { [e.target.name]: remove, ...rest } = errors;
            setErrors(rest);
        },
        schema: oneValueSchema,
    });
};

export const revalidateExplicitValue = (name, value, schema, errors, setErrors) => {
    const data = { [name]: value };
    const oneValueSchema = z.object({ [name]: schema.shape[name] });

    handleZodValidation({
        onError: () => {},
        data: data,
        onSuccess: () => {
            const { [name]: remove, ...rest } = errors;
            setErrors(rest);
        },
        schema: oneValueSchema,
    });
};
