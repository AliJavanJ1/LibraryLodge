import React from 'react';
import {Alert as MuiAlert, Snackbar} from '@mui/material';



const Alert = ({severity, message, resetFunc}) => {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        resetFunc()
    }

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert onClose={() => {setOpen(false); resetFunc()}} severity={severity} sx={{ width: '100%' }}>
                {message}
            </MuiAlert>
        </Snackbar>
    );
}

export default Alert;