import React from "react";
import TextField from "@material-ui/core/TextField";

export default ({
  ref,
  meta,
  label,
  fullWidth,
  required,
  autoFocus,
  variant,
  input: { ...inputProps },
  ...otherProps
}) => {
  let helperText;
  let error = false;
  if (meta && meta.submitError) {
    error = true;
    helperText = meta.submitError;
  }

  if (meta && meta.touched) {
    error = !!(meta.error || meta.submitError);
    helperText = meta.error || meta.submitError;
  }

  return (
    <TextField
      label={label}
      required={required}
      autoFocus={autoFocus}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      variant={variant || "outlined"}
      {...inputProps}
      {...otherProps}
    />
  );
};
