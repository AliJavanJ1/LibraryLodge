import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    location: []
}

const staticSlice = createSlice({
    name: 'env',
    initialState,
    reducers: {

    },
})

export const {} = staticSlice.actions
export default staticSlice.reducer
