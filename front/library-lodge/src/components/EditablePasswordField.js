import {Box, Button, IconButton, TextField} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React from "react";
import {Fingerprint} from "@mui/icons-material";

export default function EditableText({isEditing,
                                      setIsEditing,
                                      current_password_value,
                                      current_password_onChange,
                                      current_password_error,
                                      current_password_helperText,
                                      new_password_value,
                                      new_password_onChange,
                                      new_password_error,
                                      new_password_helperText,
                                      new_password_confirmation_value,
                                      new_password_confirmation_onChange,
                                      new_password_confirmation_error,
                                      new_password_confirmation_helperText}) {
    const handleEdit = () => {
        setIsEditing(true);
    }

    function handleClose() {
        setIsEditing(false);
    }

    return (
        <Box
            sx={{
                height: !isEditing ? 40 : 240,
                overflow: 'hidden',
                transition: 'height 0.5s',
            }}
        >
            {
                isEditing
                    ? <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                width: "100%",
                                marginRight: '1rem',
                            }}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="old_password"
                                label="Current Password"
                                type="password"
                                autoComplete="current-password"
                                value={current_password_value}
                                onChange={current_password_onChange}
                                error={current_password_error}
                                helperText={current_password_helperText}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="New Password"
                                type="password"
                                autoComplete="new-password"
                                value={new_password_value}
                                onChange={new_password_onChange}
                                error={new_password_error}
                                helperText={new_password_helperText}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password_confirmation"
                                label="New Password Confirmation"
                                type="password"
                                autoComplete="new-password"
                                value={new_password_confirmation_value}
                                onChange={new_password_confirmation_onChange}
                                error={new_password_confirmation_error}
                                helperText={new_password_confirmation_helperText}
                            />
                        </Box>
                        <IconButton
                            onClick={handleClose}
                        >
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                    : <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: "100%",
                        }}
                    >
                        <Button
                            endIcon={<Fingerprint />}
                            onClick={handleEdit}
                            size="large"
                        >
                            change password
                        </Button>
                    </Box>
            }
        </Box>
    );
}