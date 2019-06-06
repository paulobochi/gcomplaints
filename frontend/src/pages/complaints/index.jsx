import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loading from "../../components/Loading";

const ComplaintList = lazy(() => import("./List"));
const ComlpaintForm = lazy(() => import("./Form"));

export default ({ match }) => (
  <Suspense fallback={<Loading fullScreen />}>
    <Switch>
      <Route exact path={match.path} component={ComplaintList} />
      <Route path={`${match.path}/new`} component={ComlpaintForm} />
      <Route path={`${match.path}/:id`} component={ComlpaintForm} />
    </Switch>
  </Suspense>
);
