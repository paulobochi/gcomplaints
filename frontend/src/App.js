import React, { lazy, Suspense } from "react";
import { Router } from "react-router";
import { Switch, Route } from "react-router-dom";
import { createHashHistory } from "history";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

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
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">GComplaints</Typography>
        </Toolbar>
      </AppBar>

      <Router history={history}>
        <div className="main-wrapper">
          <Breadcrumbs />
          <div className="main">
            <Suspense fallback={<Loading fullScreen />}>
              <Switch>
                <Route exact path="/" component={Complaints} />
              </Switch>
            </Suspense>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
