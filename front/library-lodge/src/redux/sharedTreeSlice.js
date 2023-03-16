import {createSlice} from '@reduxjs/toolkit'

const dummy = {
    libraries: {

    },
    files: []
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
