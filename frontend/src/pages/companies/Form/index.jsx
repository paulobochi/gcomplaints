import React from "react";
import { Form, Field } from "react-final-form";
import {
  Paper,
  CardContent,
  FormControl,
  Button,
  withStyles
} from "@material-ui/core";

import TextInput from "../../../components/inputs/Text";
import companyApi from "../../../api/company";

import styles from "./styles";
import validate from "./validate";

export default withStyles(styles)(({ match, history, classes }) => {
  const handleOnSubmit = values => {
    return companyApi
      .create(values)
      .then(response => {
        history.push("/complaints/new");
      })
      .catch(e => {
        if (e.response) {
          return e.response.data.errors;
        }
      });
  };

  return (
    <Paper className={classes.content}>
      <CardContent>
        <Form
          onSubmit={handleOnSubmit}
          validate={values => validate(values)}
          render={({ handleSubmit, submitting, values, errors, touched }) => (
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <FormControl
                margin="normal"
                fullWidth
                className={classes.formControl}
              >
                <Field name="name" label="Name" component={TextInput} />
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={submitting}
              >
                Create
              </Button>
            </form>
          )}
        />
      </CardContent>
    </Paper>
  );
});
