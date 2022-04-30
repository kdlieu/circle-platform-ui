import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import PaymentConfirmation from "../../../components/payment/PaymentConfirmation";
// let data = require("/Users/khanglieu/Documents/circle-business-platform/test/invoicePreview.json"); //(with path)

const Post = ({ data }: any) => {
  // const router = useRouter();
  // const { id } = router.query;
  console.log("data",data);
  return (
    <Container >
      <Box py={4}>
        <CssBaseline />
        <PaymentConfirmation confirmationNumber={data}/>
      </Box>
    </Container>
  );
};

export default Post;

// This gets called on every request
export async function getServerSideProps(context) {
  const { id } = context.query;
console.log(id);
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

  return { props: { data:id } };
}
