import {Box, IconButton, TextField, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

export default function EditableText({isEditing, setIsEditing, name, label, autoComplete, value, onChange, error, helperText}) {
    const handleEdit = () => {
        setIsEditing(true);
    }

    function handleClose() {
        setIsEditing(false);
    }

    return (<Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 80,
    }}>
        {
            isEditing
                ? <>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        autoFocus
                        label={label}
                        name={name}
                        autoComplete={autoComplete}
                        value={value}
                        onChange={onChange}
                        error={error}
                        helperText={helperText}
                        fullWidth
                        sx={{
                            paddingRight: '1rem',
                        }}
                    />
                    <IconButton onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </>
                : <>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            width: "100%",
                            height: "70%",
                            border: '1px solid #e0e0e0',
                            borderRadius: '5px',
                            padding: '0 1rem',
                            marginRight: '1rem',
                        }}
                    >
                        <Typography variant="body1">
                            {label}:
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                marginLeft: '1rem',
                            }}
                        >
                            {value}
                        </Typography>
                    </Box>
                    <IconButton
                        onClick={handleEdit}
                    >
                        <EditIcon/>
                    </IconButton>
                </>
        }
    </Box>)
}