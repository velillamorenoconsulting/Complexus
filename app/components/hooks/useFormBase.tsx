"use client";
import { FormValidations, FormValuesObject } from "@/app/types/types";
import { validateForm } from "@/app/utils/formValidator";
import React, { useEffect, useState } from "react";

export default function useFormBase<T extends FormValuesObject>(
  initializer: T,
  validations: FormValidations,
): {
  formValues: T;
  formErrors: T;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isButtonDisabled: boolean;
  clearForm: () => void;
  changeInitializer: (values: T) => void;
} {
  const [formValues, setFormValues] = useState<T>(initializer);
  const [formErrors, setFormErrors] = useState<T>(initializer);
  const [isButtonDisabled, setDisablingButton] = useState<boolean>(false);

  const clearForm = () => {
    setFormValues(initializer);
    setFormErrors(initializer);
  };

  useEffect(() => {
    for (const [key, value] of Object.entries(formValues)) {
      if (!value || formErrors[key]) setDisablingButton(true);
      else setDisablingButton(false);
    }
  }, [formValues]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
    setFormErrors(
      validateForm<T>(
        {
          ...formValues,
          [e.target.id]: e.target.value,
        },
        initializer,
        validations,
      ),
    );
  }

  function changeInitializer(values: T) {
    setFormValues(values);
  }
  return {
    formValues,
    formErrors,
    handleChange,
    isButtonDisabled,
    clearForm,
    changeInitializer,
  };
}
