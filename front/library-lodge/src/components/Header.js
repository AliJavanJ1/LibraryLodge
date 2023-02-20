import {AppBar as MuiAppBar, Toolbar, SvgIcon, Link, Box, InputBase, styled} from "@mui/material";
import {ReactComponent as logo} from "../assets/drive.svg";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import {logout} from "../redux/profileSlice";
import {useDispatch} from "react-redux";
import {useState} from "react";
import Alert from "./Alert";
import {setSettingDialogOpen} from "../redux/envSlice";

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'menuOpen',
})(({ theme, menuOpen }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(menuOpen && {
        width: `calc(100% - ${240}px)`,
        marginLeft: `${240}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function Header({ setDrawerMenuOpen, drawerMenuOpen }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(null);

    const handleLogout = () => {
        dispatch(logout()).then((res) => {
            if (res.payload && res.payload.status === 200) {
                navigate('/login');
            }
            else {
                setError(res.payload ? res.payload.data : res.error.message);
            }
        });
    }
    const handleSettings = () => {
        setDrawerMenuOpen(false);
        dispatch(setSettingDialogOpen(true));
    }

    return (
        <AppBar position="static" menuOpen={drawerMenuOpen}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setDrawerMenuOpen(true)}
                    disableRipple
                    sx={{
                        fontSize: "25px",
                        mr: 2,
                        ...(drawerMenuOpen && { display: 'none' }),
                        transition: 'transform 0.4s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.3) translateX(5px)',
                        }
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Link variant="h6"
                      component={RouterLink}
                      to='/'
                      sx={{
                        flexGrow: 2,
                        display: "flex",
                        justifyContent: "flex-start",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                      onClick={() => setDrawerMenuOpen(false)}
                >
                    <SvgIcon component={logo} inheritViewBox sx={{
                        fontSize: 35,
                        marginRight: `10px`,
                    }}/>
                    Library Lodge
                </Link>
                <Box
                    variant="outlined"
                    size="large"
                    sx={{
                        borderRadius: "12px",
                        width: "400px",
                        height: "40px",
                        backgroundColor: "white",
                        transition: "background-color 0.2s ease-in-out",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                        }
                    }}
                >
                    <SearchIcon sx={{
                        ml: 2,
                        color: "primary.main",
                        fontSize: "30px",
                        marginRight: "10px",
                        transition: "transform 0.2s ease-in-out",
                        "&:hover": {
                            transform: "rotate(45deg) scale(1.1)",
                        }
                    }}/>
                    <InputBase
                        placeholder="Search..."
                    />
                </Box>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{
                        mr: 3,
                        ml: 3,
                    }}
                    disableRipple
                    onClick={handleSettings}
                >
                    <SettingsIcon
                        sx={{
                            fontSize: "27px",
                            transition: "transform 0.2s ease-in-out",
                            "&:hover": {
                                transform: "rotate(60deg) scale(1.2)",
                            }
                        }}
                    />
                </IconButton>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    disableRipple
                    onClick={handleLogout}
                >
                    <LogoutIcon
                        sx={{
                            fontSize: "25px",
                            transition: "transform 0.2s ease-in-out",
                            "&:hover": {
                                transform: "rotate(20deg) scale(1.1) translateX(5px)",
                            }
                        }}
                    />
                </IconButton>
            </Toolbar>
            {error && <Alert severity="error" message={error} resetFunc={() => setError(null)} />}
        </AppBar>
    );
}




