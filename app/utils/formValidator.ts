/**
 * @description Abstract function meant to be used to validate any num of attributes
 * of specified object provided in param or type param with one or more regex
 *
 * @requires Initializer Object with all attributes of desired form as null
 * @param values Actual values of the form as It's being changed
 * @param initializer Form values all null
 * @param validations Object with only keys of the object, paired with regex array per each. Each validation
 * must have an error message defined
 *
 * @returns Same object with custom errors desired. Please note: If several validations are failed on
 * same key, first failedMessage will take over the error value.
 */

import { FormValidations, FormValuesObject } from "../types/types";

export function validateForm<T extends FormValuesObject>(
  values: T,
  initializer: T,
  validations: FormValidations,
): T {
  const result: T = initializer;

  for (const [key, valList] of Object.entries(validations)) {
    const valueToValidate = values[key];
    if (valueToValidate) {
      Object.values(valList).forEach((val) => {
        if (val.regex) {
          if (!val.regex.test(valueToValidate)) {
            (result as FormValuesObject)[key] = val.failedMessage;
          } else {
            (result as FormValuesObject)[key] = null;
          }
        }
        if (val.condition) {
          if (!val.condition(valueToValidate)) {
            (result as FormValuesObject)[key] = val.failedMessage;
          } else {
            (result as FormValuesObject)[key] = null;
          }
        }
      });
    } else {
      (result as FormValuesObject)[key] = null;
    }
  }

  return result;
}
