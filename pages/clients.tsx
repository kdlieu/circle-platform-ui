import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ClientTable from "../components/client/ClientTable";

function Clients() {
    return (
        <div>
            <Paper>
            <Typography
                  variant="h4"
                  style={{ textAlign: "center" }}
                  component="div"
                  py={1}
                >
                    Client List
                </Typography>
          <ClientTable/>
          </Paper>
        </div>
    );
  }
  
  export default Clients;
  