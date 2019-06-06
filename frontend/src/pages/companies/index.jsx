import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "../../components/Loading";

const CompanyForm = lazy(() => import("./Form"));

export default ({ match }) => (
  <Suspense fallback={<Loading fullScreen />}>
    <Switch>
      <Route path={`${match.path}/new`} component={CompanyForm} />
      <Redirect to="/" />
    </Switch>
  </Suspense>
);
