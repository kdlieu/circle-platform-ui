import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { useState, useEffect } from "react";
import {
  Alert,
  Box,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  selectClasses,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import NumberFormat from "react-number-format";
let data = require("/Users/khanglieu/Documents/circle-business-platform/test/clients.json"); //(with path)

export default function InvoiceForm() {
  interface InvoiceData {
    invoice_id: number
    client_id: number,
    invoice_date: string,
    line_items: LineItem[];
    status: string,
    pay_date: string,
    total: number,
    client_info: ClientInfo
  }
  interface LineItem {
    item: string;
    quantity: number;
    price: number;
    total: number;
    key: number;
  }
  
  interface ClientInfo {
    client_id: number,
    name: string,
    phone: string,
    address_1: string, 
    address_2: string,
    city: string 
    state: string,
    zipcode: string,
    email: string
  }
  const emptyInvoice = (): InvoiceData => ({
    invoice_id: 0,
    client_id: 0,
    invoice_date: "",
    line_items: [],
    status: "g",
    pay_date: "",
    total: 0,
    client_info: emptyClient()
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
    email: ""
  });

  
  const emptyLineItem = (): LineItem => ({
    item: "",
    quantity: 0,
    price: 0,
    total: 0,
    key: Math.random()
  })

  const [clientList, setClientList] = useState([]);
  const [selectedClient, setSelectedClient] = useState({});
  const [invoice, setInvoice] = useState(emptyInvoice());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8000/client/all").then(({ data }) => {
      setClientList(data);
      console.log(data);
    });
  }, []);
  const onAddLineItem = (): void => {
    const newInvoice = {
      ...invoice,
      line_items: [...invoice.line_items, emptyLineItem()],
    };
    setInvoice(newInvoice);
  };

  const toDollars = (x) => {
    return Number.parseFloat(x).toFixed(2);
  };
  const handleLineItemChange = (
    event: any,
    key: LineItem["key"],
    field: string
  ) => {
    let data = { ...invoice };
    let line_items = data.line_items as any;
    let index = line_items.findIndex((obj: { key: number }) => obj.key === key);
    line_items[index][field] = event?.target.value;
    line_items[index]["total"] =
      line_items[index]["quantity"] * line_items[index]["price"];
    const total = line_items
      .map((item) => item.total)
      .reduce((prev, curr) => prev + curr, 0);
    setInvoice({ ...invoice, total: total, line_items: line_items });
  };

  const deleteLineItem = (key: number) => {
    let data = { ...invoice };
    let line_items = data.line_items as any;
    line_items = line_items.filter((lineItem: LineItem) => {
      return lineItem.key !== key;
    });
    setInvoice({ ...invoice, line_items: line_items });
  };

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleClientChange = (event) => {
    setSelectedClient(event.target.value);
  };
  const onSave = () => {
    console.log(invoice);
    // TO-DO: ADD REST LOGIC HERE

    // Convert Quantity and Rate to numbers
    let data = { ...invoice };
    let line_items = data.line_items;
    line_items = line_items.map((lineItem: LineItem) => ({
      ...lineItem,
      quantity: Number.parseFloat(lineItem.quantity),
      price: Number.parseFloat(lineItem.price),
    }));
    
    const invoiceRequest = {...invoice, line_items: line_items, client_info: selectedClient, client_id: selectedClient.client_id};

    console.log(invoiceRequest)
    axios
      .post("http://localhost:8000/invoice/create", invoiceRequest)
      .then((res) => {
        setOpen(true);
      });
  };

  return (
    <Box px={4} py={2}>
      <Grid container spacing={2} alignItems="center">
        <>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Client</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedClient}
                label="Client"
                onChange={handleClientChange}
              >
                {clientList.map((client) => (
                  <MenuItem value={client}>
                    {client.name} {client.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <NumberFormat
              variant="outlined"
              id="cc"
              label="Date"
              fullWidth
              value={invoice.pay_date}
              customInput={TextField}
              format="####-##-##"
              onChange={(e: any) =>
                setInvoice({ ...invoice, pay_date: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={1}>
            <Typography
              variant="button"
              style={{ textAlign: "center" }}
              component="div"
            >
              #
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography
              variant="button"
              style={{ textAlign: "center" }}
              component="div"
            >
              Item
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography
              variant="button"
              style={{ textAlign: "center" }}
              component="div"
            >
              Quantity
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              variant="button"
              style={{ textAlign: "center" }}
              component="div"
            >
              Price
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography
              variant="button"
              style={{ textAlign: "center" }}
              component="div"
            >
              Total
            </Typography>
          </Grid>
          <Grid item xs={1}></Grid>
        </>
        {invoice.line_items.map((lineItem, index) => {
          return (
            <>
              <Grid item xs={1}>
                <Typography
                  variant="button"
                  style={{ textAlign: "center" }}
                  component="div"
                >
                  {index + "."}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                {" "}
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Item"
                  variant="outlined"
                  onChange={(e) =>
                    handleLineItemChange(e, lineItem.key, "item")
                  }
                />
              </Grid>
              <Grid item xs={1}>
                {" "}
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Quantity"
                  variant="outlined"
                  onChange={(e) =>
                    handleLineItemChange(e, lineItem.key, "quantity")
                  }
                />
              </Grid>
              <Grid item xs={2}>
                {" "}
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                  value={lineItem.price}
                  onChange={(e) =>
                    handleLineItemChange(e, lineItem.key, "price")
                  }
                />
              </Grid>
              <Grid item xs={2}>
                {" "}
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="standard-adornment-amount">
                    Total
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    id="outlined-basic"
                    label="Total"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    disabled
                    value={lineItem.total}
                    // onChange={(e) =>
                    //   handleLineItemChange(e, lineItem.key, "total")
                    // }
                  ></OutlinedInput>
                </FormControl>
              </Grid>
              <Grid item xs={1}>
                <HighlightOffRoundedIcon
                  onClick={(e) => deleteLineItem(lineItem.key)}
                />
              </Grid>
            </>
          );
        })}
        <Grid item xs={1}></Grid>
        <Grid item xs={5}></Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <Typography
            variant="button"
            style={{ textAlign: "center" }}
            component="div"
          >
            Subtotal
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            variant="button"
            style={{ textAlign: "center" }}
            component="div"
          >
            ${toDollars(invoice.total)}
          </Typography>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="outlined" onClick={onAddLineItem}>
            Add Line Item
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="outlined" onClick={onSave}>
            Save
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Save Successful
        </Alert>
      </Snackbar>
    </Box>
  );
}
