import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import NumberFormat from "react-number-format";
let data = require("/Users/khanglieu/Documents/circle-business-platform/test/clients.json"); //(with path)
import fs from 'fs';
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function ClientTable() {
  const [clientData, setClientData] = useState([]);
  const [newClient, setNewClient]= useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [snackOpen, setSnackOpen] = useState(false);
  const handleSnackClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };
  useEffect(() => {
    setClientData(data);
    console.log(data);
  }, []);

  const onAddClient = () => {
    // TO-DO: POST call add client
    // TO-DO: Validation
    handleClose();
    setSnackOpen(true);

  }
  return (
    <Box px={4} py={4} height={400}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientData.map((row, index) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.address}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleOpen}>Add Client</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Client
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Name"
                variant="standard"
                onChange={(e: any) =>
                  setNewClient({
                    ...newClient,
                    name: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Address"
                variant="standard"
                onChange={(e: any) =>
                  setNewClient({
                    ...newClient,
                    address: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <NumberFormat
                variant="standard"
                id="cc"
                label="Phone"
                fullWidth
                value={newClient.phone}
                customInput={TextField}
                format="(###)-###-####"
                onChange={(e: any) => setNewClient({ ...newClient, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Email"
                variant="standard"
                onChange={(e: any) =>
                  setNewClient({
                    ...newClient,
                    email: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
                <Button fullWidth variant="contained" onClick={onAddClient}>Add Client</Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical:"bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackClose} severity="success" sx={{ width: "100%" }}>
          Client Created Successfully
        </Alert>
      </Snackbar>
    </Box>
  );
}
