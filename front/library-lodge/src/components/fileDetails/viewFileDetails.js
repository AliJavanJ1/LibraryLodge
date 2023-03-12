import React, {useState} from 'react';
import {Box, IconButton, Paper, Stack, Tooltip, Typography, Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {iconMap} from "../../redux/fileTemplateSlice";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import _ from "lodash";
import prettyBytes from "pretty-bytes";
import {setEditingFileDetail, setFileDetail} from "../../redux/envSlice";
import PlayerDialog from "../PlayerDialog";
import {initialState as staticIS} from "../../redux/staticSlice";

export const InformationField = ({label, value}) => {
    return (
        <Stack direction={'row'} key={label} spacing={.5} sx={{
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
            <Tooltip title={value} placement={'right'} arrow enterDelay={500} enterNextDelay={500}>
                <Typography variant={'body2'} sx={{
                    color: 'grey.800',
                    width: '20ch',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>
                    {value}
                </Typography>
            </Tooltip>
        </Stack>
    )
}

const AttachmentField = ({label, attachment}) => {
    return (
        <Stack direction={'row'} key={label} spacing={1} sx={{
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
            <Tooltip title={prettyBytes(attachment.size)} placement={'bottom'} arrow enterDelay={500}
                     enterNextDelay={500}>
                <Typography variant={'body2'} sx={{
                    color: 'grey.800',
                    width: '10ch',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                }}>
                    {prettyBytes(attachment.size)}
                </Typography>
            </Tooltip>
            <Tooltip title={attachment.name} placement={'right'} arrow>
                <IconButton size={'small'} onClick={() => {
                    const link = staticIS.apiDomain + '/dashboard/download/' + attachment.id
                    window.open(link, '_blank')
                }}>
                    <FileDownloadOutlinedIcon/>
                </IconButton>
            </Tooltip>
        </Stack>
    )
}


const ViewFileDetails = ({fileId}) => {
    const file = useSelector(store => store.file_details[fileId])
    const fileTemplate = useSelector(store => store.file_templates[file.file_template])
    const library = useSelector(store => store.library_details[file.library])
    const dispatch = useDispatch()
    const [playerDialogOpen, setPlayerDialogOpen] = useState(false);

    return (
        <Paper elevation={5} sx={{
            flex: 1,
            height: 'calc(100vh - 120px)'
        }}>
            <Stack sx={{
                height: '100%',
            }}>
                <Paper sx={{
                    bgcolor: 'primary.dark',
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
                                {iconMap[fileTemplate.icon].type.render({
                                    sx: {
                                        fontSize: '36px',
                                        color: 'white'
                                    }
                                })}
                            </Box>
                            <Stack>
                                <Typography variant={'caption'} color={'grey.300'}>
                                    {fileTemplate.name}
                                </Typography>
                                <Tooltip title={file.name} placement={'top'} arrow enterDelay={500}
                                         enterNextDelay={500}>
                                    <Typography variant={'body2'} sx={{
                                        width: '25ch',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        color: 'white'
                                    }}>
                                        {file.name}
                                    </Typography>
                                </Tooltip>
                            </Stack>
                            <Tooltip title={'Download'} enterDelay={500} placement={"top"}>
                                <IconButton sx={{
                                    mx: 1,
                                    color: 'white'
                                }} onClick={() => {
                                    const link = staticIS.apiDomain + '/dashboard/download/' + fileId
                                    window.open(link, '_blank')
                                }}>
                                    <FileDownloadOutlinedIcon/>
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                </Paper>

                {
                    file.library &&
                    <Stack direction={'row'} sx={{
                        alignItems: 'center',
                        ml: 2,
                        mt: 2,
                    }}>
                        <Box sx={{
                            pr: 1,
                        }}>
                            {iconMap[fileTemplate.libIcon].type.render({
                                sx: {
                                    fontSize: '24px',
                                    color: 'primary.main'
                                }
                            })}
                        </Box>
                        <Typography variant={'subtitle1'} sx={{
                            color: 'primary.main'
                        }}>
                            {library.name}
                        </Typography>
                    </Stack>
                }

                <Typography variant={'subtitle2'} sx={{
                    mx: 2,
                    mt: 2,
                    color: 'primary.dark'
                }}>
                    Information
                </Typography>
                <InformationField label={'Size'} value={prettyBytes(file.size)}/>
                {
                    _.map(file.information, (value, key) => {
                        return (
                            <InformationField key={fileTemplate.information[key]} label={fileTemplate.information[key]}
                                              value={value}/>
                        )
                    })
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
                        _.map(file.attachments, (value, key) => {
                            return (
                                <AttachmentField key={fileTemplate.attachments[key]}
                                                 label={fileTemplate.attachments[key]}
                                                 attachment={value}/>
                            )
                        })
                    }
                </Box>


                <Stack direction={'row'} spacing={1} sx={{
                    mb: 2,
                    px: 2,
                    justifyContent: 'flex-end',
                    mt: 'auto'
                }}>
                    {
                        fileTemplate.name === 'Movie' &&
                        <Button variant={'outlined'} size={'small'} onClick={() => {
                            setPlayerDialogOpen(true)
                        }
                        }>
                            Preview
                        </Button>
                    }
                    <Button variant={'outlined'} size={'small'} onClick={() => {
                        dispatch(setFileDetail('closed'))
                    }
                    }>
                        Close
                    </Button>
                    <Button variant={'outlined'} size={'small'} onClick={() => {
                        dispatch(setEditingFileDetail(true))
                    }}>
                        Edit
                    </Button>
                </Stack>
            </Stack>
            {playerDialogOpen && <PlayerDialog url={null} open={playerDialogOpen} onClose={() => setPlayerDialogOpen(false)}/>}
        </Paper>
    );
}

export default ViewFileDetails;