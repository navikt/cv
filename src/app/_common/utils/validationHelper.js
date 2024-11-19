import z from "zod";

export const hentDatoMedÅrsforskjell = (deltaÅr) => {
    const dato = new Date();
    dato.setFullYear(dato.getFullYear() + deltaÅr);
    return dato;
};

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
    console.log("NAME", schema);
    console.log("VALUE", value);
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
    .transform((dateStr, ctx) => {
        const [day, month, year] = dateStr.split(".").map(Number);

        if (year < 1000 || year > 9999) {
            ctx.addIssue({
                message: "Dato er ikke gyldig",
            });
            return z.NEVER;
        }

        const date = new Date(year, month - 1, day);

        if (date.getDate() !== day || date.getMonth() + 1 !== month || date.getFullYear() !== year) {
            ctx.addIssue({
                message: "Dato er ikke gyldig",
            });
            return z.NEVER;
        }

        return date;
    })
    .refine(
        (date) => {
            const firstValid = hentDatoMedÅrsforskjell(-70);
            firstValid.setHours(0, 0, 0, 0);
            return date >= firstValid;
        },
        {
            message: `Velg dato etter: ${hentDatoMedÅrsforskjell(-70).getDate().toString().padStart(2, "0")}.${(hentDatoMedÅrsforskjell(-70).getMonth() + 1).toString().padStart(2, "0")}.${hentDatoMedÅrsforskjell(-70).getFullYear()}`,
        },
    );
