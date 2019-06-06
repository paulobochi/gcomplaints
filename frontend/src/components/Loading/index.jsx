import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    minHeight: 200
  },
  fullScreen: {
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    position: "absolute"
  }
};

type Props = {
  classes: Object,
  fullScreen: boolean
};

const Loading = ({ classes, fullScreen }: Props) => (
  <div
    className={classNames([classes.container], {
      [classes.fullScreen]: fullScreen
    })}
  >
    <CircularProgress />
  </div>
);

export default withStyles(styles)(Loading);
