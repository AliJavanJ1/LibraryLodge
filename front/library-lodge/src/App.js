import {LicenseInfo} from '@mui/x-license-pro';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SingUp";
import Main from "./pages/Main";

LicenseInfo.setLicenseKey('x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e');

const theme = createTheme({
    // palette: {
    //     primary: {
    //         main: `#7f8d9e`,
    //         shade1: `#7f8d9e`,
    //         shade2: `#495C74`,
    //         shade3: `#334964`,
    //         shade4: `#001b3e`,
    //     },
    //     secondary: {
    //         main: `#D8CE9D`,
    //         shade1: `#D8CE9D`,
    //         shade2: `#D3C68B`,
    //         shade3: `#CDBE78`,
    //     },
    //     grey: {
    //         main: `#383838`,
    //         shade1: `#c2c7ce`,
    //         shade2: `#c4c4c4`,
    //         shade3: `#888888`,
    //         shade4: `#383838`,
    //         shade5: `#000000`,
    //     },
    //     white: {
    //         main: `#f2f2f2`,
    //         shade1: `#f2f2f2`,
    //         shade2: `#f7f7f7`,
    //         shade3: `#ffffff`,
    //     }
    // }
})

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/login" element={<Login/>}/>
                    <Route exact path="/signup" element={<SignUp/>} />
                    <Route path="/*" element={<Main/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
