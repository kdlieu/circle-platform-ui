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
const drawerWidth = 240;

const navLinks = [
  { text: "Create Invoice", link: "/invoice" },
  { text: "View All Invoices", link: "/invoices" },
  { text: "Client List", link: "/clients" },
];

// export default function MainNav(props) {
//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar
//         position="fixed"
//         sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
//       >
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div">
//             CircleBusiness
//           </Typography>
//           <Image src="/public/vercel.svg" width={30} height={30}/>

//         </Toolbar>

//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             boxSizing: "border-box",
//           },
//         }}
//         variant="permanent"
//         anchor="left"
//       >
//         <Toolbar />
//         <Divider />
//         <List>
//           {navLinks.map((nav, index) => (
//             <Link href={nav.link}>
//               <ListItem button key={nav.text}>
//                 <ListItemIcon>
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={nav.text} />
//               </ListItem>
//             </Link>
//           ))}
//         </List>
//         <Divider />
//         {/* <List>
//           {["All mail", "Trash", "Spam"].map((text, index) => (
//             <ListItem button key={text}>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List> */}
//       </Drawer>
//       <Box
//         component="main"
//         sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
//       >
//         <Toolbar />
//         <Container>{props.mainPage}</Container>
//       </Box>
//     </Box>
//   );
// }

export default function MainNav(props) {
  console.log(props);
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

          {props.showHeader ? (
            <>
              <Typography sx={{ minWidth: 100 }}>Balance</Typography>
              <Typography sx={{ minWidth: 100 }}>Profile</Typography>
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
            <></>
          )}
        </Toolbar>
      </AppBar>
      {props.showHeader ? (
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
        <Container>{props.mainPage}</Container>
      </Box>
    </Box>
  );
}
