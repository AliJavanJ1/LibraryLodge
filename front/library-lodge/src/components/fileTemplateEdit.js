import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as Yup from "yup";
import {
    Divider,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import Alert from './Alert';
import StandaloneField, {StyledIconButton} from "./standaloneField";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {useFormik} from "formik";
import _ from "lodash";
import {postInformationFieldRemove} from "../redux/fileTemplateSlice";

const TypographyHeader = (props) => {
    return (
        <Typography variant={'h6'} component={'h1'} color={'text.secondary'} sx={{
            mb: 2
        }}>{props.children}</Typography>
    )
}

const AddField = (props) => {
    const [alert, setAlert] = useState({});
    const formik = useFormik({
        validateOnMount: true,
        initialValues: {
            value: ''
        },
        validationSchema: Yup.object({
            value: Yup.string().trim().required('Field name cannot be empty')
        }),
    })

    const createHandler = () => {
        if (formik.isValid) {
            props.createHandler(formik.values.value);
            formik.resetForm();
        } else {
            setAlert({
                severity: 'error',
                message: formik.errors.value
            })
        }
    }

    return (
        <Stack direction={'row'}>
            <TextField
                size={"small"}
                value={formik.values.value}
                name={'value'}
                onChange={formik.handleChange}
                sx={{
                    width: '275px'
                }}
                InputProps={{
                    endAdornment: (
                        <Tooltip title={'Create'}>
                            <StyledIconButton onClick={createHandler}>
                                <AddCircleOutlineOutlinedIcon/>
                            </StyledIconButton>
                        </Tooltip>
                    )
                }}
            />
            {alert.message && <Alert severity={alert.severity} message={alert.message} resetFunc={() => setAlert({})}/>}
        </Stack>
    );
}


const FileTemplateEdit = (props) => {
    const templateId = props.id;
    const dispatch = useDispatch();
    const [alert, setAlert] = useState({});

    const fileTemplate = useSelector(state => state.file_templates[templateId]);

    return (
        <Stack direction={'row'} spacing={3} sx={{
            width: '100%',
            height: '100%',
        }}>
            <Stack direction={'column'} spacing={2} sx={{
                width: '50%',
                alignItems: 'center'
            }}>
                <TypographyHeader>Information Fields</TypographyHeader>
                {
                    _.map(fileTemplate.information, (name, id) => {
                        return (
                            <StandaloneField
                                onRemove={() => {//todo call the thunk with templateId and fieldId
                                    dispatch(postInformationFieldRemove({templateId, id})).unwrap()
                                        .then((res) => {
                                            setAlert({
                                                severity: 'success',
                                                message: 'Information field removed successfully'
                                            })
                                        })
                                        .catch((err) => {
                                            setAlert({
                                                severity: 'error',
                                                message: 'Failed to remove information field'
                                            })
                                        })
                                }}
                                onEdit={(value) => {//todo call the thunk with templateId and fieldId and edited field name
                                }}
                                value={name}
                                key={id}
                            />
                        )
                    })
                }
                <AddField createHandler={(value) => {//todo call the thunk with templateId and new field name
                }}/>
            </Stack>
            <Divider orientation={'vertical'} flexItem/>
            <Stack direction={'column'} spacing={2} sx={{
                width: '50%',
                alignItems: 'center'
            }}>
                <TypographyHeader>Attachment Fields</TypographyHeader>
                {
                    _.map(fileTemplate.attachments, (name, id) => {
                        return (
                            <StandaloneField
                                onRemove={() => {//todo
                                }}
                                onEdit={() => {//todo
                                }}
                                value={name}
                                key={id}
                            />
                        )
                    })
                }
                <AddField createHandler={() => {//todo
                }}/>
            </Stack>
            {alert.message && <Alert severity={alert.severity} message={alert.message} resetFunc={() => setAlert({})}/>}
        </Stack>
    );
};

export default FileTemplateEdit;