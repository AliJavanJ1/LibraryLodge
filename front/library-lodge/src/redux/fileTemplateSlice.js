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
import {initialState as staticIS} from './staticSlice'
import _ from 'lodash'

const postInformationFieldRemove = createAsyncThunk(
    'fileTemplate/postInformationFieldRemove',
    async (input, {
        rejectWithValue,
        fulfillWithValue,
    }) => {
        try {
            const response = await fetch('/api/fileTemplate/informationFieldRemove/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input),
            })
            if (!response.ok) {
                return rejectWithValue(response.status)
            }
            return fulfillWithValue(await response.json())
        } catch (e) {
            return rejectWithValue(e.message)
        }
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

const fetchFileTemplates = createAsyncThunk(
    'fileTemplate/fetchFileTemplates',
    async (input, {
        rejectWithValue,
        fulfillWithValue,
    }) => {
        try {
            const response = await fetch(staticIS.apiDomain + '/dashboard/file-templates', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input),
            })
            if (!response.ok) {
                return rejectWithValue(response.status)
            }
            return fulfillWithValue(await response.json())
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const initialState = {
    ...dummy,
}

const staticSlice = createSlice({
    name: 'fileTemplate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFileTemplates.fulfilled, (state, action) => {
            const raw = action.payload
            const converted = {}
            _.forEach(raw, (value) => {
                converted[value.id] = {
                    name: value.name,
                    information: value.extra_informations,
                    attachments: value.attachments,
                    icon: value.icon,
                    libIcon: value.lib_icon,
                }
            })
            // console.log('fileTemplateSlice', converted)
            return converted
        })
    }
})

export {postInformationFieldRemove, fetchFileTemplates}
export default staticSlice.reducer
