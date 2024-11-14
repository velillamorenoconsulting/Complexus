export const getValidateLengthFunction = (min: number, max?: number) => {
  return (val: string) => validateLength(val, min, max);
};

export const validateLength = (val: string, min: number, max?: number) => {
  if (max) {
    return val.length > min && val.length < max;
  }
  return val.length > min;
};
