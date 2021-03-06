import { Divider } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import axios from "axios";
import InvoicesTable from "../components/invoice/invoicesTable";

function Invoices({data} : any) {
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
          Invoices Table
        </Typography>
        <Divider/>
        <InvoicesTable rows={data} />
      </Paper>
    </div>
  );
}

export default Invoices;

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch(`https://.../data`)
  // const data = await res.json()

  // Pass data to the page via props
  // return { props: { data } }

  // const res = await fetch("invoiceRows.json", {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //   },
  // });
  // const data = await res.json();

  const res = await axios
  .get("http://localhost:8000/invoice/all");

const data = await res.data;

  return {props: {data}};
}
