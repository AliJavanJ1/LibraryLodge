import {createSlice} from '@reduxjs/toolkit'

const dummy = {
    1: {
        name: 'Chvrches',
        file_template: 1,
        last_modified: '2021-01-01T00:00:00Z',
        shared: false
    },
    2: {
        name: 'Hunger Games',
        file_template: 3,
        last_modified: '2021-01-01T00:00:00Z',
        shared: false,
    },
    3: {
        name: 'The Last of Us',
        file_template: 3,
        last_modified: '2021-01-01T00:00:00Z',
        shared: true,
    }
}

const initialState = {
    ...dummy,
}

const staticSlice = createSlice({
    name: 'libraryDetail',
    initialState,
    reducers: {

    },
})

export const {} = staticSlice.actions
export default staticSlice.reducer
