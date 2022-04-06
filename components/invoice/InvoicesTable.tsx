import * as React from 'react';
import { DataGrid, GridApi, GridCellValue } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const columns = [
  { field: 'id', headerName: 'Invoice ID', width: 130 },
  { field: 'clientName', headerName: 'Client Name', width: 170 },
  { field: 'invoiceDate', headerName: 'Invoice Date', width: 170 },

  {field: 'notify', headerName: 'Notify', width: 150, renderCell: (params: any)=> {
        const onClick = (e: any) => {
            e.stopPropagation();
            const api: GridApi = params.api;
            const thisRow: Record<string, GridCellValue> = {};
            api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
            return alert(JSON.stringify(thisRow, null, 4));
  
        };

        return <Button variant="outlined" onClick={onClick}>Notify</Button>;

   }}

];

const rows = [
  { id: 2342342342, clientName: "ACME Corporation", invoiceDate: "04/01/2022"},
  { id: 2342322342, clientName: "ACME Corporation",  invoiceDate: "04/05/2022"},

];

// TO-DO: Add data interface
export default function InvoicesTable(data:any) {
    console.log(data.rows);
  return (
    <Box px={4} py={4} height={400}>

      <DataGrid
        rows={data.rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Box>
  );
}

