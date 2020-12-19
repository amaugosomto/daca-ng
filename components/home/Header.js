import React, {useEffect} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import cx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {Button} from '@material-ui/core';
import { useRouter as router } from 'next/router'

const isActive = (href) => {
  return router().pathname === href;
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'block'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  button: {
    marginRight: theme.spacing(2),
    '& a': {fontWeight: "400"},
    '&:hover a': {
      color: "#6D0EB5",
      fontWeight: "500"
    }
  },
  active: {
      color: "#6D0EB5",
      '& a': {
        fontWeight: 500
      }
  },
  donateBtn: {
    backgroundColor: "#6D0EB5 !important",
    color: "#fff"
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  image: {
    width: `${theme.spacing(1)}rem`
  }
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link href="/">
          <a>Home</a>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href="/">
          <a>About Us</a>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href="/">
          <a>Live Events</a>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href="/">
          <a>Download Messages</a>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href="/">
          <a>Store</a>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href="/">
          <a>Contact Us</a>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href="/">
          <a>Donate</a>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link href="/">
              <img src="/images/daca-logo.png" className={classes.image} alt="daca logo"/>
            </Link>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button size="small" className={cx(classes.button, isActive('/') ? classes.active : '')} color="inherit">
              <Link href="/">
                <a>Home</a>
              </Link>
            </Button>
            <Button size="small" className={cx(classes.button, isActive('aboutus') ? classes.active : '')} color="inherit">
              <Link href="/">
                <a>About Us</a>
              </Link>
            </Button>
            <Button size="small" className={cx(classes.button, isActive('events') ? classes.active : '')} color="inherit">
              <Link href="/">
                <a>Live Events</a>
              </Link></Button>
            <Button size="small" className={cx(classes.button, isActive('download') ? classes.active : '')} color="inherit">
              <Link href="/">
                <a>Download Messages</a>
              </Link></Button>
            <Button size="small" className={cx(classes.button, isActive('store') ? classes.active : '')} color="inherit">
              <Link href="/">
                <a>Store</a>
              </Link></Button>
            <Button size="small" className={cx(classes.button, isActive('contactus') ? classes.active : '')} color="inherit">
              <Link href="/">
                <a>Contact Us</a>
              </Link>
            </Button>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <SearchIcon />
            </IconButton>
            <Button variant="contained" className={classes.donateBtn}>
              Donate
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
