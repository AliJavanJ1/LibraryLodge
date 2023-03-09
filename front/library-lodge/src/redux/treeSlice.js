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

const treeSlice = createSlice({
    name: 'tree',
    initialState,
    reducers: {},
})

export const {} = treeSlice.actions
export default treeSlice.reducer
