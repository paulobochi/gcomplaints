import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "../../components/Loading";

const ComplaintList = lazy(() => import("./List"));
const ComplaintForm = lazy(() => import("./Form"));

export default ({ match }) => (
  <Suspense fallback={<Loading fullScreen />}>
    <Switch>
      <Route exact path={match.path} component={ComplaintList} />
      <Route path={`${match.path}/new`} component={ComplaintForm} />
      <Route path={`${match.path}/:id`} component={ComplaintForm} />
      <Redirect to="/" />
    </Switch>
  </Suspense>
);
