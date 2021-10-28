import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import dynamic from 'next/dynamic';
import IosSwitchMaterialUi from 'ios-switch-material-ui';
import {
    Brightness4Outlined as ToggleDarkModeIcon,
} from '@material-ui/icons/';

const navigationLinks = [
  { name: "Trade", href: "/trade" },
  { name: "Stake", href: "/stake" },
  { name: "Borrow", href: "/borrow" },
  { name: "Farm", href: "/farm" }
];

const useStyles = makeStyles((theme) => ({
  link: {
    marginRight: 20,
  },
  title: {
    display: 'flex',
    flexDirection: "row",
    marginRight: "auto",
    height: 30,
    // color: '#784ffe',
    [theme.breakpoints.down('xs')]: {
      fontSize: 0,
      // display: 'none'
    },
  },
  img: {
    width: 30,
    marginRight: 10,
  },
  mgRight: {
    marginRight: 20
  }
}));

const ConnectWallet = dynamic(() => import('./ConnectWallet'), {
    ssr: false,
});

export default function Header({ toggleMode, darkMode }) {
  const theme = useTheme();
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <AppBar elevation={0}>
      <Container maxWidth={false}>
        <ToolBar disableGutters>
        <Hidden mdUp>
            <IconButton onClick={() => setOpen(true)}>
                <MenuIcon />
            </IconButton>
        </Hidden>
        <div className={styles.title}>
          <img src="/logo.png" alt="logo" className={styles.img} />

          <Typography variant="h6">
            Forward
          </Typography>
        </div>
          <Hidden mdDown>
            {navigationLinks.map((item) => (
              <Link
                className={styles.link}
                color="textPrimary"
                variant="button"
                underline="none"
                href={item.href}
                key={item.name}
              >
                {item.name}
              </Link>
            ))}
          </Hidden>
          <Hidden xsDown>
            <ConnectWallet />
            {darkMode ? (
                <ToggleDarkModeIcon htmlColor={theme.custom.palette.iconColor} className={styles.mgRight} />
            ) : (
                <img src="/icons/moon-stars.svg" alt="logo" className={styles.mgRight} />
            )}
            <IosSwitchMaterialUi
            colorKnobOnLeft="#5269d8"
            onChange={toggleMode}/>
          </Hidden>
        </ToolBar>
      </Container>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <div
          onClick={() => setOpen(false)}
          onKeyPress={() => setOpen(false)}
          role="button"
          tabIndex={0}
        >
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {navigationLinks.map((item) => (
            <ListItem key={item.name}>
              <Link
                className={styles.link}
                color="textPrimary"
                variant="button"
                underline="none"
                href={item.href}
              >
                {item.name}
              </Link>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    </AppBar>
  );
}