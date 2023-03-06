import {createSlice} from '@reduxjs/toolkit'

const dummy = {
    libraries: {
        1: {
            files: [1, 2],
        },
        2: {
            files: [3, 4, 5],
        },
    },
    files: [6, 7]
}

const initialState = {
    ...dummy,
}

const staticSlice = createSlice({
    name: 'tree',
    initialState,
    reducers: {},
})

export const {} = staticSlice.actions
export default staticSlice.reducer
