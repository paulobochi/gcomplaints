import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/Cancel";

const styles = {
  root: {
    height: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    fontSize: 48,
    color: "#757575"
  },
  text: {
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "1.3em"
  }
};

type Props = {
  classes: Object,
  t: Function
};

const Error = ({ classes, t }: Props) => (
  <div className={classes.root}>
    <CancelIcon className={classes.icon} />
    <Typography className={classes.text}>Ocorreu um erro</Typography>
  </div>
);

export default withStyles(styles)(Error);
