import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InvoiceForm from "../components/invoice/InvoiceForm";

function Invoice() {
    return (
        <div>
            <Paper>
            <Typography
                  variant="h4"
                  style={{ textAlign: "center" }}
                  component="div"
                  py={1}
                >
                    Create Invoice
                </Typography>
          <InvoiceForm/>
          </Paper>
        </div>
    );
  }
  
  export default Invoice;
  