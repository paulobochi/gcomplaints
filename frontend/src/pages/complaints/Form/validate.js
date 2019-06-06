export default values => {
  const errors = {};

  if (!values.title) {
    errors.title = "Required";
  }

  if (!values.description) {
    errors.description = "Required";
  }

  if (!values.company) {
    errors.company = "Required";
  }

  return errors;
};
