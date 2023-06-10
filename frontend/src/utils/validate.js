import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  fullName: Yup.string().required("Full name is required"),
});

const signInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const allSchemas = {
  signInSchema: signInSchema,
  signUpSchema: signUpSchema,
};

const validate = async (schemaType, values) => {
  try {
    await allSchemas[schemaType].validate(values, { abortEarly: false });
    return null;
  } catch (error) {
    const validationErrors = {};
    error.inner.forEach((err) => {
      validationErrors[err.path] = err.message;
    });
    return validationErrors;
  }
};

export default validate;
