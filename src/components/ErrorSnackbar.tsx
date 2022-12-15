import React from 'react';
import { Snackbar, Alert } from '@mui/material';

type ErrorSnackbarProps = {
    onClose: (val: boolean) => void,
    displayError: boolean,
    message: string,
};

const ErrorSnackbar = ({ onClose, displayError, message } : ErrorSnackbarProps) => {
    return (
        <Snackbar open={displayError} autoHideDuration={6000} onClose={() => onClose(false)}>
            <Alert onClose={() => onClose(false)} severity="error" sx={{ width: '100%' }}>
            { message }
            </Alert>
        </Snackbar>
    )
};

export default ErrorSnackbar;
