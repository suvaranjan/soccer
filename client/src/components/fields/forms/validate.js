import * as Yup from "yup";

const validationSchema = Yup.object({
    name: Yup.string().required("Field name is required"),
    location: Yup.string().required("Location is required"),
    postalCode: Yup.string().required("Postal code is required"),
    gate: Yup.string(),
    photo: Yup.string().url("Must be a valid URL"),
    link: Yup.string().url("Must be a valid URL"),
    fee: Yup.number().min(0, "Fee cannot be negative").required("Fee is required"),
    shower: Yup.boolean().required("Shower availability is required"),
    toilet: Yup.boolean().required("Toilet availability is required"),
    childrenPlayground: Yup.boolean().required("Children playground availability is required"),
    foodCourtNearby: Yup.boolean().required("Food court availability is required"),
    whereToEatAndDrink: Yup.string(),
    deposit: Yup.number().min(0, "Deposit cannot be negative"),
    // areas: Yup.array().of(Yup.string()),
    instructionOrNote: Yup.string(),
});

export default validationSchema;
