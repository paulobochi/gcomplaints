import React from "react";
import { NavLink } from "react-router-dom";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";
import { withStyles } from "@material-ui/core/styles";
import routes from "./routes";

const styles = theme => ({
  breadcrumbs: {
    fontSize: 15,
    display: "flex",
    minHeight: 50,
    alignItems: "center",
    borderBottom: "1px solid #ccc",
    padding: "10px 20px",
    boxSizing: "border-box",
    "& a": {
      textDecoration: "none",
      color: theme.palette.text.primary,
      "&:last-child": {
        color: theme.palette.primary.main,
        cursor: "default"
      }
    }
  },
  separator: {
    color: theme.palette.text.primary,
    margin: "0px 5px"
  }
});

type Props = {
  classes: Object,
  breadcrumbs: Object
};

const Breadcrumbs = ({ classes, breadcrumbs }: Props) => (
  <div className={classes.breadcrumbs}>
    {breadcrumbs.map(({ match, breadcrumb }, index) => (
      <span key={match.url}>
        <NavLink to={match.url}>{breadcrumb}</NavLink>
        {index < breadcrumbs.length - 1 && (
          <span className={classes.separator}>/</span>
        )}
      </span>
    ))}
  </div>
);

export default withBreadcrumbs(routes)(withStyles(styles)(Breadcrumbs));
