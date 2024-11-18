import z from "zod";

const handleOneLevelZodError = (zodError) => {
    const errorMap = {};

    zodError.errors.forEach((error) => {
        const path = error.path.join("."); // Join path segments to create a single key
        if (!errorMap[path]) {
            errorMap[path] = error.message; // Store only the first error for each path
        }
    });

    return errorMap;
};

export const handleZodValidation = (params) => {
    const { data, onError, onSuccess, schema } = params;

    const result = schema.safeParse(data);

    if (result.success) {
        onSuccess(result.data);
    } else {
        const formattedErr = handleOneLevelZodError(result.error);
        onError(formattedErr);
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

export const dateStringSchema = z
    .string({
        required_error: "Dato må fylles ut",
        invalid_type_error: "Dato er ikke gyldig",
    })
    .refine(
        (dateStr) => {
            const dateRegex = /^\d{2}\.\d{2}\.\d{4}$/;
            return dateRegex.test(dateStr);
        },
        {
            message: "Dato er ikke gyldig",
        },
    )
    .transform((dateStr) => {
        const [day, month, year] = dateStr.split(".").map(Number);

        if (year < 1000 || year > 9999) {
            throw new Error("Dato er ikke gyldig");
        }

        const date = new Date(year, month - 1, day);

        if (date.getDate() !== day || date.getMonth() + 1 !== month || date.getFullYear() !== year) {
            throw new Error("Dato er ikke gyldig");
        }

        return date;
    });
