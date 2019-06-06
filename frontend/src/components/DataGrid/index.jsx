// @flow

import * as React from "react";
import { withRouter } from "react-router";
import {
  PagingState,
  CustomPaging,
  SortingState
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  DragDropProvider,
  TableColumnReordering,
  TableColumnVisibility,
  ColumnChooser,
  Toolbar,
  PagingPanel
} from "@devexpress/dx-react-grid-material-ui";
import { withStyles } from "@material-ui/core/styles";
import Error from "../Error";
import Loading from "../Loading";

const styles = {
  customRow: {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.07)"
    }
  }
};

const HoverableTableRow = withStyles(styles)(({ classes, ...restProps }) => (
  <Table.Row className={classes.customRow} {...restProps} />
));

class DataGrid extends React.Component {
  static defaultProps = {
    children: null,
    paginable: true,
    sortable: true,
    orderable: true,
    choosable: true,
    pagesSize: [10, 25, 50, 100],
    columnExtensions: []
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      pageSize: 10,
      sorting: []
    };
  }

  shouldComponentUpdate(nextProps) {
    const { resources, filters, isFetched } = this.props;

    return (
      nextProps.filters !== filters ||
      nextProps.resources !== resources ||
      nextProps.isFetched !== isFetched
    );
  }

  componentDidMount() {
    const { currentPage, pageSize } = this.state;
    const { onFetchResources } = this.props;
    onFetchResources({ page: currentPage, size: pageSize });
  }

  componentDidUpdate(prevProps) {
    const { pageSize, sorting } = this.state;
    const { filters } = this.props;

    if (prevProps.filters !== filters) {
      this.refresh({ size: pageSize, sorting });
    }
  }

  onCurrentPageChange = (page: number) => {
    const { pageSize, sorting } = this.state;
    this.refresh({ page, size: pageSize, sorting });
  };

  onPageSizeChange = (size: number) => {
    const { sorting } = this.state;
    this.refresh({ size, sorting });
  };

  onSortingChange = (sorting: Array<Sorting>) => {
    const { pageSize } = this.state;
    this.refresh({
      size: pageSize,
      sorting
    });
  };

  refresh = ({ page, size, sorting }) => {
    const { history, resources, filters, onFetchResources } = this.props;

    const params = {
      page: page + 1 || 1,
      size: size || (resources.meta ? resources.meta.page_size : 10),
      sort:
        sorting && sorting.length > 0
          ? `${sorting[0].columnName} ${sorting[0].direction}`
          : undefined
    };

    history.replace({
      search: `page=${params.page}&size=${params.size}${
        params.sort ? `&sort=${params.sort}` : ""
      }`
    });

    this.setState({ currentPage: page || 0, pageSize: size, sorting });

    onFetchResources({ ...params, ...filters }, true);
  };

  renderGrid() {
    const { currentPage, pageSize, sorting } = this.state;
    const {
      resources,
      columns,
      columnExtensions,
      children,
      pagesSize,
      paginable,
      sortable,
      orderable,
      choosable
    } = this.props;

    return (
      <Grid rows={resources.records} columns={columns}>
        {paginable && (
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={this.onCurrentPageChange}
            pageSize={pageSize}
            onPageSizeChange={this.onPageSizeChange}
          />
        )}
        {paginable && (
          <CustomPaging
            totalCount={resources.meta && resources.meta.total_count}
          />
        )}

        {sortable && (
          <SortingState
            sorting={sorting}
            onSortingChange={this.onSortingChange}
            columnExtensions={columnExtensions}
          />
        )}

        {children}

        {orderable && <DragDropProvider />}

        <div style={{ overflow: "hidden" }}>
          <Table
            columnExtensions={columnExtensions}
            rowComponent={HoverableTableRow}
          />
        </div>

        {orderable && (
          <TableColumnReordering
            defaultOrder={this.props.columns.map(column => column.name)}
          />
        )}

        <TableHeaderRow showSortingControls={sortable} />

        <TableColumnVisibility
          defaultHiddenColumnNames={this.props.defaultHiddenColumnNames}
        />
        {choosable && <Toolbar />}
        {choosable && <ColumnChooser />}

        {paginable && <PagingPanel pageSizes={pagesSize} />}
      </Grid>
    );
  }

  render() {
    const { error, isFetching, isFetched } = this.props;

    if (error) {
      return <Error />;
    }

    if (isFetching) {
      return <Loading />;
    }

    return <React.Fragment>{isFetched && this.renderGrid()}</React.Fragment>;
  }
}

export default withRouter(DataGrid);
