import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import InputMask from "react-input-mask";
import NumberFormat from "react-number-format";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function InvoicePreview({ invoiceData }: any) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [paymentInfo, setPaymentInfo] = useState({
    amount: "",
    creditCard: "",
    cvc:"",
    expiryDate: "",
    cardholderName:"",
    addressLine1:"",
    addressLine2: "",
    postalCode: "",
    city: "",
    state: "",
    phone: "",
    email: ""
  });

  return (
    <Box px={4} py={2}>
      <Typography id="modal-modal-title" variant="h4" component="h2">
        Invoice ID: {invoiceData.invoice_id}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <pre style={{ fontFamily: "inherit" }}>
          {`${invoiceData.client_info.name}\n`}
          {`${invoiceData.client_info.address_1}\n`}
          {`${invoiceData.client_info.email}\n`}
        </pre>
      </Typography>
      <TableContainer>
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
            {invoiceData.line_items.map((row: any, index: any) => (
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
      <Grid container style={{ textAlign: "center" }}>
        <Grid item xs={12} alignItems="center">
          <Button variant="contained" size="large" onClick={handleOpen}>
            Pay Now
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Pay with card
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">
                  Amount
                </InputLabel>
                <Input
                  id="standard-adornment-amount"
                  value={invoiceData.total}
                  disabled
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <NumberFormat
                variant="standard"
                id="cc"
                label="Card Number"
                fullWidth
                value={paymentInfo.creditCard}
                customInput={TextField}
                format="#### #### #### ####"
                onChange={(e: any) => setPaymentInfo({ ...paymentInfo, creditCard: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <NumberFormat
                variant="standard"
                id="cc"
                label="CVC"
                fullWidth
                value={paymentInfo.cvc}
                customInput={TextField}
                format="###"
                onChange={(e: any) => setPaymentInfo({ ...paymentInfo, cvc: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <NumberFormat
                variant="standard"
                id="cc"
                label="Expiry Date"
                fullWidth
                value={paymentInfo.expiryDate}
                customInput={TextField}
                format="##/##"
                onChange={(e: any) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Cardholder Name"
                  variant="standard"
                  onChange={(e: any) => setPaymentInfo({ ...paymentInfo, cardholderName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Address Line 1"
                  variant="standard"
                  onChange={(e: any) => setPaymentInfo({ ...paymentInfo, addressLine1: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Address Line 2"
                  variant="standard"
                  onChange={(e: any) => setPaymentInfo({ ...paymentInfo, addressLine2: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Postal Code"
                  variant="standard"
                  onChange={(e: any) => setPaymentInfo({ ...paymentInfo, postalCode: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="City"
                  variant="standard"
                  onChange={(e: any) => setPaymentInfo({ ...paymentInfo, city: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="State"
                  variant="standard"
                  onChange={(e: any) => setPaymentInfo({ ...paymentInfo, state: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
              <NumberFormat
                variant="standard"
                id="cc"
                label="Phone"
                fullWidth
                value={paymentInfo.phone}
                customInput={TextField}
                format="(###)-###-####"
                onChange={(e: any) => setPaymentInfo({ ...paymentInfo, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Email"
                  variant="standard"
                  onChange={(e: any) => setPaymentInfo({ ...paymentInfo, email: e.target.value })}
                />
              </Grid>
            <Grid item xs={12}>
            <Button variant="contained" size="large" fullWidth>
            Pay Now
          </Button>            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
