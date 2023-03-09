import {
    Box,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import {fetchProfileData} from "../redux/profileSlice";
import {useDispatch, useSelector} from "react-redux";
import Alert from "./Alert";
import React, {useEffect, useState} from "react";
import _ from "lodash";
import {iconMap} from "../redux/fileTemplateSlice";



export default function LibraryDialog({open, onClose, name=null, type=null}) {
    const [alert, setAlert] = useState(null);
    const dispatch = useDispatch();
    const fileTemplates = useSelector((state) => state.file_templates);
    const libraryOptions = _.map(_.values(fileTemplates), (value) => {
        return {name: value.name, libIcon: value.libIcon}
    })

    const formik = useFormik({
        validateOnMount: true,
        initialValues: {
            name: name || '',
            type: type || libraryOptions[0].name
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            type: Yup.string()
                     .required('Required')
                     .oneOf(libraryOptions.map((option) => option.name))
        }),
        onSubmit: values => {
            const result = name ? {old_name: name, new_name: values.name} : values;
            dispatch(name ? fetchProfileData(result) : fetchProfileData(result))
                .then((res) => {
                    if (res.payload && res.meta.requestStatus) {
                        if (name)
                            setAlert({"severity": "success",
                                            "message": "Library " + name + " renamed to " + values.name + " successfully."})
                        else
                            setAlert({"severity": "success",
                                            "message": "Library " + values.name + " added successfully."})
                        onClose();
                    } else {
                        setAlert({"severity": "error",
                            "message": res.payload ? res.payload.data : res.error.message});
                    }
                });

        },
    });

    useEffect(() => {
        if (open) {
            formik.resetForm()
        }
    }, [open]);


    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDialog-paper': {
                    width: '100%',
                }
            }}
            component="form"
            onSubmit={formik.handleSubmit}
        >
            <DialogTitle>
                {name ? "Rename Library" : "Add Library"}
            </DialogTitle>
            <DialogContent
                sx={{
                    display: "flex",
                    alignItems: "space-between",
                    '& .MuiSelect-select': {
                        display: "flex",
                    },
                }}
            >
                {name
                 ? (<Box
                        sx={{
                            width: 200,
                            marginRight: 3,
                            display: "flex",
                        }}
                    >
                        {iconMap[libraryOptions.find((option) => option.name === type)].type.render({
                            fontSize: "small",
                            sx: {
                                marginRight: 1,
                            }
                        })}
                        {name}
                    </Box>)
                 : (<FormControl
                        margin="normal"
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        sx={{
                            width: 200,
                            marginRight: 3
                        }}
                    >
                        <InputLabel>Type</InputLabel>
                        <Select
                            name="type"
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            label="Age"
                        >
                            {libraryOptions.map((option) => (
                                <MenuItem
                                    value={option.name}
                                    key={option.name}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    {iconMap[option.libIcon].type.render({
                                        fontSize: "small",
                                        sx: {
                                            marginRight: 1,
                                        }
                                    })}
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>)
                }
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Name"
                    name="name"
                    autoComplete="username"
                    autoFocus
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose}>
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
            {alert && <Alert severity={alert.severity}
                             message={alert.message}
                             resetFunc={() => setAlert(null)}/>}
        </Dialog>
    )
}