import React, { useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ForumIcon from '@material-ui/icons/Forum';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Chat from './chat/Chat'
import { Link } from "react-router-dom"
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useLocation } from 'react-router-dom'

import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import { spacing } from '@material-ui/system';
import { Drawer } from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
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
}));


export default function PrimarySearchAppBar(props) {
    const loc = useLocation()
    const [role, setRole] = useState("Mentor")
    const [viewName, setViewName] = useState(loc.pathname === "/dash" ? "events" : loc.pathname === "/groupings" ? "groupings" : "");

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [drawerAnchorEl, setDrawerAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isDrawerOpen = Boolean(drawerAnchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    useEffect(() => {
        setViewName(loc.pathname === "/dash" ? "events" : loc.pathname === "/groupings" ? "groupings" : "")
    }, [loc.pathname])

    const handleRole = (event, newRole) => {
        setRole(newRole);
    };

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
        //   OverlayScrollbars(document.getElementsByClassName("MuiMenu-paper")[0], {overflowBehavior : {
        //     x : "hidden",
        //     y : "scroll"
        // },});
    };

    const handleDrawerOpen = (event) => {
        setDrawerAnchorEl(event.currentTarget);
    };

    const handleDrawerClose = () => {
        setDrawerAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        // <OverlayScrollbarsComponent options={{nativeScrollbarsOverlaid: {initialize: true}, scrollbars: { autoHide: "move"}}}>
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem component={Link} to="/profile">Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Sign Out</MenuItem>
        </Menu>
        // </OverlayScrollbarsComponent>
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
            style={{ "overflowX": "hidden", }}
        >
            <MenuItem component={Link} to="/chat">
                <IconButton aria-label="show 4 new mails" color="inherit" >
                    <Badge badgeContent={4} color="secondary">
                        <ForumIcon />
                    </Badge>
                </IconButton>
                <p>Chat</p>
            </MenuItem>
            {/* <Popover
                {...bindPopover(popupStateMobile)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                modal={null}
                hideBackdrop={true}
                disableBackdropClick={true}
                disableAutoFocus={true}
                disableEnforceFocus={true}
            >
                <Box p={2}>
                    <Chat />
                </Box>
            </Popover> */}
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar className="ascent-gradient-anim" style={{ margin: 0, top: 0 }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <SwipeableDrawer
                        open={isDrawerOpen}
                        anchor="left"
                        onClose={handleDrawerClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <ToggleButtonGroup exclusive value={role} onChange={handleRole} aria-label="role" style={{ padding: 10, height: 40, width: 300 }}>
                            <ToggleButton value="Mentor" aria-label="Mentor">
                                <MenuItem onClick={handleDrawerClose}>Mentor</MenuItem>
                            </ToggleButton>
                            <ToggleButton value="Mentee" aria-label="Mentee">
                                <MenuItem onClick={handleDrawerClose}>Mentee</MenuItem>
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <MenuItem component={Link} to="/groupings" >Groupings</MenuItem>
                        <MenuItem component={Link} to="/dash" >Events</MenuItem>
                    </SwipeableDrawer>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {role + " - Ascademy - " + viewName}
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 4 new mails" color="inherit" component={Link} to="/chat">
                            <Badge badgeContent={4} color="secondary">
                                <ForumIcon />
                            </Badge>
                        </IconButton>
                        {/* <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Box p={2}>
                                <Chat />
                            </Box>
                        </Popover> */}
                        <IconButton aria-label="show 17 new notifications" color="inherit">
                            <Badge badgeContent={17} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>

                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>

            </AppBar>

            {renderMobileMenu}
            {renderMenu}

        </div>
    );
}