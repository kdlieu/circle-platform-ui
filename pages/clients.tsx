import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ClientTable from "../components/client/ClientTable";

function Clients() {
    return (
        <div>
            {/* <Paper>
            <Typography
                  variant="h5"
                  style={{ textAlign: "left" }}
                  component="div"
                  py={2}
                  px={4}
                >
                    Client List
                </Typography>
                <Divider/> */}
          <ClientTable/>
          {/* </Paper> */}
        </div>
    );
  }
  
  export default Clients;
  