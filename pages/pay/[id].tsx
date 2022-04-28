import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useRouter } from "next/router";
import InvoicePreview from "../../components/invoice/InvoicePreview";

const Post = ({ data }: any) => {

  return (
    <Container >
      <Box py={4}>
        <CssBaseline />

        <Paper>
          <Box py={2}>
          <InvoicePreview invoiceData={data} />
        </Box>

        </Paper>
      </Box>
    </Container>
  );
};

export default Post;

// This gets called on every request
export async function getServerSideProps(context) {
  const { id } = context.query;
  // const router = useRouter();
  // const { id } = router.query;
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
  .post("http://localhost:8000/invoice/search", {url: id})

  const data = await res.data[0];
  return { props: { data } }

}
