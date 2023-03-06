import {Fragment, useState} from "react";
import Header from "../components/Header";
import {Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import Menu from "../components/Menu";
import {Box, styled} from "@mui/material";
import SettingDialog from "../components/settingDialog";
import Home from "./Home";
import ListItemContextMenu from "../components/ListItemContextMenu"; // TODO: remove this and use it for List Items


const MainBody = styled('main', { shouldForwardProp: (prop) => prop !== 'drawerMenuOpen' })(
    ({ theme, drawerMenuOpen }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${240}px`,
        ...(drawerMenuOpen && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);


export default function Main() {
    const isLoggedIn = useSelector((state) => state.profile || true); // TODO: remove " || true"
    const [drawerMenuOpen, setDrawerMenuOpen] = useState(false);

    const [listItemContextMenu, setListItemContextMenu] = useState({
        id: 1,
        open: false,
        mouseX: 0,
        mouseY: 0,
    }); // TODO: remove this and use it for List Items
    const handleListItemContextMenu = (event) => { // TODO: remove this and use it for List Items
        event.preventDefault();
        setListItemContextMenu(
            listItemContextMenu.open === false
                ? {
                    id: 1,
                    open: true,
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                }
                : {
                    id: 1,
                    open: false,
                    mouseX: 0,
                    mouseY: 0,
                },
        );
    };
    const handleListItemContextMenuClose = () => { // TODO: remove this and use it for List Items
        setListItemContextMenu({
            id: 1,
            open: false,
            mouseX: 0,
            mouseY: 0,
        });
    };

    return isLoggedIn
        ? (<Fragment>
            <Box onContextMenu={handleListItemContextMenu} sx={{ cursor: 'context-menu' }}> {/* TODO: remove this box and ListItemContextMenu and use it for List Items */}
                <Header setDrawerMenuOpen={setDrawerMenuOpen} drawerMenuOpen={drawerMenuOpen}/>
                {/*<ListItemContextMenu contextMenu={listItemContextMenu} handleClose={handleListItemContextMenuClose}/>*/}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                }}
            >
                <Menu setDrawerMenuOpen={setDrawerMenuOpen} drawerMenuOpen={drawerMenuOpen}/>
                <MainBody drawerMenuOpen={drawerMenuOpen}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                    </Routes>
                </MainBody>
            </Box>
            <SettingDialog/>
        </Fragment>)
        : <Navigate to="/login"/>;
}