import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    location: [],
    sharedLocation: [],
    settingDialogOpen: false,
    // fileDetail: 7,
    // fileDetail: -1,
    fileDetail: 'closed',
    editingFileDetail: false,
    quickFilterInput: '',
    alert: null,
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
        },
        setFileDetail(state, action) {
            state.fileDetail = action.payload
        },
        setQuickFilterInput(state, action) {
            state.quickFilterInput = action.payload
        },
        setEditingFileDetail(state, action) {
            state.editingFileDetail = action.payload
        },
        setAlert(state, action) {
            state.alert = action.payload
        }
    },
})

export const {setLocation, setSettingDialogOpen, setFileDetail, setQuickFilterInput, setEditingFileDetail, setAlert} = staticSlice.actions
export default staticSlice.reducer
