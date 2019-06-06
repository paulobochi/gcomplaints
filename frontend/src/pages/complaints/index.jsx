import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loading from "../../components/Loading";

const ComplaintList = lazy(() => import("./list"));

type Props = {
  match: Object
};

export default ({ match }: Props) => (
  <Suspense fallback={<Loading fullScreen />}>
    <Switch>
      <Route exact path="/" component={ComplaintList} />
    </Switch>
  </Suspense>
);
