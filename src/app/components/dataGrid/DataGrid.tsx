import React from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

type DataGridProps = {
  columns: Array<object>
  rowData: Array<object>
}

const constructDataGridColumns = (gridColumns: Array<object>) =>
  gridColumns.map((element: any) =>
    <AgGridColumn field={element.field} headerName={element.header} key={element.header}/>);

export const DataGrid = ({ columns, rowData }: DataGridProps) => {
  const onGridReady = (params: any) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <div className="ag-theme-alpine data-grid-container">
      <AgGridReact
        onGridReady={onGridReady}
        suppressDragLeaveHidesColumns={true}
        rowData={rowData}>
        { constructDataGridColumns(columns) }
      </AgGridReact>
    </div>
  );
};