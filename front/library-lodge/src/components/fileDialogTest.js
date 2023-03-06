import {useState, useEffect} from 'react'
import {
    Typography,
    Box,
    Stack,
    Button,
    LinearProgress
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import axios from 'axios'

const App = () => {
    const [fileUpload, setFileUpload] = useState({})
    const [fileUploadProgress, setFileUploadProgress] = useState(0)
    const [error, setError] = useState('')

    const uploadFile = async (e) => {
        e.preventDefault()
        const loadingOption = {
            onUploadProgress: (progressEvent) => {
                console.log(progressEvent)
                const {total, loaded} = progressEvent;
                const precentage = Math.floor(((loaded / 1000) * 100) / (total / 1000))
                setFileUploadProgress(precentage)
            }
        }
        try {
            const formData = new FormData()
            formData.append('image', fileUpload)
            const {data} = await axios.post('/api/single', formData, loadingOption)
        } catch (error) {
            const message = error.response ? error.response.data.message : error.message
            setError(message)
        }

    }

    return (
        <Stack spacing={4}>
            <Box>
                <Button variant='contained' component='label' color='secondary' fullWidth>
                    <CloudUploadIcon/>
                    &nbsp;
                    Select Single File
                    <input type='file' hidden onChange={(e) => {
                        setFileUpload(e.target.files[0])
                    }}/>
                </Button>
            </Box>
            <Button variant='contained' fullWidth onClick={uploadFile}>Upload</Button>
            <Box sx={{display: 'flex', gap: 3, alignItems: 'center'}}>
                <Box sx={{flexGrow: 1}}><LinearProgress value={fileUploadProgress} variant='determinate' sx={{
                    width: '100%',
                    background: fileUploadProgress < 50 ? 'error' : 'primary'
                }}/></Box>
                <Typography variant='body1'>%{fileUploadProgress}</Typography>
            </Box>
        </Stack>
    )
}

export default App