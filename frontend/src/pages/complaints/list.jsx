import React, { useState, useEffect, useCallback } from "react";
import { Field } from "react-final-form";
import { Paper, Grid } from "@material-ui/core";
import DataGrid from "../../components/DataGrid";
import complaintApi from "../../api/complaint";
import companyApi from "../../api/company";
import countryApi from "../../api/country";
import stateApi from "../../api/state";
import cityApi from "../../api/city";

import Select from "../../components/inputs/Select";

import { getColumns } from "./gridDecorators";
import Filters from "../../components/Filters";

export default ({ match }) => {
  const [isFetched, setFetched] = useState(false);
  const [complaints, setComplaints] = useState({ records: [] });
  const [filters, setFilters] = useState({});
  const [stateScope, setStateScope] = useState({});
  const [cityScope, setCityScope] = useState({});

  const handleFetchComplaints = useCallback(params => {
    complaintApi.collect(params).then(response => {
      setComplaints(response.data);
      setFetched(true);
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

  return (
    <Paper>
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
        resources={complaints}
        onFetchResources={handleFetchComplaints}
        columns={getColumns()}
        filters={filters}
      />
    </Paper>
  );
};
