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
import {useEffect} from "react";
import _ from "lodash";
import {iconMap} from "../redux/fileTemplateSlice";
import {createLibrary, fetchLibraryDetails} from "../redux/libraryDetailSlice";
import {fetchFileDetails} from "../redux/fileDetailSlice";
import {buildTree} from "../redux/treeSlice";
import {setAlert} from "../redux/envSlice";


export default function LibraryDialog({open, onClose, name=null, file_template_id=null}) {
    const dispatch = useDispatch();
    const fileTemplates = useSelector((state) => state.file_templates);
    const libraryOptions = _.map(fileTemplates, (value, key) => {
        return {file_template_id: key, type: value.name, libIcon: value.libIcon}
    })

    const formik = useFormik({
        validateOnMount: true,
        initialValues: {
            name: name || '',
            file_template_id: file_template_id || libraryOptions[0].file_template_id
        },
        validationSchema: Yup.object({
            name: name ? Yup.string().required('Required').notOneOf([name], "Name is still the same") : Yup.string().required('Required'),
            file_template_id: Yup.string()
                     .required('Required')
                     .oneOf(libraryOptions.map((option) => option.file_template_id))
        }),
        onSubmit: values => {
            const result = name ? {old_name: name, new_name: values.name} : values;
            dispatch(name ? fetchProfileData(result) : createLibrary(result)).unwrap()
                .then((res) => {
                    if (name) {
                        dispatch(setAlert({
                            "severity": "success",
                            "message": "Library " + name + " renamed to " + values.name + " successfully."
                        }))
                        onClose();
                    }
                    else
                        dispatch(setAlert({"severity": "success",
                            "message": "Library " + values.name + " added successfully."}))
                    dispatch(fetchLibraryDetails()).then((res)=>{
                        dispatch(fetchFileDetails()).then((res)=>{
                            dispatch(buildTree())
                        })
                    })
                    // onClose();
                })
                .catch((message) => {
                    dispatch(setAlert({"severity": "error",
                                    "message": message}));
                })
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
                    justifyContent: "space-between",
                    alignItems: "center",
                    '& .MuiSelect-select': {
                        display: "flex",
                    },
                }}
            >
                {name
                 ? (<Box
                        sx={{
                            width: "warp-content",
                            marginRight: 3,
                            display: "flex",
                            height: "100%",
                            alignItems: "center",
                        }}
                    >
                        {iconMap[libraryOptions.find((option) => String(option.file_template_id) === String(file_template_id)).libIcon].type.render({
                            fontSize: "small",
                            sx: {
                                marginRight: 1,
                            }
                        })}
                        {libraryOptions.find((option) => String(option.file_template_id) === String(file_template_id)).type}
                    </Box>)
                 : (<FormControl
                        margin="normal"
                        error={formik.touched.name && Boolean(formik.errors.file_template_id)}
                        sx={{
                            width: 200,
                            marginRight: 3
                        }}
                    >
                        <InputLabel>Type</InputLabel>
                        <Select
                            name="file_template_id"
                            value={formik.values.file_template_id}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            label="Age"
                        >
                            {libraryOptions.map((option) => (
                                <MenuItem
                                    value={option.file_template_id}
                                    key={option.file_template_id}
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
                                    {option.type}
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
        </Dialog>
    )
}