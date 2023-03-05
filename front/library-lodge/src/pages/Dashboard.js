import React from 'react';
import ItemList from "../components/ItemList";
import FileDialogTest from "../components/fileDialogTest";
import {Container, Stack} from "@mui/material";

const Dashboard = (props) => (
    <Container fixed>
        <Stack direction={'row'}>
            <ItemList/>
            {/*<FileDialogTest/>*/}
        </Stack>
    </Container>
);

export default Dashboard;