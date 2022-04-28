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
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const statusMap = { g: "Generated", v: "Voided", p: "Paid" };

interface InvoiceData {
  invoice_id: number;
  client_id: number;
  invoice_date: string;
  line_items: LineItem[];
  status: string;
  pay_date: string;
  total: number;
  client_info: ClientInfo;
}
interface LineItem {
  item: string;
  quantity: number;
  price: number;
  total: number;
  key: number;
}

interface ClientInfo {
  client_id: number;
  name: string;
  phone: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zipcode: string;
  email: string;
}
const emptyInvoice = (): InvoiceData => ({
  invoice_id: 0,
  client_id: 0,
  invoice_date: "",
  line_items: [],
  status: "",
  pay_date: "",
  total: 0,
  client_info: emptyClient(),
});

const emptyClient = (): ClientInfo => ({
  client_id: 0,
  name: "",
  phone: "",
  address_1: "",
  address_2: "",
  city: "",
  state: "",
  zipcode: "",
  email: "",
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
// function createData(name, quantity, rate, total) {
//     return { name, quantity, rate, total };
//   }

//   const rows = [
//     createData('2x4 Plywood', 2, 20.0, 40.0),
//     createData('PVC Pipes', 10, 5.0, 50.0)

//   ];
// TO-DO: Add data interface
export default function InvoicesTable(data: any) {
  // console.log(data);
  const [open, setOpen] = React.useState(false);
  const [curInvoice, setCurInvoice] = React.useState(emptyInvoice());
  const [snackOpen, setSnackOpen] = React.useState(false);

  const columns = [
    { field: "invoice_id", headerName: "Invoice ID", width: 130 },
    {
      field: "status",
      headerName: "Status",
      width: 170,
      renderCell: (params) => {
        return `${statusMap[params.value]}`;
      },
    },
    { field: "invoice_date", headerName: "Invoice Date", width: 170 },
    {
      field: "total",
      headerName: "Total",
      width: 170,
      valueFormatter: (params) => {
        return `$${params.value}`;
      },
    },
    {
      field: "url",
      headerName: "url",
      width: 170,
      hide: true,
    },
    {
      field: "client_info",
      headerName: "client_info",
      width: 170,
      hide: true,
    },
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
            .forEach((c) => {
              return (thisRow[c.field] = params.getValue(params.id, c.field));
            });

          return onNotify(thisRow);
        };

        return (
          <Button variant="outlined" onClick={onClick}>
            Notify
          </Button>
        );
      },
    },
  ];

  const handleOpen = (e: any) => {
    const row = e.row;
    // TO-DO: Fetch invoice by ID here
    setCurInvoice({
      ...row,
    });
    console.log(row);
    setOpen(true);
  };

  const onNotify = (rowData: any): void => {
    console.log(rowData);

    axios
      .put("http://localhost:8000/admin/send_email", {
        email: rowData!.client_info!.email,
        invoice_url: rowData.url,
      })
      .then((res) => {
        setSnackOpen(true);
      });
  };

  const handleSnackClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  const handleClose = () => setOpen(false);
  return (
    <Box px={4} py={4} height={400}>
      <DataGrid
        getRowId={(row) => row.invoice_id}
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
              {`Buyer:\n`}
              {`${curInvoice.client_info.name}\n`}
              {`${curInvoice.client_info.address_1}\n`}
              {`${
                curInvoice.client_info.address_2 != null
                  ? curInvoice.client_info.address_2 + "\n"
                  : ""
              }`}
              {`${curInvoice.client_info.city},${curInvoice.client_info.state},${curInvoice.client_info.zipcode}\n`}
              {`${curInvoice.client_info.phone}\n`}
              {`${curInvoice.client_info.email}\n`}
            </pre>
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {curInvoice.line_items.map((row: LineItem, index: number) => (
                  <TableRow
                    key={row.key}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index}
                    </TableCell>
                    <TableCell align="right">{row.item}</TableCell>
                    <TableCell align="right">{row.quantity}</TableCell>
                    <TableCell align="right">${row.price}</TableCell>
                    <TableCell align="right">${row.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Client notified by email
        </Alert>
      </Snackbar>
    </Box>
  );
}
