import React from "react";
import { Form, FormSpy } from "react-final-form";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import classNames from "classnames";

import styles from "./styles";

class Filters extends React.PureComponent {
  static defaultProps = {
    className: ""
  };

  handleChange = ({ values }) => {
    const { onChange } = this.props;
    if (onChange) onChange(values);
  };

  render() {
    const { open, initialValues, className, classes, children } = this.props;

    return (
      <Paper
        className={classNames(classes.container, {
          [classes.containerOpen]: open,
          [className || ""]: open
        })}
      >
        <Form
          initialValues={initialValues}
          onSubmit={() => {}}
          render={({ handleSubmit, form }) => (
            <div
              className={classNames(classes.content, {
                [classes.hidden]: !open
              })}
            >
              <form onSubmit={handleSubmit} className={classes.form}>
                {children}
                <FormSpy
                  onChange={this.handleChange}
                  subscription={{ values: true }}
                />
              </form>
              <Button onClick={form.reset} className={classes.clearAll}>
                Reset Filters
              </Button>
            </div>
          )}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(Filters);
