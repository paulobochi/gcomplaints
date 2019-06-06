import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "./styles";

const Loading = ({ classes, fullScreen }) => (
  <div
    className={classNames([classes.container], {
      [classes.fullScreen]: fullScreen
    })}
  >
    <CircularProgress />
  </div>
);

export default withStyles(styles)(Loading);
