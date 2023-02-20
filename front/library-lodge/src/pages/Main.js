import {Fragment, useState} from "react";
import Header from "../components/Header";
import {Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
import Menu from "../components/Menu";
import {Box, styled} from "@mui/material";
import SettingDialog from "../components/settingDialog";
import Dashboard from "./Dashboard";


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


    return isLoggedIn
        ? (<Fragment>
            <Header setDrawerMenuOpen={setDrawerMenuOpen} drawerMenuOpen={drawerMenuOpen}/>
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
                        <Route path="/" element={<Dashboard/>}/>
                    </Routes>
                </MainBody>
            </Box>
            <SettingDialog/>
        </Fragment>)
        : <Navigate to="/login"/>;
}