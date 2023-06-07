import { useEffect, useState } from "react";

export const validationRegexes = {
  alphaNumeric: {
    regex: /^[A-Za-z0-9._ ]+$/,
    errMsg: "Please enter only alphanumeric characters.",
  },
  telephone: {
    regex: /^[0-9]{9}$/,
    errMsg: "Please enter a valid telephone number.",
  },
  mobileNumber: {
    regex: /^[0-9]{10}$/,
    errMsg: "Please enter a valid mobile number.",
  },
  year: {
    regex: /^[0-9]{4}$/,
    errMsg: "Please enter a valid establishment year.",
  },
  email: {
    regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    errMsg: "Please enter a valid email address.",
  },
  website: {
    regex: new RegExp(
      "^([a-zA-Z]+:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$", // fragment locator
      "i"
    ),
    errMsg: "Please enter a valid website",
  },
};

export default function Validator(props) {
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (props.input == "" || props.regexValidation.regex.test(props.input)) {
      setIsValid(true);
      if (props.callbackOnValid) {
        props.callbackOnValid();
      }
    } else {
      setIsValid(false);
      if (props.callbackOnInvalid) {
        props.callbackOnInvalid();
      }
    }
  }, [props]);

  if (isValid) {
    return <></>;
  }
  return (
    <p className="text-xs font-bold text-red-500">
      {props.regexValidation.errMsg}
    </p>
  );
}
