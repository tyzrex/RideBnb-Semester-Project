import * as Yup from "yup";

const regex = {
  alphaNumeric: {
    regex: /^[A-Za-z0-9._ ]+$/,
  },

  alpha: {
    regex: /^[A-Za-z]+$/,
  },

  numeric: {
    regex: /^[0-9]+$/,
  },
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .matches(regex.alphaNumeric.regex, "Username should be alphanumeric")
    .required("Username is required"),
  email: Yup.string()
    .matches(regex.alphaNumeric.regex, "Email should be alphanumeric")
    .required("Email is required"),
  address: Yup.string()
    .required("Address is required")
    .matches(regex.alphaNumeric.regex, "Address should be alphanumeric"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(regex.alphaNumeric.regex, "Phone should be alphanumeric"),
});

const validationEdit = (values) => {
  try {
    validationSchema.validateSync(values, { abortEarly: false });
    return {};
  } catch (error) {
    const errors = {};
    error.inner.forEach((e) => {
      errors[e.path] = e.message;
    });
    return errors;
  }
};

export default validationEdit;
