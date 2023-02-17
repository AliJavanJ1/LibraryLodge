/*
    Component for editing a specific file template.
    the file template id is given in the props.
    file template object of each id can be accessed from the redux store in file_templates.
    the implementation of save and cancel buttons are not done yet. and a todo is in their place.
    user can add/remove/edit information fields which is just the of the field.
    user can add/remove/edit attachment fields which is just the name of the attachment.
    information and attachment fields' name can not be an empty string.
    a file template can have no information fields and no attachment fields.
    don't use makeStyles at all. make sure to use material-ui v5 sx prop.
    for example, instead of this:
        makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));
<div className={classes.paper}>
    do this:
    <Paper sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}>
 */

// Path: front/library-lodge/src/components/fileTemplateEdit.js

import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, Link as RouterLink} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Box, Button, Container, CssBaseline, Grid, Link, Stack, TextField, Typography} from "@mui/material";
import Alert from '../pages/Alert';
import {addFileTemplate, editFileTemplate} from "../redux/fileTemplateSlice";


const FileTemplateEdit = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const fileTemplate = useSelector(state => state.file_templates[props.id]);

    const formik = useFormik({
        validateOnMount: true,
        initialValues: {
            name: fileTemplate.name,
            information_fields: fileTemplate.information,
            attachment_fields: fileTemplate.attachments,
        },
        validationSchema: Yup.object({
            information_fields: Yup.array()
                .of(Yup.string().required('Required'))
                .required('Required'),
            attachment_fields: Yup.array()
                .of(Yup.string().required('Required'))
                .required('Required'),
        }),
        onSubmit: values => {
            if (props.id) {
                dispatch(editFileTemplate(props.id, values))
                    .then((res) => {
                        if (res.payload && res.payload.status === 200) {
                            navigate('/file-templates');
                        } else {
                            console.log(res.payload ? res.payload.data : res.error.message)
                            setError(res.payload ? res.payload.data : res.error.message);
                        }
                    });
            } else {
                dispatch(addFileTemplate(values))
                    .then((res) => {
                        if (res.payload && res.payload.status === 200) {
                            navigate('/file-templates');
                        } else {
                            console.log(res.payload ? res.payload.data : res.error.message)
                            setError(res.payload ? res.payload.data : res.error.message);
                        }
                    });
            }
        },
    });

    return (
        <Stack direction={'column'}>
                <Typography component="h1" variant="h5">
                    {fileTemplate.name}
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                    />
                    <Typography component="h1" variant="h6">
                        Information Fields
                    </Typography>
                    {formik.values.information_fields.map((field, index) => (
                        <Grid container spacing={2} key={index}>
                            <Grid item xs={10}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id={`information_fields.${index}`}
                                    label={`Information Field ${index + 1}`}
                                    name={`information_fields.${index}`}
                                    autoComplete="information_fields"
                                    autoFocus
                                    value={formik.values.information_fields[index]}
                                    onChange={formik.handleChange}
                                    error={formik.touched.information_fields && Boolean(formik.errors.information_fields)}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                    onClick={() => {
                                        formik.setFieldValue('information_fields', formik.values.information_fields.filter((_, i) => i !== index));
                                    }}
                                >
                                    Remove
                                </Button>
                            </Grid>
                        </Grid>
                    ))}
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={() => {
                            formik.setFieldValue('information_fields', [...formik.values.information_fields, '']);
                        }}
                    >
                        Add Information Field
                    </Button>
                    <Typography component="h1" variant="h6">
                        Attachment Fields
                    </Typography>
                    {formik.values.attachment_fields.map((field, index) => (
                        <Grid container spacing={2} key={index}>
                            <Grid item xs={10}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id={`attachment_fields.${index}`}
                                    label={`Attachment Field ${index+1}`}
                                    name={`attachment_fields.${index}`}
                                    autoComplete="attachment_fields"
                                    autoFocus
                                    value={formik.values.attachment_fields[index]}
                                    onChange={formik.handleChange}
                                    error={formik.touched.attachment_fields && Boolean(formik.errors.attachment_fields)}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                    onClick={() => {
                                        formik.setFieldValue('attachment_fields', formik.values.attachment_fields.filter((_, i) => i !== index));
                                    }}
                                >
                                    Remove
                                </Button>
                            </Grid>
                        </Grid>
                    ))}
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={() => {
                            formik.setFieldValue('attachment_fields', [...formik.values.attachment_fields, '']);
                        }}
                    >
                        Add Attachment Field
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Save
                    </Button>
                </Box>
            {error && <Alert severity="error">{error}</Alert>}
        </Stack>
    );
};

export default FileTemplateEdit;