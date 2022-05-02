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
let states = require("../../static/states.json"); //(with path)
import fs from "fs";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

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
  const [newClient, setNewClient] = useState({});
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
    axios.get("http://localhost:8000/client/all").then(({ data }) => {
      setClientData(data);
    });
  }, [open]);

  const handleStateChange = (event) => {
    setNewClient({
      ...newClient,
      state: event.target.value,
    });
  };
  const onAddClient = () => {
    // TO-DO: POST call add client
    // TO-DO: Validation
    axios
      .post("http://localhost:8000/client/create", {
        ...newClient,
        client_id: 0,
      })
      .then((res) => {
        handleClose();
        setSnackOpen(true);
      });
    handleClose();
  };
  return (
    <Paper>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Typography
            variant="h5"
            style={{ textAlign: "left" }}
            component="div"
            py={2}
            px={4}
          >
            Client List
          </Typography>
        </Grid>
        <Grid item xs={4}>
        </Grid>

        <Grid item xs={2}>
        <Button onClick={handleOpen} variant="contained">Add Client</Button>

        </Grid>
      </Grid>

      <Divider />
      <Box pb={4} height={500}       style={{
        overflow: "hidden",
        overflowY: "scroll" // added scroll
      }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  size="small"
                  style={{ fontWeight: "bold" }}
                >
                  #
                </TableCell>
                <TableCell
                  align="center"
                  size="small"
                  style={{ fontWeight: "bold" }}
                >
                  Name
                </TableCell>
                <TableCell
                  align="center"
                  size="small"
                  style={{ fontWeight: "bold" }}
                >
                  Address
                </TableCell>
                <TableCell
                  align="center"
                  size="small"
                  style={{ fontWeight: "bold" }}
                >
                  Phone
                </TableCell>
                <TableCell
                  align="center"
                  size="small"
                  style={{ fontWeight: "bold" }}
                >
                  Email
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientData.map((row, index) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  hover={true}
                >
                  <TableCell align="center">{index}</TableCell>
                  <TableCell align="center" o>
                    {row.name}
                  </TableCell>
                  <TableCell align="center">
                    {row.address_1}, {row.address_2}, {row.city}, {row.state}
                  </TableCell>
                  <TableCell align="center">{row.phone}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Button onClick={handleOpen}>Add Client</Button> */}
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
                  label="Address 1"
                  variant="standard"
                  onChange={(e: any) =>
                    setNewClient({
                      ...newClient,
                      address_1: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Address 2"
                  variant="standard"
                  onChange={(e: any) =>
                    setNewClient({
                      ...newClient,
                      address_2: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="City"
                  variant="standard"
                  onChange={(e: any) =>
                    setNewClient({
                      ...newClient,
                      city: e.target.value,
                    })
                  }
                />
              </Grid>
              {/* <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="State"
                variant="standard"
                onChange={(e: any) =>
                  setNewClient({
                    ...newClient,
                    state: e.target.value,
                  })
                }
              />
            </Grid> */}
              <Grid item xs={12}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>State</InputLabel>
                  <Select
                    variant="standard"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={newClient.state}
                    label="State"
                    onChange={handleStateChange}
                  >
                    {states.map((state) => (
                      <MenuItem value={state}>{state}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Zipcode"
                variant="standard"
                onChange={(e: any) =>
                  setNewClient({
                    ...newClient,
                    zipcode: e.target.value,
                  })
                }
              />
            </Grid> */}
              <Grid item xs={12}>
                <NumberFormat
                  variant="standard"
                  id="zipcode"
                  label="Zipcode"
                  fullWidth
                  value={newClient.zipcode}
                  customInput={TextField}
                  format="#####"
                  onChange={(e: any) =>
                    setNewClient({ ...newClient, zipcode: e.target.value })
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
                  onChange={(e: any) =>
                    setNewClient({ ...newClient, phone: e.target.value })
                  }
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
                      client_email: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="contained" onClick={onAddClient}>
                  Add Client
                </Button>
              </Grid>
            </Grid>
          </Box>
          
        </Modal>
        <Snackbar
          open={snackOpen}
          autoHideDuration={6000}
          onClose={handleSnackClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Client Created Successfully
          </Alert>
        </Snackbar>
      </Box>
      </Paper>

  );
}
