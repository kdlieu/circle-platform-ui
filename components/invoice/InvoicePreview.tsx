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
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import InputMask from "react-input-mask";
import NumberFormat from "react-number-format";
import axios from "axios";
import { createMessage, encrypt, readKey } from "openpgp";
import { useRouter } from "next/router";

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

// Object to be encrypted
interface CardDetails {
  number?: string; // required when storing card details
  cvv?: string; // required when cardVerification is set to cvv
}

// Encrypted result
interface EncryptedValue {
  encryptedData: string;
  keyId: string;
}

interface PaymentRequest {
  email: string;
  phone: string;
  session_id: string;
  address_ip: string;
  name: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  encrypted_data: string;
  exp_month: number;
  exp_year: number;
  amount: string;
  currency: string;
  description: string;
  invoice_id: string;
}

const emptyPaymentRequest = (): PaymentRequest => ({
  email: "",
  phone: "",
  session_id: "",
  address_ip: "",
  name: "",
  address_1: "",
  address_2: "",
  city: "",
  state: "",
  zipcode: "",
  country: "",
  encrypted_data: "",
  exp_month: 0,
  exp_year: 0,
  amount: "",
  currency: "",
  description: "",
});

const emptyEncryptedValue = (): EncryptedValue => ({
  encryptedData: "",
  keyId: "",
});
export default function InvoicePreview({ invoiceData }: any) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [publicKeyData, setPublicKeyData] = useState(emptyEncryptedValue);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [paymentInfo, setPaymentInfo] = useState({
    amount: "",
    creditCard: "",
    cvv: "",
    expiryDate: "",
    cardholderName: "",
    addressLine1: "",
    addressLine2: "",
    postalCode: "",
    city: "",
    state: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    axios.get("http://localhost:8000/payments/public_key").then((res) => {
      setPublicKeyData(res.data.data);
    });
  }, []);

  async function encryptCardData(
    dataToEncrypt: CardDetails
  ): Promise<EncryptedValue> {
    const keyId = publicKeyData.keyId;
    const decodedPublicKey = await readKey({
      armoredKey: atob(publicKeyData.publicKey),
    });
    const message = await createMessage({
      text: JSON.stringify(dataToEncrypt),
    });
    return encrypt({
      message,
      encryptionKeys: decodedPublicKey,
    }).then((ciphertext) => {
      return {
        encryptedData: btoa(ciphertext),
        keyId,
      };
    });
  }

  const onProcessPayment = async () => {
    const cardDetails: CardDetails = {
      number: paymentInfo.creditCard.replace(/ /g, ""),
      cvv: paymentInfo.cvv,
    };
    encryptCardData(cardDetails).then((encrypted: EncryptedValue) => {
      const paymentRequest = buildPaymentRequest(encrypted);
      axios
        .post("http://localhost:8000/payments/pay_card", paymentRequest)
        .then((res) => {
          // TO-DO - Add polling for confirmed here
          const confirmation_number = "10930-02329-923829";
          router.push({
            pathname: `/pay/confirmation/${invoiceData.url}`,
            query: { returnUrl: router.asPath },
          });
        });
    });
  };

  const buildPaymentRequest = (
    encryptedValue: EncryptedValue
  ): PaymentRequest => {
    let paymentRequest: PaymentRequest = emptyPaymentRequest();
    paymentRequest.email = paymentInfo.email;
    paymentRequest.phone = "+14155555555";
    paymentRequest.invoice_id = invoiceData.invoice_id;
    // TO-DO: Add sessionId generator and address_ip
    paymentRequest.session_id = "PLACEHOLDER";
    paymentRequest.address_ip = "244.28.239.130";
    paymentRequest.name = paymentInfo.cardholderName;
    paymentRequest.address_1 = paymentInfo.addressLine1;
    paymentRequest.address_2 = paymentInfo.addressLine2;
    paymentRequest.city = paymentInfo.city;
    paymentRequest.state = paymentInfo.state;
    paymentRequest.zipcode = paymentInfo.postalCode;
    paymentRequest.country = "US"; // TO-DO: Add field
    paymentRequest.encrypted_data = encryptedValue.encryptedData;
    [paymentRequest.exp_month, paymentRequest.exp_year] = paymentInfo.expiryDate
      .split("/")
      .map(Number);
    paymentRequest.amount = invoiceData.total;
    paymentRequest.currency = "USD";
    paymentRequest.description = invoiceData.invoice_id.toString();

    return paymentRequest;
  };

  const emptyPaymentRequest = (): PaymentRequest => ({
    email: "",
    phone: "",
    session_id: "",
    address_ip: "",
    name: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    encrypted_data: "",
    exp_month: 0,
    exp_year: 0,
    amount: "",
    currency: "",
    description: "",
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
              <TableCell align="right">Item</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
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
                <TableCell align="right">{row.item}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">${row.price}</TableCell>
                <TableCell align="right">${row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container spacing={2} style={{ textAlign: "center" }}>
        <Grid item xs={12} alignItems="center">
          <Button
            variant="contained"
            size="large"
            onClick={handleOpen}
            disabled={invoiceData.status == "p"}
          >
            {invoiceData.status == "p" ? "Paid" : "Pay Now"}
          </Button>
        </Grid>
        <Grid item xs={12} alignItems="center">
          {invoiceData.status == "p" ? (
            <Typography variant="body1">
              Invoice has been paid in full
            </Typography>
          ) : null}
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
                onChange={(e: any) =>
                  setPaymentInfo({ ...paymentInfo, creditCard: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <NumberFormat
                variant="standard"
                id="cc"
                label="cvv"
                fullWidth
                value={paymentInfo.cvv}
                customInput={TextField}
                format="###"
                onChange={(e: any) =>
                  setPaymentInfo({ ...paymentInfo, cvv: e.target.value })
                }
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
                format="##/20##"
                onChange={(e: any) =>
                  setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Cardholder Name"
                variant="standard"
                onChange={(e: any) =>
                  setPaymentInfo({
                    ...paymentInfo,
                    cardholderName: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Address Line 1"
                variant="standard"
                onChange={(e: any) =>
                  setPaymentInfo({
                    ...paymentInfo,
                    addressLine1: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Address Line 2"
                variant="standard"
                onChange={(e: any) =>
                  setPaymentInfo({
                    ...paymentInfo,
                    addressLine2: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Postal Code"
                variant="standard"
                onChange={(e: any) =>
                  setPaymentInfo({ ...paymentInfo, postalCode: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="City"
                variant="standard"
                onChange={(e: any) =>
                  setPaymentInfo({ ...paymentInfo, city: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="State"
                variant="standard"
                onChange={(e: any) =>
                  setPaymentInfo({ ...paymentInfo, state: e.target.value })
                }
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
                format="+###########"
                onChange={(e: any) =>
                  setPaymentInfo({ ...paymentInfo, phone: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Email"
                variant="standard"
                onChange={(e: any) =>
                  setPaymentInfo({ ...paymentInfo, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={onProcessPayment}
              >
                Pay Now
              </Button>{" "}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
