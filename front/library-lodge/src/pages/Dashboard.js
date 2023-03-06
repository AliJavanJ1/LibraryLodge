import React from 'react';
import ItemList from "../components/ItemList";
import FileDialogTest from "../components/fileDialogTest";
import {Box, Container, Stack} from "@mui/material";
import FileDetails from "../components/fileDetails/fileDetails";
import Scrollbars from "react-custom-scrollbars-2";

const Dashboard = (props) => (
    <Container maxWidth='xl'>
        <Stack direction={'row'} spacing={2}>
            <Box sx={{
                flex: 4,
                height: 'calc(100vh - 120px)',
            }}>
                <ItemList/>
            </Box>
            {/*<FileDialogTest/>*/}
            <FileDetails/>
        </Stack>
    </Container>
);

export default Dashboard;