import * as React from "react";
import { DataGrid, GridApi, GridCellValue } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

const columns = [
  { field: "id", headerName: "Invoice ID", width: 130 },
  { field: "clientName", headerName: "Client Name", width: 170 },
  { field: "invoiceDate", headerName: "Invoice Date", width: 170 },
  { field: "status", headerName: "Status", width: 170 },

  {
    field: "notify",
    headerName: "Notify",
    width: 150,
    renderCell: (params: any) => {
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

      return (
        <Button variant="outlined" onClick={onClick}>
          Notify
        </Button>
      );
    },
  },
];

interface InvoiceData {
  purchaserName: string;
  purchaserAddress: string;
  purchaserEmail: string;
  lineItems: LineItem[];
  id: number;
}
interface LineItem {
  name: string;
  quantity: number;
  rate: number;
  total: number;
  key: number;
}
const emptyInvoice = (): InvoiceData => ({
  id: 0,
  purchaserName: "",
  purchaserAddress: "",
  purchaserEmail: "",
  lineItems: [],
});
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function createData(name, quantity, rate, total) {
    return { name, quantity, rate, total };
  }
  
  const rows = [
    createData('2x4 Plywood', 2, 20.0, 40.0),
    createData('PVC Pipes', 10, 5.0, 50.0)

  ];
// TO-DO: Add data interface
export default function InvoicesTable(data: any) {
  const [open, setOpen] = React.useState(false);
  const [curInvoice, setCurInvoice] = React.useState(emptyInvoice());

  const handleOpen = (e: any) => {
    // TO-DO: Fetch invoice by ID here
    setCurInvoice({
      ...curInvoice,
      purchaserName: "ACME",
      purchaserAddress: "123 Main Street",
      purchaserEmail: "ACME@acme.org",
    });
    console.log(e);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  console.log(data.rows);
  return (
    <Box px={4} py={4} height={400}>
      <DataGrid
        rows={data.rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onCellClick={(e) => handleOpen(e)}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Invoice Preview
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <pre style={{ fontFamily: "inherit" }}>
              {`${curInvoice.purchaserName}\n`}
              {`${curInvoice.purchaserAddress}\n`}
              {`${curInvoice.purchaserEmail}\n`}
            </pre>
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Rate</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">${row.rate}</TableCell>
                    <TableCell align="right">${row.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </Box>
  );
}
