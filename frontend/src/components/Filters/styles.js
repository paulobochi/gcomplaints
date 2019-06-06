export default theme => ({
  container: {
    display: "initial",
    minHeight: 85,
    maxHeight: "inherit",
    overflow: "visible",
    borderTop: `${theme.palette.primary.main} solid 5px`
  },
  content: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    padding: 20
  },
  form: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "end"
  },
  clearAll: {
    color: "#DE411A",
    fontSize: 11,
    marginLeft: 20
  },
  hidden: {
    display: "hidden"
  }
});
