import React, { useState, useEffect, useCallback } from "react";
import { useGeolocation } from "react-browser-hooks";
import { Form, Field } from "react-final-form";
import {
  Paper,
  CardContent,
  FormControl,
  Button,
  withStyles
} from "@material-ui/core";

import TextInput from "../../../components/inputs/Text";
import SelectInput from "../../../components/inputs/Select";
import complaintApi from "../../../api/complaint";
import companyApi from "../../../api/company";

import styles from "./styles";
import { decorateIntialValues } from "./decorators";
import validate from "./validate";

export default withStyles(styles)(({ match, history, classes }) => {
  const [complaint, setComplaint] = useState({});
  const { position } = useGeolocation();

  useEffect(() => {
    if (match.params.id) {
      complaintApi.show(match.params.id).then(response => {
        setComplaint(response.data);
      });
    }
  }, [match.params.id]);

  const handleFetchCompanies = useCallback(
    params =>
      new Promise(resolve => {
        companyApi.collect({ ...params, sort: "name asc" }).then(response => {
          if (response.data) {
            resolve(
              response.data.records.map(r => ({
                label: r.name,
                value: r.id
              }))
            );
          }
        });
      }),
    []
  );

  const handleOnSubmit = values => {
    if (position && position.coords) {
      return complaintApi
        .createOrUpdate(match.params.id, {
          ...values,
          company_id: values.company.value,
          coordinates: [position.coords.longitude, position.coords.latitude]
        })
        .then(response => {
          history.push("/complaints");
        })
        .catch(e => {
          if (e.response) {
            return e.response.data.errors;
          }
        });
    }
  };

  return (
    <Paper className={classes.content}>
      <CardContent>
        <Form
          onSubmit={handleOnSubmit}
          validate={values => validate(values)}
          initialValues={decorateIntialValues(complaint)}
          render={({ handleSubmit, submitting, values, errors, touched }) => (
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <FormControl
                margin="normal"
                fullWidth
                className={classes.formControl}
              >
                <Field
                  component={SelectInput}
                  name="company"
                  label={"Company"}
                  resourcesFetcher={handleFetchCompanies}
                />
              </FormControl>

              <FormControl
                margin="normal"
                fullWidth
                className={classes.formControl}
              >
                <Field name="title" label="Title" component={TextInput} />
              </FormControl>

              <FormControl
                margin="normal"
                fullWidth
                className={classes.formControl}
              >
                <Field
                  name="description"
                  label={"Description"}
                  rows="3"
                  rowsMax="10"
                  component={TextInput}
                  multiline
                />
              </FormControl>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={submitting}
              >
                {values.id ? "Update" : "Create"}
              </Button>
            </form>
          )}
        />
      </CardContent>
    </Paper>
  );
});
