import {AppBar, Toolbar, SvgIcon, Link, Box, InputBase} from "@mui/material";
import {ReactComponent as logo} from "../assets/drive.svg";
import {Link as RouterLink} from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import {logout} from "../redux/profileSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import Alert from "./Alert";

export default function Header() {
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

    return (
        <AppBar position="static">
            <Toolbar>
                <Link variant="h6"  component={RouterLink} to='/' sx={{
                    flexGrow: 2,
                    display: "flex",
                    justifyContent: "flex-start",
                    color: "inherit",
                    textDecoration: "none",
                }}>
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




