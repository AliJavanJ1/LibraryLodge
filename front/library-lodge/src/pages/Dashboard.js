import ItemList from "../components/ItemList";
import FileDialogTest from "../components/fileDialogTest";
import {Box, Container, Stack, InputBase} from "@mui/material";
import FileDetails from "../components/fileDetails/fileDetails";
import BreadCrumbs from "../components/Breadcrumbs";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setQuickFilterInput} from "../redux/envSlice";
import {useLocationFileTemplate, useLocationItems} from "../utils";
import {fetchFileTemplates} from "../redux/fileTemplateSlice";
import {fetchLibraryDetails} from "../redux/libraryDetailSlice";
import {fetchFileDetails} from "../redux/fileDetailSlice";
import {buildTree} from "../redux/treeSlice";

const Dashboard = ({shared = false}) => {
    const dispatch = useDispatch()
    const quickFilterInput = useSelector(state => state.env.quickFilterInput)
    const {libs, files} = useLocationItems(shared)
    const file_template = useLocationFileTemplate(shared)
    const [counter, setCounter] = useState(0);

    //fetch template_details once
    useEffect(() => {
        dispatch(fetchFileTemplates()).then((res)=>{
            dispatch(fetchLibraryDetails()).then((res)=>{
                dispatch(fetchFileDetails()).then((res)=>{
                    dispatch(buildTree())
                })
            })
        })
    }, [])

    return (
        <Container maxWidth='xl'>
            <Stack direction={'row'} spacing={2}>
                <Box sx={{
                    flex: 4,
                    height: 'calc(100vh - 160px)',
                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <BreadCrumbs shared={shared}/>
                        <InputBase
                            placeholder="Filter..."
                            type="search"
                            sx={{
                                width: 300,
                                height: 30,
                                fontSize: 14,
                                border: "1px solid #ccc",
                                padding: "2px 10px",
                                borderRadius: 1,
                                marginBottom: 1
                            }}
                            value={quickFilterInput}
                            onChange={e => {
                                dispatch(setQuickFilterInput(e.target.value))
                            }}
                        />
                    </Box>

                    <ItemList files={files} libs={libs} file_template={file_template}/>
                </Box>
                {/*<FileDialogTest/>*/}
                <FileDetails/>
            </Stack>
        </Container>
    );
}

export default Dashboard;