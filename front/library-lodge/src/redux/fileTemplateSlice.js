import {createSlice} from '@reduxjs/toolkit'
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

export function editFileTemplate() {//todo
}


export function addFileTemplate() {//todo
}


const dummy = {
    1: {
        name: 'Music',
        information: [
            'Singer', 'Year', 'Genre'
        ],
        attachments: [
            'Cover', 'Lyrics'
        ],
        icon: MusicNoteOutlinedIcon,
        libIcon: LibraryMusicOutlinedIcon
    },
    2: {
        name: 'Movie',
        information: [
            'Director', 'Year', 'Genre'
        ],
        attachments: [
            'Subtitle', 'Audio'
        ],
        icon: SlideshowOutlinedIcon,
        libIcon: MovieFilterOutlinedIcon,
    },
    3: {
        name: 'Book',
        information: [
            'Author', 'Year', 'Genre'
        ],
        attachments: [
            'Cover', 'Summary'
        ],
        icon: MenuBookOutlinedIcon,
        libIcon: LibraryBooksOutlinedIcon
    },
    4: {
        name: 'Software',
        information: [
            'Developer', 'Version'
        ],
        attachments: [
            'Patch'
        ],
        icon: TerminalOutlinedIcon,
        libIcon: FilterNoneOutlinedIcon
    },
    5: {
        name: 'Picture',
        information: [
            'Photographer', 'Date', 'Place'
        ],
        attachments: [],
        icon: InsertPhotoOutlinedIcon,
        libIcon: PermMediaOutlinedIcon
    }
}

const initialState = {
    ...dummy,
}

const staticSlice = createSlice({
    name: 'fileTemplate',
    initialState,
    reducers: {

    },
})

export const {} = staticSlice.actions
export default staticSlice.reducer
