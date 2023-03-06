import {
    Box,
    Button,
    FormControl,
    IconButton,
    Paper,
    Stack,
    Tooltip,
    Typography,
    Select,
    InputLabel,
    MenuItem, TextField
} from "@mui/material";
import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {iconMap} from "../../redux/fileTemplateSlice";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import prettyBytes from "pretty-bytes";
import _ from "lodash";
import {setFileDetail} from "../../redux/envSlice";
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {InformationField} from "./viewFileDetails";
import {useFormik} from "formik";
import * as Yup from "yup";

const InformationEditField = ({label, info_id, formik}) => {
    return (
        <Stack direction={'row'} spacing={.5} sx={{
            alignItems: 'center',
            mx: 2,
            mt: 1,
        }}>
            <Tooltip title={label} placement={'left'} arrow enterDelay={500} enterNextDelay={500}>
                <Typography variant={'body2'} sx={{
                    color: 'grey.600',
                    width: '12ch',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>
                    {label}
                </Typography>
            </Tooltip>
            <TextField size={'small'} sx={{
                width: '150px',
            }}
                       name={`information.${info_id}`}
                       onChange={formik.handleChange}
                       value={formik.values.information[info_id]}
            />
        </Stack>
    )
}

const AttachmentEditField = ({label, attachment_id, formik}) => {
    return (
        <Stack direction={'row'} spacing={1} sx={{
            alignItems: 'center',
            mx: 2,
            mt: 1,
        }}>
            <Tooltip title={label} placement={'left'} arrow enterDelay={500} enterNextDelay={500}>
                <Typography variant={'body2'} sx={{
                    color: 'grey.600',
                    width: '12ch',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>
                    {label}
                </Typography>
            </Tooltip>
            {
                formik.values.attachments[attachment_id].size &&
                <Tooltip title={prettyBytes(formik.values.attachments[attachment_id].size)} placement={'bottom'} arrow
                         enterDelay={500}
                         enterNextDelay={500}>
                    <Typography variant={'body2'} sx={{
                        color: 'grey.800',
                        width: '10ch',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}>
                        {prettyBytes(formik.values.attachments[attachment_id].size)}
                    </Typography>
                </Tooltip>
            }
            {
                formik.values.attachments[attachment_id].name ?
                    <Stack direction={'row'}>
                        <Tooltip title={formik.values.attachments[attachment_id].name} placement={'right'} arrow>
                            <IconButton size={'small'}>
                                <FileDownloadOutlinedIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'Remove'} enterDelay={500} placement={"right"} arrow>
                            <IconButton>
                                <DeleteOutlinedIcon/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                    :
                    <Tooltip title={'No file uploaded'} placement={'right'} arrow>
                        <IconButton size={'small'}>
                            <FileUploadOutlinedIcon/>
                        </IconButton>
                    </Tooltip>
            }
        </Stack>
    )
}

const EditingFileDetails = ({fileId, setEditting}) => {
    const initial_lib_id = _.last(useSelector(state => state.env.location))
    const library_details = useSelector(state => state.library_details)
    const fileTemplates = useSelector(store => store.file_templates)

    const newFile = useMemo(() => {
        return {
            name: '',
            library: initial_lib_id ? initial_lib_id : '',
            last_modified: null,
            file_template: initial_lib_id ? library_details[initial_lib_id].file_template : '',
            size: null,
            information: initial_lib_id ? _.mapValues(fileTemplates[library_details[initial_lib_id].file_template].information, () => '') : {},
            attachments: initial_lib_id ? _.mapValues(fileTemplates[library_details[initial_lib_id].file_template].attachments, () => {
                return {
                    id: null,
                    name: '',
                    size: null,
                }
            }) : {}
        }
    }, []);

    const initialState = useSelector(store => {
        if (fileId === -1) {
            return newFile
        } else
            return store.file_details[fileId]
    })

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: Yup.object({
            file_template: Yup.string()
                .required('File Template is required'),
            name: Yup.string().required('A file must be uploaded'),
        })
    });

    const handleFileTemplateChange = (event) => {
        const value = event.target.value;
        const template = fileTemplates[value];
        formik.setFieldValue('information', _.mapValues(template.information, () => ''))
        formik.setFieldValue('attachments', _.mapValues(template.attachments, () => {
            return {
                id: null,
                name: '',
                size: null,
            }
        }))

        formik.handleChange(event)
    }

    const handleLibraryChange = (event) => {
        formik.handleChange(event)
        formik.setFieldValue('file_template', event.target.value === '' ? '' : library_details[event.target.value].file_template)
    }

    const fileTemplate = useSelector(store => {
        if (formik.values.file_template === '')
            return null
        else
            return store.file_templates[formik.values.file_template]
    })
    const library = useSelector(store => {
        if (formik.values.library === '')
            return null
        else
            return store.library_details[formik.values.library]
    })
    const dispatch = useDispatch()


    return (
        <Paper elevation={5} sx={{
            flex: 1,
            height: 'calc(100vh - 120px)',
        }}>
            <Stack sx={{
                height: '100%'
            }}>
                <Paper sx={{
                    bgcolor: 'grey.50',
                    mt: 1,
                    mx: 1,
                    py: 1,
                    borderRadius: 2,
                    width: '305px'
                }}>
                    <Stack sx={{
                        alignItems: 'center',
                    }}>
                        <Stack direction={'row'} sx={{
                            alignItems: 'center',
                            width: '100%',
                        }}>
                            <Box sx={{
                                px: 1,
                            }}>
                                {
                                    fileTemplate ?
                                        iconMap[fileTemplate.icon].type.render({
                                            sx: {
                                                fontSize: '36px',
                                            }
                                        }) :
                                        <HelpOutlineOutlinedIcon sx={{
                                            fontSize: '36px',
                                        }}/>
                                }
                            </Box>
                            <Stack>
                                <FormControl sx={{
                                    width: 150,
                                }} size="small">
                                    <InputLabel id="template-select">Template</InputLabel>
                                    <Select
                                        labelId="template-select"
                                        id="template-select"
                                        value={formik.values.file_template}
                                        label="Template"
                                        onChange={handleFileTemplateChange}
                                        name={'file_template'}
                                    >
                                        {
                                            formik.values.library === '' ?
                                                _.map(fileTemplates, (fileTemplate, key) => {
                                                    return (
                                                        <MenuItem value={key} key={key}>
                                                            {fileTemplate.name}
                                                        </MenuItem>
                                                    )
                                                })
                                                :
                                                <MenuItem value={formik.values.file_template}>
                                                    {fileTemplate.name}
                                                </MenuItem>
                                        }
                                    </Select>
                                </FormControl>
                                <Tooltip title={formik.values.name} placement={'top'} arrow enterDelay={500}
                                         enterNextDelay={500}>
                                    <Typography variant={'body2'} sx={{
                                        width: '22ch',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        mt: 1,
                                        pl: 2,
                                        boxSizing: 'border-box',
                                    }}>
                                        {formik.values.name}
                                    </Typography>
                                </Tooltip>
                            </Stack>
                            <Box sx={{
                                width: '80px'
                            }}>
                                {
                                    formik.values.name ?
                                        <Stack direction={'row'}>
                                            <Tooltip title={'Download'} enterDelay={500} placement={"top"}>
                                                <IconButton sx={{}}>
                                                    <FileDownloadOutlinedIcon/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title={'Remove'} enterDelay={500} placement={"top"}>
                                                <IconButton sx={{}}>
                                                    <DeleteOutlinedIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                        :
                                        <Tooltip title={'Upload'} enterDelay={500} placement={"top"}>
                                            <IconButton sx={{}}>
                                                <FileUploadOutlinedIcon/>
                                            </IconButton>
                                        </Tooltip>
                                }
                            </Box>
                        </Stack>
                    </Stack>
                </Paper>

                <Stack direction={'row'} sx={{
                    alignItems: 'center',
                    ml: 2,
                    mt: 2,
                }}>
                    <Box sx={{
                        pr: 1,
                    }}>
                        {
                            library ?
                                iconMap[fileTemplate.libIcon].type.render({
                                    sx: {
                                        fontSize: '24px',
                                        color: 'primary.main'
                                    }
                                })
                                :
                                <HomeOutlinedIcon sx={{
                                    fontSize: '24px',
                                    color: 'primary.main'
                                }}/>
                        }
                    </Box>
                    <FormControl sx={{m: 1, minWidth: 120}} size="small">
                        <InputLabel id="library-select">Library</InputLabel>
                        <Select
                            labelId="library-select"
                            id="library-select"
                            value={formik.values.library}
                            label="Library"
                            onChange={handleLibraryChange}
                            name={'library'}
                        >
                            <MenuItem value={''}>No Library</MenuItem>
                            {
                                _.map(library_details, (library, key) => {
                                    return (
                                        <MenuItem value={key} key={key}>
                                            {library.name}
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                </Stack>

                <Typography variant={'subtitle2'} sx={{
                    mx: 2,
                    mt: 2,
                    color: 'primary.dark'
                }}>
                    Information
                </Typography>
                <InformationField label={'Size'} value={
                    formik.values.size ?
                        prettyBytes(formik.values.size)
                        :
                        '-'
                }/>
                {
                    fileTemplate ?
                        _.map(fileTemplate.information, (value, key) => {
                            return (
                                <InformationEditField key={key} label={fileTemplate.information[key]}
                                                      info_id={key}
                                                      formik={formik}/>
                            )
                        }) :
                        <Typography variant={'body2'} sx={{
                            mx: 2,
                            mt: 1,
                        }}>
                            Select a template to enter information
                        </Typography>
                }

                <Typography variant={'subtitle2'} sx={{
                    mx: 2,
                    mt: 2,
                    color: 'primary.dark'
                }}>
                    Attachments
                </Typography>
                <Box sx={{mb: 2}}>
                    {
                        fileTemplate ?
                            _.map(formik.values.attachments, (value, key) => {
                                return (
                                    <AttachmentEditField key={fileTemplate.attachments[key]}
                                                         label={fileTemplate.attachments[key]}
                                                         attachment_id={key}
                                                         formik={formik}
                                    />
                                )
                            }) :
                            <Typography variant={'body2'} sx={{
                                mx: 2,
                                mt: 1,
                            }}>
                                Select a template to enter attachments
                            </Typography>
                    }
                </Box>


                <Stack direction={'row'} spacing={1} sx={{
                    mb: 2,
                    px: 2,
                    justifyContent: 'flex-end',
                    mt: 'auto'
                }}>
                    <Button variant={'outlined'} size={'small'} onClick={() => {
                        if (fileId === -1) {
                            dispatch(setFileDetail('closed'))
                        } else
                            setEditting(false)
                    }
                    }>
                        Cancel
                    </Button>
                    <Button variant={'outlined'} size={'small'}>
                        Save
                    </Button>
                </Stack>

            </Stack>
        </Paper>
    );
}

export default EditingFileDetails;