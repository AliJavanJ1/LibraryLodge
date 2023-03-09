import {createSlice} from '@reduxjs/toolkit'

const dummy = {
    libraries: {
        3: {
            files: [9],
        },
    },
    files: [8]
}

const initialState = {
    ...dummy,
}

const sharedTreeSlice = createSlice({
    name: 'tree',
    initialState,
    reducers: {},
})

export const {} = sharedTreeSlice.actions
export default sharedTreeSlice.reducer
