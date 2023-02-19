import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    location: [],
    settingDialogOpen: false,
}

const staticSlice = createSlice({
    name: 'env',
    initialState,
    reducers: {
        setLocation(state, action) {
            state.location = action.payload
        },
        setSettingDialogOpen(state, action) {
            state.settingDialogOpen = action.payload
        }
    },
})

export const {setLocation, setSettingDialogOpen} = staticSlice.actions
export default staticSlice.reducer
