import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IosSwitchMaterialUi from 'ios-switch-material-ui';
import MenuIcon from '@material-ui/icons/Menu';
import { Brightness4Outlined as ToggleDarkModeIcon } from '@material-ui/icons/';
import Account from './Account';
import useEagerConnect from '../../hooks/useEagerConnect';

const navigationLinks = [
  { name: 'Trade', href: '/trade' },
  { name: 'Stake', href: '/stake' },
  { name: 'Borrow', href: '/borrow' },
  { name: 'Farm', href: '/farm' },
];

const useStyles = makeStyles((theme) => ({
  link: {
    marginRight: 20,
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: '150px',
    height: 30,
    [theme.breakpoints.down('xs')]: {
      fontSize: 0,
    },
  },
  img: {
    width: 30,
    marginRight: 10,
  },
  mgRight: {
    marginRight: 20,
  },
  customSide: {
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.type == 'dark' ? 'black' : 'white',
  },
  customIcon: {
    color: theme.type == 'dark' ? 'white' : 'black',
  },
  customMenu: {
    color: theme.type == 'dark' ? 'white' : 'black',
    width: '25px',
    marginRight: '20px',
  },
  linkSide: {
    justifyContent: 'center',
  },
  layout: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 'auto',
  },
  customText: {
    textDecoration: 'none',
    color: theme.type == 'dark' ? 'white' : 'black',
  },
}));

// const ConnectWallet = dynamic(() => import('./Account'), {
//     ssr: false,
// });

export default function Header({ toggleMode, darkMode }) {
  const theme = useTheme();
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const triedToEagerConnect = useEagerConnect();

  return (
    <AppBar style={{ background: darkMode ? 'white' : 'black' }} elevation={0}>
      <Container maxWidth={false}>
        <ToolBar disableGutters>
          <Hidden mdUp>
            <MenuIcon
              onClick={() => setOpen(true)}
              className={styles.customMenu}
            />
          </Hidden>
          <div className={styles.layout}>
            <a href={'/'} className={styles.customText}>
              <div className={styles.title}>
                <img src="/logo.png" alt="logo" className={styles.img} />
                <Typography variant="h6">Forward</Typography>
              </div>
            </a>
            <Hidden mdDown>
              {navigationLinks.map((item) => (
                <Link
                  className={`${styles.link} ${styles.customIcon}`}
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
          </div>
          <Hidden xsDown>
            <Account triedToEagerConnect={triedToEagerConnect} />
            {darkMode ? (
              <ToggleDarkModeIcon
                htmlColor={theme.custom.palette.iconColor}
                className={styles.mgRight}
              />
            ) : (
              <img
                src="/icons/moon-stars.svg"
                alt="logo"
                className={styles.mgRight}
              />
            )}
            <IosSwitchMaterialUi
              colorKnobOnLeft="#5269d8"
              onChange={toggleMode}
            />
          </Hidden>
        </ToolBar>
      </Container>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <div className={styles.customSide}>
          <div
            onClick={() => setOpen(false)}
            onKeyPress={() => setOpen(false)}
            role="button"
            tabIndex={0}
          >
            <IconButton>
              <CloseIcon className={styles.customIcon} />
            </IconButton>
          </div>
          <Divider />
          <List>
            {navigationLinks.map((item) => (
              <ListItem key={item.name} className={styles.linkSide}>
                <Link
                  className={styles.customIcon}
                  variant="button"
                  underline="none"
                  href={item.href}
                >
                  {item.name}
                </Link>
              </ListItem>
            ))}
          </List>
        </div>
      </SwipeableDrawer>
    </AppBar>
  );
}
