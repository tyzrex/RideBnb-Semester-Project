const validate = (data) => {
  let errors = {};
  if (!data.name.trim()) {
    errors.name = "Username required";
  } else if (data.name.length < 3) {
    errors.name = "Username needs to be 3 characters or more";
  } else if (!/^[a-zA-Z0-9]+$/.test(data.name)) {
    errors.name = "Username needs to be alphanumeric";
  }
  if (!data.email) {
    errors.email = "Email required";
  } else if (!/\S+@\S+.\S+/.test(data.email)) {
    errors.email = "Email address is invalid";
  }
  if (!data.password) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password needs to be 6 characters or more";
  }
  if (!data.address) {
    errors.address = "Address is required";
  }
  if (!data.phone) {
    errors.phone = "Phone is required";
  } else if (!/^[0-9]+$/.test(data.phone)) {
    errors.phone = "Phone needs to be numeric";
  } else if (data.phone.length < 10) {
    errors.phone = "Phone needs to be 10 characters or more";
  }
  return errors;
};

export default validate;
