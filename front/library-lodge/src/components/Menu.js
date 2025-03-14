import {
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon, ListItemText,
    styled,
    Menu as MuiMenu,
    MenuItem,
    alpha,
} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React, {useState} from "react";
import {logout} from "../redux/profileSlice";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import SettingsIcon from "@mui/icons-material/Settings";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import EditProfileDialog from "./EditProfileDialog";
import {setAlert, setFileDetail, setSettingDialogOpen} from "../redux/envSlice";
import ShareIcon from '@mui/icons-material/Share';
import LibraryDialog from "./LibraryDialog";


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const StyledMenu = styled((props) => (
    <MuiMenu
        elevation={0}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function Menu({drawerMenuOpen, setDrawerMenuOpen}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const  newMenuOpen = Boolean(anchorEl)
    const handleNewMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleNewMenuClose = () => {
        setAnchorEl(null);
    };


    const handleLogout = () => {
        dispatch(logout()).unwrap()
            .then((res) => {
                navigate('/login');
            })
            .catch((message) => {
                dispatch(setAlert({message: message, severity: "error"}));
            });
    }
    const handleSettings = () => {
        setDrawerMenuOpen(false);
        dispatch(setSettingDialogOpen(true));
    }

    const [profileDialogOpen, setProfileDialogOpen] = useState(false);
    const handleProfile = () => {
        setDrawerMenuOpen(false);
        setProfileDialogOpen(true);
    }

    const handleHome = () => {
        setDrawerMenuOpen(false);
        navigate('/');
    }

    const handleSharedWithMe = () => {
        setDrawerMenuOpen(false);
        navigate('/shared-with-me');
    }

    const [newLibraryDialogOpen, setNewLibraryDialogOpen] = useState(false);
    const handleNewLibrary = () => {
        setNewLibraryDialogOpen(true);
    }

    const handleUpload = () => {
        dispatch(setFileDetail(-1))
        handleNewMenuClose();
        setDrawerMenuOpen(false);
    }

    return (
        <Drawer
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={drawerMenuOpen}
        >
            <DrawerHeader
                sx={{
                    display: 'flex',
                    direction: 'row-reverse ',
                    justifyContent: 'space-between',

                }}
            >
                <Button
                    onClick={handleNewMenuClick}
                    variant="contained"
                    startIcon={
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                            <path fill="#34A853" d="M16 16v14h4V20z"></path>
                            <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
                            <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
                            <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
                            <path fill="none" d="M0 0h36v36H0z"></path>
                        </svg>
                    }
                    sx={{
                        textTransform: 'none',
                        borderRadius: "100px",
                        backgroundColor: "white",
                        color: "inherit",
                        '& svg': {
                            transition: 'transform 0.4s ease-in-out',
                        },
                        '&:hover': {
                            backgroundColor: "white",
                            '& svg': {
                                transform: 'rotate(135deg) scale(1.1)',
                            }
                        }
                    }}
                >
                    New
                </Button>
                <StyledMenu
                    anchorEl={anchorEl}
                    open={newMenuOpen}
                    onClose={handleNewMenuClose}
                    sx={{
                        top: -16,
                        left: -8,
                    }}
                >
                    <MenuItem onClick={handleUpload} disableRipple>
                        <FileUploadIcon />
                        Upload New File
                    </MenuItem>
                    <Divider/>
                    <MenuItem onClick={handleNewLibrary} disableRipple>
                        <CreateNewFolderIcon />
                        New Library
                    </MenuItem>
                    <LibraryDialog open={newLibraryDialogOpen} onClose={() => setNewLibraryDialogOpen(false)} />
                </StyledMenu>
                <IconButton
                    onClick={() => setDrawerMenuOpen(false)}
                    disableRipple
                    sx={{
                        transition: 'transform 0.4s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.5) translateX(-10px)',
                        }
                    }}
                >
                    <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {[{"text": "Home", "icon": <HomeIcon />, "onClickHandler": handleHome},
                  {"text": "Shared with me", "icon": <ShareIcon />, "onClickHandler": handleSharedWithMe},
                  {"text": "Profile", "icon": <ProfileIcon />, "onClickHandler": handleProfile},
                  {"text": "Settings", "icon": <SettingsIcon />, "onClickHandler": handleSettings}].map(({text, icon, onClickHandler}) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={onClickHandler}>
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                <ListItem key="Log out" disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Log out" />
                    </ListItemButton>
                </ListItem>
            </List>
            {profileDialogOpen && <EditProfileDialog open={profileDialogOpen} onClose={() => setProfileDialogOpen(false)}/>}
        </Drawer>
    )
}