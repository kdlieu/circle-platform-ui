import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InvoiceForm from "../components/invoice/InvoiceForm";
import Image from "next/image";
function Invoice() {
    return (
        <div>
            <Paper>
            <Typography
                  variant="h5"
                  style={{ textAlign: "left" }}
                  component="div"
                  py={2}
                  px={4}
                >
                    Create Invoice
                </Typography>
                <Divider />

          <InvoiceForm/>
          </Paper>
        </div>
    );
  }
  
  export default Invoice;
  