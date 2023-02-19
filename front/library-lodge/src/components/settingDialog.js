import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    Box,
    Dialog,
    Divider,
    Stack,
    Tab, Tabs,
    Tooltip,
} from "@mui/material";
import {setSettingDialogOpen} from "../redux/envSlice";
import FileTemplateEdit from "./fileTemplateEdit";
import _ from "lodash";
import {iconMap} from "../redux/fileTemplateSlice";


function SettingDialog() {
    const dispatch = useDispatch();
    const open = useSelector(state => state.env.settingDialogOpen);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const fileTemplates = useSelector(state => state.file_templates);

    useEffect(() => {
        if (!_.isEmpty(fileTemplates) && selectedTemplate === null) {
            setSelectedTemplate(_.keys(fileTemplates)[0]);
        }
    }, [fileTemplates])

    const handleClose = () => {
        dispatch(setSettingDialogOpen(false));
    }

    const handleChange = (event, newValue) => {
        setSelectedTemplate(newValue);
    }

    return (
        <Dialog open={open} onClose={handleClose} sx={{
            '& .MuiDialog-paper': {
                maxWidth: '1000px',
            }
        }}>
            <Stack direction={'row'} sx={{
                width: '900px',
                overflow: 'hidden',
                height: '600px',
            }}>
                <Divider/>
                <Tabs
                    orientation="vertical"
                    value={selectedTemplate}
                    variant={'fullWidth'}
                    onChange={handleChange}
                    centered
                    sx={{
                        borderRight: 1,
                        borderColor: 'divider',
                        '& .MuiTabs-flexContainer': {
                            height: '100%',
                        }
                    }}
                >
                    {
                        _.map(fileTemplates, (fileTemplate, templateId) => {
                            return (
                                <Tab label={fileTemplate.name} value={templateId} key={templateId}
                                     iconPosition={'bottom'}
                                     icon={<Stack direction={'row'} spacing={1}>
                                         <Tooltip title={fileTemplate.name + ' File Icon'} arrow>
                                             <Box sx={{
                                                 color: 'rgba(0,0,0,.6)'
                                             }}>
                                                 {iconMap[fileTemplate.icon].type.render()}
                                             </Box>
                                         </Tooltip>
                                         <Tooltip title={fileTemplate.name + ' Library Icon'} arrow>
                                             <Box sx={{
                                                 color: 'orange'
                                             }}>
                                                 {iconMap[fileTemplate.libIcon].type.render()}
                                             </Box>
                                         </Tooltip>
                                     </Stack>}
                                />
                            )
                        })
                    }
                </Tabs>
                {
                    _.map(fileTemplates, (fileTemplate, templateId) => {
                        return (
                            <Box
                                hidden={selectedTemplate !== templateId}
                                key={templateId}
                                sx={{
                                    overflowY: 'auto',
                                    width: '100%',
                                    padding: 1,
                                }}
                            >
                                <FileTemplateEdit id={selectedTemplate}/>
                            </Box>
                        )
                    })
                }
            </Stack>
        </Dialog>
    );
}

export default SettingDialog;