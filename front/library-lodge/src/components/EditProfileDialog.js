import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import EditableText from "./EditableText";
import EditablePasswordField from "./EditablePasswordField";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {editProfile, updateProfile} from "../redux/profileSlice";
import React, {useEffect, useState} from "react";
import {setAlert} from "../redux/envSlice";

export default function EditProfileDialog({open, onClose}) {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);
    const [isEditing, setIsEditing] = useState({
        usernameIsEditing: false,
        emailIsEditing: false,
        passwordIsEditing: false,
    })
    const formik = useFormik({
        validateOnMount: true,
        initialValues: {
            username: profile ? profile.username: "",
            email: profile ? profile.email : "",
            old_password: '',
            password: '',
            password_confirmation: '',
        },
        validationSchema: Yup.object({
            username: isEditing.usernameIsEditing
                      ? Yup.string().required('Required')
                      : Yup.string(),
            email: isEditing.emailIsEditing
                   ? Yup.string().email('Invalid email address').required('Required')
                   : Yup.string(),
            old_password: isEditing.passwordIsEditing
                          ? Yup.string()
                               .required('Required')
                               .oneOf(profile ? [profile.password] : [], 'Passwords is wrong')
                          : Yup.string(),
            password: isEditing.passwordIsEditing
                      ? Yup.string().required('Required')
                      : Yup.string(),
            password_confirmation: isEditing.passwordIsEditing
                                   ? Yup.string()
                                        .required('Required')
                                        .oneOf([Yup.ref('password'), null],
                                                   'Passwords must match')
                                   : Yup.string(),
        }),
        onSubmit: values => {
            const result = {};
            result.username = isEditing.usernameIsEditing ? values.username : profile.username;
            result.email = isEditing.emailIsEditing ? values.email : profile.email;
            result.password = isEditing.passwordIsEditing ? values.password : profile.password;
            dispatch(editProfile(result)).unwrap()
                .then((res) => {
                    console.log("Edit Profile", res)
                    dispatch(setAlert({"severity": "success",
                                    "message": res.message}));
                    dispatch(updateProfile(result))
                    handleClose();
                })
                .catch((message) => {
                    dispatch(setAlert({"severity": "error",
                                    "message": message}));
                })

        },
    });

    useEffect(() => {
        if(!isEditing.usernameIsEditing && formik.values.username !== (profile ? profile.username : "")) {
            formik.setFieldValue('username', profile ? profile.username : "");
        }
        if(!isEditing.emailIsEditing && formik.values.email !== (profile ? profile.email : "")) {
            formik.setFieldValue('email', profile ? profile.email : "");
        }
        if(!isEditing.passwordIsEditing
           && formik.values.old_password !== ''
           && formik.values.password !== ''
           && formik.values.password_confirmation !== '') {
            formik.setFieldValue('old_password', '');
            formik.setFieldValue('password', '');
            formik.setFieldValue('password_confirmation', '');
        }
    }, [isEditing, profile]);

    useEffect(() => {
        if (open) {
            formik.resetForm()
        }
    }, [open]);

    const handleClose = () => {
        setIsEditing({
            usernameIsEditing: false,
            emailIsEditing: false,
            passwordIsEditing: false
        })
        onClose();
    }

    return (
        <Dialog
            component="form"
            onSubmit={formik.handleSubmit}
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
                <DialogContent
                    dividers
                >
                    <EditableText
                        label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        autoComplete="username"
                        name="username"
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        isEditing={isEditing.usernameIsEditing}
                        setIsEditing={(value) => setIsEditing({...isEditing, usernameIsEditing: value})}
                    />
                    <EditableText
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        autoComplete="email"
                        name="email"
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        isEditing={isEditing.emailIsEditing}
                        setIsEditing={(value) => setIsEditing({...isEditing, emailIsEditing: value})}
                    />
                </DialogContent>
                <DialogTitle>
                    Password
                </DialogTitle>
                <DialogContent
                    dividers
                >
                    <EditablePasswordField
                        isEditing={isEditing.passwordIsEditing}
                        setIsEditing={(value) => setIsEditing({...isEditing, passwordIsEditing: value})}
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
        </Dialog>
    );
}