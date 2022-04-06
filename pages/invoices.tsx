import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InvoicesTable from "../components/invoice/invoicesTable";
let data = require('/Users/khanglieu/Documents/circle-business-platform/test/invoiceRows.json'); //(with path)

function Invoices({data} : any) {
  return (
    <div>
      <Paper>
        <Typography
          variant="h4"
          style={{ textAlign: "center" }}
          component="div"
          pt={2}
        >
          Invoices Table
        </Typography>
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

  return {props: {data}};
}
