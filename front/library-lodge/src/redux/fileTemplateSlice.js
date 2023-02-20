import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import MovieFilterOutlinedIcon from '@mui/icons-material/MovieFilterOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import TerminalOutlinedIcon from '@mui/icons-material/TerminalOutlined';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';

//thunk for changing specific information of a file template. input is templateId, informationId, and new value. error codes are checked.
const postInformationEdit = createAsyncThunk(
    'fileTemplate/postInformationEdit',
    async (input, thunkAPI) => {
        const response = await fetch('/api/fileTemplate/informationEdit/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        })
        const data = await response.json()
        if (data.error) {
            return thunkAPI.rejectWithValue(data.error)
        }
        return data
    }
)

const dummy = {
    1: {
        name: 'Music',
        information: {
            1: 'Singer',
            2: 'Year',
            3: 'Genre',
        },
        attachments: {
            1: 'Cover',
            2: 'Lyrics',
        },
        icon: 'MusicNoteOutlinedIcon',
        libIcon: 'LibraryMusicOutlinedIcon'
    },
    2: {
        name: 'Movie',
        information: {
            1: 'Director',
            2: 'Year',
            3: 'Genre',
        },
        attachments: {
            1: 'Subtitle',
            2: 'Audio',
        },
        icon: 'SlideshowOutlinedIcon',
        libIcon: 'MovieFilterOutlinedIcon',
    },
    3: {
        name: 'Book',
        information: {
            1: 'Author',
            2: 'Year',
            3: 'Genre',
        },
        attachments: {
            1: 'Cover',
            2: 'Summary',
        },
        icon: 'MenuBookOutlinedIcon',
        libIcon: 'LibraryBooksOutlinedIcon'
    },
    4: {
        name: 'Software',
        information: {
            1: 'Developer',
            2: 'Version',
        },
        attachments: {
            1: 'Patch',
        },
        icon: 'TerminalOutlinedIcon',
        libIcon: 'FilterNoneOutlinedIcon'
    },
    5: {
        name: 'Picture',
        information: {
            1: 'Photographer',
            2: 'Date',
            3: 'Place',
        },
        attachments: {},
        icon: 'InsertPhotoOutlinedIcon',
        libIcon: 'PermMediaOutlinedIcon'
    }
}

export const iconMap = {
    'MusicNoteOutlinedIcon': MusicNoteOutlinedIcon,
    'SlideshowOutlinedIcon': SlideshowOutlinedIcon,
    'MenuBookOutlinedIcon': MenuBookOutlinedIcon,
    'TerminalOutlinedIcon': TerminalOutlinedIcon,
    'InsertPhotoOutlinedIcon': InsertPhotoOutlinedIcon,
    'PermMediaOutlinedIcon': PermMediaOutlinedIcon,
    'MovieFilterOutlinedIcon': MovieFilterOutlinedIcon,
    'LibraryBooksOutlinedIcon': LibraryBooksOutlinedIcon,
    'FilterNoneOutlinedIcon': FilterNoneOutlinedIcon,
    'LibraryMusicOutlinedIcon': LibraryMusicOutlinedIcon,
}

const initialState = {
    ...dummy,
}

const staticSlice = createSlice({
    name: 'fileTemplate',
    initialState,
    reducers: {},
})

// export const {} = staticSlice.actions
export default staticSlice.reducer
