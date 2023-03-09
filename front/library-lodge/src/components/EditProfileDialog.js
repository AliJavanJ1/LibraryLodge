import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import EditableText from "./EditableText";
import EditablePasswordField from "./EditablePasswordField";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {editProfile, fetchProfileData} from "../redux/profileSlice";
import React, {useEffect, useState} from "react";
import Alert from "./Alert";


export default function EditProfileDialog({open, onClose}) {
    const [alert, setAlert] = useState(null);
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);
    const [usernameIsEditing, setUsernameIsEditing] = useState(false);
    const [emailIsEditing, setEmailIsEditing] = useState(false);
    const [passwordIsEditing, setPasswordIsEditing] = useState(false);
    const formik = useFormik({
        validateOnMount: true,
        initialValues: {
            username: profile.username,
            email: profile.email,
            old_password: '',
            password: '',
            password_confirmation: '',
        },
        validationSchema: Yup.object({
            username: usernameIsEditing
                      ? Yup.string().required('Required')
                      : Yup.string(),
            email: emailIsEditing
                   ? Yup.string().email('Invalid email address').required('Required')
                   : Yup.string(),
            old_password: passwordIsEditing
                          ? Yup.string().required('Required')
                          : Yup.string(),
            password: passwordIsEditing
                      ? Yup.string().required('Required')
                      : Yup.string(),
            password_confirmation: passwordIsEditing
                                   ? Yup.string()
                                        .required('Required')
                                        .oneOf([Yup.ref('password'), null],
                                                   'Passwords must match')
                                   : Yup.string(),
        }),
        onSubmit: values => {
            const result = {};
            if (usernameIsEditing) {
                result.username = values.username;
            }
            if (emailIsEditing) {
                result.email = values.email;
            }
            if (passwordIsEditing) {
                result.old_password = values.old_password;
                result.new_password = values.password;
            }
            dispatch(editProfile(result))
                .then((res) => {
                    if (res.payload && res.meta.requestStatus) {
                        // dispatch(fetchProfileData()) // TODO: should we fetch profile data here?
                        // TODO show success message
                        handleClose();
                    } else {
                        setAlert({"severity": "error",
                                        "message": res.payload ? res.payload.data : res.error.message});
                    }
                });

        },
    });

    useEffect(() => {
        if(!usernameIsEditing) {
            formik.setFieldValue('username', profile.username);
        }
        if(!emailIsEditing) {
            formik.setFieldValue('email', profile.email);
        }
        if(!passwordIsEditing) {
            formik.setFieldValue('old_password', '');
            formik.setFieldValue('password', '');
            formik.setFieldValue('password_confirmation', '');
        }
    }, [usernameIsEditing, emailIsEditing, passwordIsEditing, profile.username, profile.email]);

    const handleClose = () => {
        setUsernameIsEditing(false);
        setEmailIsEditing(false);
        setPasswordIsEditing(false);
        onClose();
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen={false}
            sx={{
                '& .MuiDialog-paper': {
                    width: '100%',
                }
            }}
        >
            <DialogTitle>
                Profile
            </DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent
                    dividers
                    sx={{
                        '&:first-child': {
                            paddingY: 0,
                        }
                    }}
                >
                    <EditableText
                        label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        autoComplete="username"
                        name="username"
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        isEditing={usernameIsEditing}
                        setIsEditing={setUsernameIsEditing}
                    />
                    <EditableText
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        autoComplete="email"
                        name="email"
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        isEditing={emailIsEditing}
                        setIsEditing={setEmailIsEditing}
                    />
                </DialogContent>
                <DialogTitle>
                    Password
                </DialogTitle>
                <DialogContent
                    dividers
                    sx={{
                        '&:first-child': {
                            paddingY: 0,
                        }
                    }}
                >
                    <EditablePasswordField
                        isEditing={passwordIsEditing}
                        setIsEditing={setPasswordIsEditing}
                        current_password_value={formik.values.old_password}
                        current_password_onChange={formik.handleChange}
                        current_password_error={formik.touched.old_password && Boolean(formik.errors.old_password)}
                        current_password_helperText={formik.touched.old_password && formik.errors.old_password}
                        new_password_value={formik.values.password}
                        new_password_onChange={formik.handleChange}
                        new_password_error={formik.touched.password && Boolean(formik.errors.password)}
                        new_password_helperText={formik.touched.password && formik.errors.password}
                        new_password_confirmation_value={formik.values.password_confirmation}
                        new_password_confirmation_onChange={formik.handleChange}
                        new_password_confirmation_error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                        new_password_confirmation_helperText={formik.touched.password_confirmation && formik.errors.password_confirmation}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button
                        autoFocus
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Submit
                    </Button>
                </DialogActions>
            </form>
            {alert && <Alert severity={alert.severity}
                                      message={alert.message}
                                      resetFunc={() => setAlert(null)}/>}
        </Dialog>
    );
}