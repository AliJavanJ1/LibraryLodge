import {createSlice} from '@reduxjs/toolkit'

const dummy = {

}

const initialState = {
    ...dummy,
}

const staticSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

    },
})

export const {} = staticSlice.actions
export default staticSlice.reducer
