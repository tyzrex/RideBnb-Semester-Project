import * as yup from "yup";

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

// const validationRules = [
//   {
//     name: "vehicleName",
//     required: true,
//     regex: regex.alphaNumeric.regex,
//     errorMessage: "Vehicle Name should be alphanumeric",
//   },
//   {
//     name: "vehicleType",
//     required: true,
//     regex: regex.alphaNumeric.regex,
//     errorMessage: "Vehicle Type should be alphanumeric",
//   },
//   {
//     name: "vehicleMakeYear",
//     required: true,
//     regex: regex.numeric.regex,
//     errorMessage: "Vehicle Make Year should be numeric",
//   },
//   {
//     name: "vehicleBrand",
//     required: true,
//     regex: regex.alphaNumeric.regex,
//     errorMessage: "Vehicle Brand should be alphanumeric",
//   },
//   {
//     name: "address",
//     required: true,
//     regex: regex.alphaNumeric.regex,
//     errorMessage: "Address should be alphanumeric",
//   },
//   {
//     name: "vehicleColor",
//     required: true,
//     regex: regex.alphaNumeric.regex,
//     errorMessage: "Vehicle Color should be alphanumeric",
//   },
//   {
//     name: "pricePerDay",
//     required: true,
//     regex: regex.numeric.regex,
//     errorMessage: "Price per day should be numeric",
//   },
//   {
//     name: "vehicleDescription",
//     required: true,
//     regex: null,
//     errorMessage: "Cannot be empty",
//   },
//   {
//     name: "vehicleImage",
//     required: true,
//     regex: null,
//     errorMessage: "Vehicle Image required",
//   },
//   {
//     name: "numberPlate",
//     required: true,
//     regex: regex.alphaNumeric.regex,
//     errorMessage: "Number Plate should be alphanumeric",
//   },
//   {
//     name: "listingType",
//     required: true,
//     regex: null,
//     errorMessage: "Listing Type cannot be empty",
//   },
//   {
//     name: "features",
//     required: true,
//     regex: null,
//     errorMessage: "Features cannot be empty",
//   },
//   {
//     name: "vehiclefile",
//     required: true,
//     regex: null,
//     errorMessage: "Vehicle Image required",
//   },
// ];

// const validation = (values) => {
//   const errors = {};

//   validationRules.forEach((rule) => {
//     const value = values[rule.name];
//     if (rule.required && (!value || !value.trim())) {
//       errors[rule.name] = `${rule.errorMessage} is required`;
//     } else if (rule.regex && value && !rule.regex.test(value)) {
//       errors[rule.name] = rule.errorMessage;
//     }
//   });

//   return errors;
// };

// export default validation;

const validationSchema = yup.object().shape({
  vehicleName: yup
    .string()
    .matches(regex.alphaNumeric.regex, "Vehicle Name should be alphanumeric")
    .required("Vehicle Name is required"),
  vehicleType: yup
    .string()
    .matches(regex.alphaNumeric.regex, "Vehicle Type should be alphanumeric")
    .required("Vehicle Type is required"),
  vehicleMakeYear: yup
    .number()
    .integer()
    .positive()
    .required("Vehicle Make Year is required"),
  vehicleBrand: yup
    .string()
    .required("Vehicle Brand is required")
    .matches(regex.alphaNumeric.regex, "Vehicle Brand should be alphanumeric"),
  address: yup
    .string()
    .required("Address is required")
    .matches(regex.alphaNumeric.regex, "Address should be alphanumeric"),
  vehicleColor: yup
    .string()
    .required("Vehicle Color is required")
    .matches(regex.alphaNumeric.regex, "Vehicle Color should be alphanumeric"),
  pricePerDay: yup.number().required("Price per day is required").positive(),
  vehicleDescription: yup.string().required("Vehicle Description is required"),
  numberPlate: yup
    .string()
    .required("Number Plate is required")
    .matches(regex.alphaNumeric.regex, "Number Plate should be alphanumeric"),
  listingType: yup.string().required("Listing Type is required"),
  features: yup.string().required("Features are required"),
  vehiclefile: yup.string().required("Vehicle Image is required"),
});

const validation = (values) => {
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

export default validation;
