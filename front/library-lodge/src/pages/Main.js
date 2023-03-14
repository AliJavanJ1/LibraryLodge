import {Fragment, useEffect, useState} from "react";
import Header from "../components/Header";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Menu from "../components/Menu";
import {Box, styled} from "@mui/material";
import SettingDialog from "../components/settingDialog";
import Dashboard from "./Dashboard";
import {useEffectOnce, useLocation} from "react-use";
import {setLocation} from "../redux/envSlice";
import _ from "lodash";


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

const UpdateLocation = () => {
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    const libraryDetails = useSelector((state) => state.library_details);
    const navigate = useNavigate();

    useEffect(() => {
        const isShared = pathname.startsWith('/shared-with-me');
        const pathname_without_shared = pathname.replace('/shared-with-me', '');
        const path_parts = _.chain(pathname_without_shared.split('/')).compact().value();
        const library_keys = _.map(path_parts, (path_part) => {
            return _.findKey(libraryDetails, (library) => library.name.toLowerCase() === decodeURIComponent(path_part).toLowerCase()
                && library.shared === isShared);
        });
        if (_.some(library_keys, (library_key) => library_key === undefined)) {
            console.warn('Invalid path, redirecting to /')
            navigate('/')
            dispatch(setLocation([]))
        }else{
            dispatch(setLocation(library_keys))
        }
    }, [pathname]);
}

export default function Main() {
    const isLoggedIn = useSelector((state) => state.profile || true); // TODO: remove " || true"
    const [drawerMenuOpen, setDrawerMenuOpen] = useState(false);
    const profile = useSelector((state) => state.profile);
    const navigate = useNavigate();

    useEffectOnce(() => {
        if (!profile) {
            navigate('/login');
        }
    });

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
                    <UpdateLocation/>
                    <Routes>
                        <Route path="shared-with-me/*" element={<Dashboard shared={true}/>}/>
                        <Route path="/*" element={<Dashboard/>}/>
                    </Routes>
                </MainBody>
            </Box>
            <SettingDialog/>
        </Fragment>)
        : <Navigate to="/login"/>;
}