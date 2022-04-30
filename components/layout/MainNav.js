import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { Button } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { MenuItem } from "@mui/material";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import { Avatar } from "@mui/material";
import { useAuth } from "../../context/auth-context";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import Router, { useRouter } from "next/router";
import {ProtectedRoute} from "../ProtectedRoute"
const drawerWidth = 240;

const navLinks = [
  { text: "Create Invoice", link: "/invoice" },
  { text: "View All Invoices", link: "/invoices" },
  { text: "Client List", link: "/clients" },
];

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




export default function MainNav(props) {
  const { isAuth, login, logout } = useAuth();
  const isAuthenticated = isAuth();
  const [loginOpen, setLoginOpen] = React.useState(false);
  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const handleLogin = () => {
    login();
    setLoginOpen(false);
    handleLoginClose();
    props.router.push({
      pathname: "/dashboard",
      query: { returnUrl: props.router.asPath },
    });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <Link href={"/"}>
            <Image src="/octopus.svg" height={50} width={50}></Image>
          </Link>
          <Link href={"/"}>
            <Typography variant="h4" noWrap style={{ flex: 1 }} component="div">
              Octopay
            </Typography>
          </Link>

          {props.showHeader && isAuthenticated ? (
            <>
              <Typography sx={{ minWidth: 100 }}>Balance</Typography>
              <Typography sx={{ minWidth: 100 }}>Profile</Typography>
              <Button onClick={logout}>Logout</Button>
              <Tooltip title="Account settings">
                <IconButton
                  size="small"
                  // aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  // aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    src="/jollibee.png"
                    sx={{ width: 32, height: 32 }}
                  ></Avatar>
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Button onClick={handleLoginOpen}>Login</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      {props.showHeader && isAuthenticated ? (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {navLinks.map((nav, index) => (
                <Link href={nav.link}>
                  <ListItem button key={nav.text}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={nav.text} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Box>
        </Drawer>
      ) : (
        <></>
      )}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <ProtectedRoute router={props.router}>
          <Container>{props.mainPage}</Container>
        </ProtectedRoute>
      </Box>
      <Modal
        open={loginOpen}
        onClose={handleLoginClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Login
          </Typography> */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Username"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" onClick={handleLogin}>
                Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
