import { useState } from "react";

export const useForm = (fields) => {
  const [formState, setFormState] = useState(() => {
    const state = {};

    for (const field of fields) {
      state[field] = {
        value: "",
        isTouched: false,
        isValid: false,
      };
    }
    return state;
  });

  const updateValue = (name, value) => {
    setFormState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
      },
    }));
  };

  const resetFields = (fields) => {
    setFormState((prev) => {
      const state = { ...prev };
      for (const field of fields) {
        state[field] = {
          ...prev[field],
          value: "",
          isTouched: false,
          isValid: false,
        };
      }
      return state;
    });
  };

  const markTouched = (name) => {
    setFormState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        isTouched: true,
      },
    }));
  };

  const setFieldValidity = (name, isValid) => {
    setFormState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        isValid,
      },
    }));
  };

  return {
    formState,
    updateValue,
    markTouched,
    setFieldValidity,
    resetFields,
  };
};
