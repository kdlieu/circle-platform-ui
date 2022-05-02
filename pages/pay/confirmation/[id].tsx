import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useRouter } from "next/router";
import PaymentConfirmation from "../../../components/payment/PaymentConfirmation";
// let data = require("/Users/khanglieu/Documents/circle-business-platform/test/invoicePreview.json"); //(with path)

const Post = ({ data }: any) => {
  // const router = useRouter();
  // const { id } = router.query;
  return (
    <Container >
      <Box py={4}>
        <CssBaseline />
        <PaymentConfirmation invoiceData={data}/>
      </Box>
    </Container>
  );
};

export default Post;

// This gets called on every request
export async function getServerSideProps(context) {
  const { id } = context.query;

  const res = await axios
  .post("http://localhost:8000/invoice/search", {url: id})

  const data = await res.data[0];
  return { props: { data } }
}
