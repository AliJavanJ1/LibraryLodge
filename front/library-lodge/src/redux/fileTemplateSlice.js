import {createSlice} from '@reduxjs/toolkit'

const dummy = {
    1: {
        name: 'Music',
        information: [
            'Singer', 'Year', 'Genre'
        ],
        attachments: [
            'Cover', 'Lyrics'
        ],
    },
    2: {
        name: 'Movie',
        information: [
            'Director', 'Year', 'Genre'
        ],
        attachments: [
            'Subtitle', 'Audio'
        ],
    },
    3: {
        name: 'Book',
        information: [
            'Author', 'Year', 'Genre'
        ],
        attachments: [
            'Cover', 'Summary'
        ],
    },
    4: {
        name: 'Software',
        information: [
            'Developer', 'Version'
        ],
        attachments: [
            'Patch'
        ],
    },
    5: {
        name: 'Picture',
        information: [
            'Photographer', 'Date', 'Place'
        ],
        attachments: [],
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
