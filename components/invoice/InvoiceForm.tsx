import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { useState } from "react";
import { Alert, Box, Snackbar } from "@mui/material";

export default function InvoiceForm() {
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

  const emptyLineItem = (): LineItem => ({
    name: "",
    quantity: 0,
    rate: 0,
    total: 0,
    key: Math.random(),
  });
  const emptyInvoice = (): InvoiceData => ({
    id: 0,
    purchaserName: "",
    purchaserAddress: "",
    purchaserEmail: "",
    lineItems: [],
  });

  const [invoice, setInvoice] = useState(emptyInvoice());
  const [open, setOpen] = useState(false);

  const onAddLineItem = (): void => {
    const newInvoice = {
      ...invoice,
      lineItems: [...invoice.lineItems, emptyLineItem()],
    };
    setInvoice(newInvoice);
  };

  const handleLineItemChange = (
    event: any,
    key: LineItem["key"],
    field: string
  ) => {
    let data = { ...invoice };
    let lineItems = data.lineItems as any;
    let index = lineItems.findIndex((obj: { key: number }) => obj.key === key);
    lineItems[index][field] = event?.target.value;
    // setInvoice({...invoice, lineItems: lineItems});
  };

  const deleteLineItem = (key: number) => {
    let data = { ...invoice };
    let lineItems = data.lineItems as any;
    lineItems = lineItems.filter((lineItem: LineItem) => {
      return lineItem.key !== key;
    });
    setInvoice({ ...invoice, lineItems: lineItems });
  };

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const onSave = () => {
    setOpen(true);
    console.log(invoice);
    // TO-DO: ADD REST LOGIC HERE
  };

  return (
    <Box px={4} py={2}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <TextField
            fullWidth
            id="purchaserName"
            label="Purchaser"
            variant="outlined"
            value={invoice.purchaserName}
            onChange={(e) =>
              setInvoice({ ...invoice, purchaserName: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            id="email"
            label="Email"
            variant="outlined"
            value={invoice.purchaserEmail}
            onChange={(e) =>
              setInvoice({ ...invoice, purchaserEmail: e.target.value })
            }
          />
        </Grid>
        <>
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
              <Grid item xs={2}>
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
                  Rate
                </Typography>

              </Grid>
              <Grid item xs={1}>
              <Typography
                  variant="button"
                  style={{ textAlign: "center" }}
                  component="div"
                >
                  Total
                </Typography>

              </Grid>
              <Grid item xs={1}>

              </Grid>
            </>
        {invoice.lineItems.map((lineItem, index) => {
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
                    handleLineItemChange(e, lineItem.key, "name")
                  }
                />
              </Grid>
              <Grid item xs={2}>
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
                  label="Rate"
                  variant="outlined"
                  onChange={(e) =>
                    handleLineItemChange(e, lineItem.key, "rate")
                  }
                />
              </Grid>
              <Grid item xs={1}>
                {" "}
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Total"
                  variant="outlined"
                  onChange={(e) =>
                    handleLineItemChange(e, lineItem.key, "total")
                  }
                />
              </Grid>
              <Grid item xs={1}>
                <HighlightOffRoundedIcon
                  onClick={(e) => deleteLineItem(lineItem.key)}
                />
              </Grid>
            </>
          );
        })}
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
        anchorOrigin={{ vertical:"bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Save Successful
        </Alert>
      </Snackbar>
    </Box>
  );
}
