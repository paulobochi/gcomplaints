export const decorateIntialValues = values => {
  if (values) {
    if (values.company && values.company.id) {
      values.company = { value: values.company.id, label: values.company.name };
    }
  }
  return values;
};
