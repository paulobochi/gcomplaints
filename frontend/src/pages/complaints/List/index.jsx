import React, { useState, useCallback } from "react";
import { Field } from "react-final-form";
import { Link } from "react-router-dom";
import {
  Paper,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataTypeProvider } from "@devexpress/dx-react-grid";
import DataGrid from "../../../components/DataGrid";
import Select from "../../../components/inputs/Select";
import Filters from "../../../components/Filters";
import complaintApi from "../../../api/complaint";
import companyApi from "../../../api/company";
import countryApi from "../../../api/country";
import stateApi from "../../../api/state";
import cityApi from "../../../api/city";

import { getColumns, extensions } from "./gridDecorators";

const ActionsTypeProvider = ({ match, onDelete, ...otherProps }) => (
  <DataTypeProvider
    formatterComponent={({ row }) => (
      <Grid container spacing={2}>
        <Grid item>
          <IconButton
            aria-label="View"
            color="secondary"
            component={Link}
            size="small"
            href
            to={`${match.url}/${row.id}`}
          >
            <EditIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            aria-label="View"
            color="secondary"
            size="small"
            onClick={() => onDelete(row)}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    )}
    {...otherProps}
  />
);

export default ({ match }) => {
  const [isFetched, setFetched] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const [complaints, setComplaints] = useState({ records: [] });

  const [filters, setFilters] = useState({});
  const [stateScope, setStateScope] = useState({});
  const [cityScope, setCityScope] = useState({});

  const [complaintForDelete, setComplaintForDelete] = useState(null);

  const handleFetchComplaints = useCallback(params => {
    setFetching(true);
    complaintApi.collect(params).then(response => {
      setComplaints(response.data);
      setFetched(true);
      setFetching(false);
    });
  }, []);

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

  const handleFetchCountries = useCallback(
    params =>
      new Promise(resolve => {
        countryApi.collect({ ...params, sort: "name asc" }).then(response => {
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

  const handleFetchStates = useCallback(
    (params, scope) =>
      new Promise(resolve => {
        stateApi
          .collect({ ...params, sort: "name asc", ...scope })
          .then(response => {
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

  const handleFetchCities = useCallback(
    (params, scope) =>
      new Promise(resolve => {
        cityApi
          .collect({ ...params, sort: "name asc", ...scope })
          .then(response => {
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

  const handleChangeFilters = useCallback(
    params => {
      const filters = {
        company_id: params.company ? params.company.value : null,
        country_id: params.country ? params.country.value : null,
        state_id: params.state ? params.state.value : null,
        city_id: params.city ? params.city.value : null
      };

      if (filters.country_id !== stateScope.country_id) {
        setStateScope({ country_id: filters.country_id });
      }
      if (
        filters.country_id !== cityScope.country_id ||
        filters.state_id !== cityScope.state_id
      ) {
        setCityScope({
          country_id: filters.country_id,
          state_id: filters.state_id
        });
      }

      setFilters(filters);
    },
    [cityScope.country_id, cityScope.state_id, stateScope.country_id]
  );

  const handleCloseDeleteDialog = () => {
    setComplaintForDelete(null);
  };

  const handleDelete = () => {
    return complaintApi.destroy(complaintForDelete.id).then(response => {
      setFilters({ ...filters });
      setComplaintForDelete(null);
    });
  };

  return (
    <Paper>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
        spacing={2}
        style={{ padding: 20 }}
      >
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`${match.url}/new`}
          >
            New Complaint
          </Button>
        </Grid>
      </Grid>
      <Filters onChange={handleChangeFilters} filters={filters}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} lg={3}>
            <Field
              component={Select}
              name="company"
              label={"Company"}
              resourcesFetcher={handleFetchCompanies}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Field
              component={Select}
              name="country"
              label={"Country"}
              resourcesFetcher={handleFetchCountries}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Field
              component={Select}
              name="state"
              label={"State"}
              resourcesFetcher={handleFetchStates}
              scope={stateScope}
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Field
              component={Select}
              name="city"
              label={"City"}
              resourcesFetcher={handleFetchCities}
              scope={cityScope}
            />
          </Grid>
        </Grid>
      </Filters>
      <DataGrid
        isFetched={isFetched}
        isFetching={isFetching}
        resources={complaints}
        onFetchResources={handleFetchComplaints}
        columns={getColumns()}
        columnExtensions={extensions}
        filters={filters}
      >
        <ActionsTypeProvider
          for={["actions"]}
          match={match}
          onDelete={row => setComplaintForDelete(row)}
        />
      </DataGrid>

      <Dialog
        open={complaintForDelete != null}
        onClose={handleCloseDeleteDialog}
        PaperComponent={Paper}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Delete Complaint
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`Do you really want to delete the complaint with title ${complaintForDelete &&
              complaintForDelete.title}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};
