import {
    Avatar, Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, TextField
} from "@mui/material";
import {Delete, Person, Close, Done, Add} from "@mui/icons-material";
import {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {fetchProfileData} from "../redux/profileSlice"; // TODO: change to delete and add share
import {useDispatch} from "react-redux";
import Alert from "./Alert";
import _ from "lodash";


function ShareDialog({id, open, onClose}) {
    const [users, setUsers] = useState([
        {id: 1, username: 'John Doe'},
        {id: 2, username: 'Jane Doe'},
        {id: 3, username: 'John Smith'},
        {id: 4, username: 'Jane Smith'},
    ]); // TODO: get from redux
    const [isAdding, setIsAdding] = useState(false);
    const dispatch = useDispatch();
    const [alert, setAlert] = useState(null);

    const handleDelete = (username) => {
        return () => {
            dispatch(fetchProfileData({username: username})) // TODO: change to delete share
                .then((res) => {
                    if (true || res.payload && res.meta.requestStatus) {
                        setAlert({"severity": "success",
                            "message": "Stopped sharing with " + username});
                        setUsers(users.filter((user) => user.username !== username));
                    } else {
                        setAlert({"severity": "error",
                            "message": res.payload ? res.payload.data : res.error.message});
                    }
                })
        }
    }

    const formik = useFormik({
        validateOnMount: true,
        initialValues: {
            username: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Required').notOneOf(_.map(users, 'username'),
                                            "Already shared with this user"),
        }),
        onSubmit: values => {
            dispatch(fetchProfileData(values))
                .then((res) => {
                    if (true || res.payload && res.meta.requestStatus) { // TODO: change to share
                        setAlert({"severity": "success",
                            "message": "Shared With " + values.username});
                        setUsers([...users, {id: users.length && users[users.length - 1].id + 1, username: values.username}])
                    } else {
                        setAlert({"severity": "error",
                            "message": res.payload ? res.payload.data : res.error.message});
                    }
                })
        },
    });

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                Profile
            </DialogTitle>
            <DialogContent>
                <List>
                    {users.map((user) => {
                            return (
                                <ListItem
                                    key={user.id}
                                    sx={{
                                        border: '1px solid #e0e0e0',
                                        borderRadius: 3,
                                        width: 500,
                                        marginBottom: 1,
                                    }}
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete" onClick={handleDelete(user.username)}>
                                            <Delete/>
                                        </IconButton>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar>
                                            <Person/>
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={user.username}
                                    />
                                </ListItem>
                            )
                        })
                    }
                    <ListItem
                        component="form"
                        onSubmit={formik.handleSubmit}
                        key={-1}
                        sx={{
                            border: isAdding ? 'none' : '1px solid #e0e0e0',
                            borderRadius: 3,
                            width: 500,
                            marginBottom: 1,
                            height: isAdding ? 90 : 50,
                            transition: 'height 0.5s',
                        }}
                        secondaryAction={
                            isAdding
                            ? (<Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                <IconButton
                                    edge="end"
                                    onClick={() => setIsAdding(false)}
                                    sx={{
                                        color: 'error.main',
                                        '&:hover': {
                                            backgroundColor: 'rgba(255, 0, 0, 0.04)',
                                        }
                                    }}
                                >
                                    <Close />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    type="submit"
                                    sx={{
                                        color: 'success.main',

                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 255, 0, 0.04)',
                                        }
                                    }}
                                >
                                    <Done/>
                                </IconButton>
                            </Box>)
                            : null
                        }
                    >
                        {
                            isAdding
                            ? <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                            : (<IconButton
                                    onClick={() => setIsAdding(true)}
                                    sx={{
                                        width: '100%',
                                        // remove effect
                                        '&:hover': {
                                            backgroundColor: 'transparent',
                                        },
                                        fontSize: 20,
                                    }}
                                >
                                <Add sx={{fontSize: 30}} />
                            </IconButton>)
                        }
                        </ListItem>
                </List>
            </DialogContent>
            {alert && <Alert severity={alert.severity}
                             message={alert.message}
                             resetFunc={() => setAlert(null)}/>}
        </Dialog>
    )
}

export default ShareDialog;