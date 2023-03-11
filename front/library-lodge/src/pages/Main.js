import {Fragment, useEffect, useState} from "react";
import Header from "../components/Header";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Menu from "../components/Menu";
import {Box, styled} from "@mui/material";
import SettingDialog from "../components/settingDialog";
import Dashboard from "./Dashboard";
import ListItemContextMenu from "../components/ListItemContextMenu"; // TODO: remove this and use it for List Items
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

    const [listItemContextMenu, setListItemContextMenu] = useState({
        id: 1,
        open: false,
        mouseX: 0,
        mouseY: 0,
    }); // TODO: remove this and use it for List Items

    // useEffectOnce(() => {
    //     if (!profile) {
    //         navigate('/login');
    //     }
    // });
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