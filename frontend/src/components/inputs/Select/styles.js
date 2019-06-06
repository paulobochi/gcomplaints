export default theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  input: {
    display: "flex",
    padding: "18.5px 14px"
  },
  inputLabel: {
    whiteSpace: "nowrap",
    maxWidth: "calc(100% - 40px)",
    textOverflow: "ellipsis",
    overflow: "hidden",
    lineHeight: 1.1
  },
  inputLabelShrink: {
    overflow: "visible"
  },
  valueContainer: {
    display: "flex",
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",

    "& input": {
      color: `${theme.palette.text.primary} !important`
    }
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700]
  },
  noOptionsMessage: {
    fontSize: 16,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  paper: {
    position: "absolute",
    zIndex: 2,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  }
});
