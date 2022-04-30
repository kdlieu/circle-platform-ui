import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
export default function PaymentConfirmation(props){

    console.log(props);

    return(
        <Box style={{textAlign:"center"}}>
          <Image src="/check.png" height={150} width={150}></Image>
          <Typography variant="h2">
              Payment Received
          </Typography>
          
          <Typography variant="h6">
              Thank you, your payment has been successful. A confirmation email has been sent to 
          </Typography>
          <Typography variant="h6">
              Your confirmation number is: {props.confirmationNumber}
          </Typography>
        </Box> 
    )
}
