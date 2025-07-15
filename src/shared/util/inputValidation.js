const validateLength = (value, min, max) =>
  value.trim().length >= min && value.trim().length <= max;

const validateLatitude = (value) => {
  const num = parseFloat(value);
  return (
    /^-?\d{1,2}(\.\d+)?$/.test(value.trim()) &&
    !isNaN(num) &&
    num >= -90 &&
    num <= 90
  );
};

const validateLongitude = (value) => {
  const num = parseFloat(value);
  return (
    /^-?(1[0-7]\d|[1-9]?\d|180)(\.\d+)?$/.test(value.trim()) &&
    !isNaN(num) &&
    num >= -180 &&
    num <= 180
  );
};

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

export { validateLength, validateLongitude, validateLatitude, validateEmail };
