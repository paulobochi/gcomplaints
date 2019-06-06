import React, { useEffect } from "react";
import classNames from "classnames";
import AsyncPaginate from "react-select-async-paginate";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import TextInput from "../Text";

import styles from "./styles";

function NoOptionsMessage({ selectProps, innerProps, children }) {
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.noOptionsMessage}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control({
  selectProps,
  innerRef,
  innerProps,
  children
}: ControlProps) {
  let value = "";

  value = selectProps.value ? selectProps.value.label || "" : "";

  return (
    <TextInput
      fullWidth
      label={selectProps.label}
      meta={selectProps.meta}
      required={selectProps.required}
      value={value}
      InputLabelProps={{
        classes: {
          root: selectProps.classes.inputLabel,
          shrink: selectProps.classes.inputLabelShrink
        }
      }}
      InputProps={{
        inputComponent,
        inputProps: {
          className: selectProps.classes.input,
          ref: innerRef,
          children,
          ...innerProps
        }
      }}
    />
  );
}

function Option({ innerRef, isFocused, isSelected, innerProps, children }) {
  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
      {...innerProps}
      className="infinite-list-item"
    >
      {children}
    </MenuItem>
  );
}

function SingleValue({ selectProps, innerProps, children }) {
  return (
    <Typography className={selectProps.classes.singleValue} {...innerProps}>
      {children}
    </Typography>
  );
}

function ValueContainer({ selectProps, children }) {
  return <div className={selectProps.classes.valueContainer}>{children}</div>;
}

function MultiValue({ children, selectProps, isFocused, removeProps }) {
  return (
    <Chip
      tabIndex={-1}
      label={children}
      className={classNames(selectProps.classes.chip, {
        [selectProps.classes.chipFocused]: isFocused
      })}
      onDelete={event => {
        removeProps.onClick();
        removeProps.onMouseDown(event);
      }}
    />
  );
}

function Menu({ selectProps, innerProps, innerRef, children }) {
  return (
    <Paper square {...innerProps} className={selectProps.classes.paper}>
      <div ref={innerRef}>{children}</div>
    </Paper>
  );
}

const components = {
  Menu,
  Option,
  Control,
  NoOptionsMessage,
  SingleValue,
  MultiValue,
  ValueContainer
};

class Select extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { scope, input, onChange } = this.props;

    if (nextProps.scope !== scope) {
      if (input && input.onChange) input.onChange(null);
      if (onChange) onChange(null);
    }
  }

  loadOptions = async (search, loadedOptions, { page, size }) => {
    const { scope, resourcesFetcher } = this.props;

    if (resourcesFetcher) {
      const options = await resourcesFetcher({ q: search, page, size }, scope);

      return {
        options: options,
        hasMore: options.length === 25,
        additional: {
          page: page + 1,
          size: size
        }
      };
    }
  };

  render() {
    const {
      classes,
      theme,
      input,
      label,
      onChange,
      scope,
      ...otherProps
    } = this.props;

    return (
      <AsyncPaginate
        classes={classes}
        components={components}
        placeholder={false}
        label={label}
        value={input.value}
        isClearable
        cacheUniq={scope}
        loadOptions={this.loadOptions}
        onChange={option => {
          if (input && input.onChange) input.onChange(option);
          if (onChange) onChange(option);
        }}
        additional={{
          page: 1,
          size: 25
        }}
        {...otherProps}
      />
    );
  }
}

export default withStyles(styles)(Select);
