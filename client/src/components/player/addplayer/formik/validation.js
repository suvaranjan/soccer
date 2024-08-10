// validationSchema.js
import * as Yup from "yup";

export const validation = Yup.object({
    fullName: Yup.string().required("Required"),
    age: Yup.string().required("Required"),
    strength: Yup.array().of(Yup.string()).min(1, "At least one strength is required").required("Required"),
    dateOfBirth: Yup.string().required("dateOfBirth"),
    gender: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    yearsPlaying: Yup.string().required("Required"),
    hoursPerWeek: Yup.string().required("Required"),
});
