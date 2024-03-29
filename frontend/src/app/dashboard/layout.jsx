'use client'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from "next/link";
import DashboardIcon from '@mui/icons-material/Dashboard';
import React from "react";
import {usePathname} from "next/navigation";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CalculateIcon from '@mui/icons-material/Calculate';
import StoreIcon from '@mui/icons-material/Store';
import PeopleIcon from '@mui/icons-material/People';
import DialogSelectCafetery from "@/app/dashboard/ipv/DialogSelectCafetery";

const drawerWidth = 200;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

function Copyright(props) {
    return (
        <Typography variant="body2"
                    color="text.secondary"
                    align="center"
                    {...props}
        >
            {'Copyright © '}
            <Link href="https://www.etecsa.cu/" underline="hover">
                {'Etecsa"'}
            </Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function PersistentDrawerLeft({children}) {
    const theme = useTheme();
    const pathname = usePathname();
    const [open, setOpen] = React.useState(true);
    const [openModal, setOpenModal] = React.useState(false);

    const handleSetOpenModal = () => {
        setOpenModal(!openModal)
    }

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div>
            <Box sx={{ display: 'flex' }} >
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <div className='d-flex w-100 align-items-center justify-content-between'>
                            <Typography variant='h6' noWrap component='div'>
                                CrisInventario
                            </Typography>

                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >

                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </Toolbar>

                    <Divider className='bg-dark'/>
                    <List>
                        <ListItem disablePadding>
                            <Link href={'/dashboard/'}
                                  className={`link-sidebar ${pathname === '/dashboard' ? 'active' : ''}`}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DashboardIcon />
                                    </ListItemIcon>
                                    <ListItemText>Inicio</ListItemText>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem disablePadding>
                            <Link href={'/dashboard/cafeteria/'}
                                  className={`link-sidebar ${pathname === '/dashboard/cafeteria/' ? 'active' : ''}`}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <StoreIcon />
                                    </ListItemIcon>
                                    <ListItemText>Cafeterias</ListItemText>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem disablePadding>
                            <Link href={'/dashboard/dependent/'}
                                  className={`link-sidebar ${pathname === '/dashboard/dependent/' ? 'active' : ''}`}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PeopleIcon />
                                    </ListItemIcon>
                                    <ListItemText>Dependientes</ListItemText>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                        <ListItem disablePadding>
                            <Link href={'/dashboard/producto/'}
                                  className={`link-sidebar ${pathname === '/dashboard/producto/' ? 'active' : ''}`}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ProductionQuantityLimitsIcon />
                                    </ListItemIcon>
                                    <ListItemText>Productos</ListItemText>
                                </ListItemButton>
                            </Link>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton onClick={handleSetOpenModal}>
                                <ListItemIcon>
                                    <CalculateIcon />
                                </ListItemIcon>
                                <ListItemText className={`link-sidebar ${pathname === '/dashboard/ipv' ? 'active' : ''}`}>IPV</ListItemText>
                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <Link href={'/dashboard/resumen/'}
                                  className={`link-sidebar ${pathname === '/dashboard/resumen' ? 'active' : ''}`}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LibraryBooksIcon />
                                    </ListItemIcon>
                                    <ListItemText>Resumen</ListItemText>
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    </List>
                </Drawer>

                <Main open={open}  sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    height: '100vh',
                    overflow: 'auto',
                }}>
                    <DrawerHeader />
                        {children}
                    <DrawerHeader />
                </Main>

            </Box>


            {
                openModal &&
                    <DialogSelectCafetery
                        handleSetOpenModal={handleSetOpenModal}
                        openModal={openModal}
                    />
            }


            </div>

    );
}

