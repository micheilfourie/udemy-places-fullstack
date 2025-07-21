import { useState } from "react";
import {
  validateLength,
  validateLongitude,
  validateLatitude,
  validateEmail,
} from "../../util/inputValidation";

const Input = ({
  type,
  id,
  label,
  placeholder,
  state,
  setState,
  isLoading = false,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const validateInput = (id, value) => {
    switch (id) {
      case "title":
      case "address":
        return [
          validateLength(value, 3, 50),
          `Please enter a ${id} between 3 and 50 characters.`,
        ];
      case "description":
        return [
          validateLength(value, 3, 200),
          "Please enter a description between 3 and 200 characters.",
        ];
      case "latitude":
        return [
          validateLatitude(value),
          "Please enter a valid latitude in decimal degrees.",
        ];
      case "longitude":
        return [
          validateLongitude(value),
          "Please enter a valid longitude in decimal degrees.",
        ];
      case "name":
        return [
          validateLength(value, 3, 50),
          "Please enter a name between 3 and 50 characters.",
        ];
      case "email":
        return [validateEmail(value), "Please enter a valid email address."];
      case "password":
        return [
          validateLength(value, 6, 50),
          "Please enter a password at least 6 characters in length.",
        ];
      default:
        return [true, ""];
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;

    let isValid = state.isValid;
    let message = errorMessage;

    if (state.isTouched) {
      [isValid, message] = validateInput(id, newValue);
      setErrorMessage(isValid ? "" : message);
    }

    setState({
      value: newValue,
      isTouched: state.isTouched,
      isValid,
    });
  };

  const handleBlur = () => {
    const [isValid, message] = validateInput(id, state.value);
    setErrorMessage(isValid ? "" : message);
    setState({
      ...state,
      isTouched: true,
      isValid,
    });
  };

  const inputClass = `rounded-lg p-2 outline-0 ${
    state.isTouched && !state.isValid
      ? "border border-red-500 bg-red-50"
      : "border border-neutral-200 bg-gray-100"
  }`;

  const inputElement =
    type === "textarea" ? (
      <textarea
        id={id}
        value={state.value}
        rows={5}
        placeholder={placeholder}
        required
        onChange={handleChange}
        onBlur={handleBlur}
        className={`resize-none ${inputClass} ${isLoading && "pointer-events-none"}`}
        aria-invalid={state.isTouched && !state.isValid}
      />
    ) : (
      <input
        type={type}
        id={id}
        value={state.value}
        placeholder={placeholder}
        required
        onChange={handleChange}
        onBlur={handleBlur}
        className={`${inputClass} ${isLoading && "pointer-events-none"}`}
        aria-invalid={state.isTouched && !state.isValid}
      />
    );

  return (
    <div className="mb-2 flex w-full flex-col">
      <label htmlFor={id} className="mb-2 font-semibold">{`${label}:`}</label>
      {inputElement}
      {state.isTouched && !state.isValid && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
