import React, { lazy, Suspense } from "react";
import { Router } from "react-router";
import { Switch, Route, Redirect } from "react-router-dom";
import { createHashHistory } from "history";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { configureAPI } from "./api";
import "./App.css";
import Loading from "./components/Loading";
import Breadcrumbs from "./components/Breadcrumbs";

const Complaints = lazy(() => import("./pages/complaints"));

const history = createHashHistory();

configureAPI();

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">GComplaints</Typography>
        </Toolbar>
      </AppBar>

      <Router history={history}>
        <div>
          <Breadcrumbs />
          <div className="main-wrapper">
            <div className="main">
              <Suspense fallback={<Loading fullScreen />}>
                <Switch>
                  <Route path="/complaints" component={Complaints} />
                  <Redirect to="/complaints" />
                </Switch>
              </Suspense>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
