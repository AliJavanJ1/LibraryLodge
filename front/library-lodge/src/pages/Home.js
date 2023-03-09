import ItemList from "../components/ItemList";
import FileDialogTest from "../components/fileDialogTest";
import {Box, Container, Stack, InputBase} from "@mui/material";
import FileDetails from "../components/fileDetails/fileDetails";
import BreadCrumbs from "../components/Breadcrumbs";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setQuickFilterInput} from "../redux/envSlice";
import {useLocationFileTemplate, useLocationItems} from "../utils";

const Home = () => {
    const dispatch = useDispatch()
    const quickFilterInput = useSelector(state => state.env.quickFilterInput)
    const {libs, files} = useLocationItems()
    const file_template = useLocationFileTemplate()
    
    const data = [
        {id: 1, name: 'MusicNoteOutlinedIcon', link: '#', type: 'MusicNoteOutlinedIcon'},
        {id: 2, name: 'SlideshowOutlinedIcon', link: '#', type: 'SlideshowOutlinedIcon'},
        {id: 3, name: 'MenuBookOutlinedIcon', link: '#', type: 'MenuBookOutlinedIcon'},
        // {id: 4, name: 'TerminalOutlinedIcon', link: '#', type: 'TerminalOutlinedIcon'},
        // {id: 5, name: 'InsertPhotoOutlinedIcon', link: '#', type: 'InsertPhotoOutlinedIcon'},
        // {id: 6, name: 'PermMediaOutlinedIcon', link: '#', type: 'PermMediaOutlinedIcon'},
        // {id: 7, name: 'MovieFilterOutlinedIcon', link: '#', type: 'MovieFilterOutlinedIcon'},
        // {id: 8, name: 'LibraryBooksOutlinedIcon', link: '#', type: 'LibraryBooksOutlinedIcon'},
        // {id: 9, name: 'FilterNoneOutlinedIcon', link: '#', type: 'FilterNoneOutlinedIcon'},
        // {id: 10, name: 'LibraryMusicOutlinedIcon', link: '#', type: 'LibraryMusicOutlinedIcon'}
    ]


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
                        <BreadCrumbs data={data} />
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

export default Home;