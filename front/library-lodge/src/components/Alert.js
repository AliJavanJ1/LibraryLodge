import {Alert as MuiAlert, Snackbar} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {setAlert} from "../redux/envSlice";


const Alert = () => {
    const alert = useSelector((state) => state.env.alert);
    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setAlert(null))
    }

    return alert ? (
        <Snackbar open={Boolean(alert)} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert onClose={() => {dispatch(setAlert(null))}} severity={alert.severity} sx={{ width: '100%' }}>
                {alert.message}
            </MuiAlert>
        </Snackbar>
    ) : null;
}

export default Alert;