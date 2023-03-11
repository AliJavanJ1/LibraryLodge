import {createSlice} from '@reduxjs/toolkit'

const dummy = {

}

const initialState = {
    'domain': 'http://localhost:3000',
    'apiDomain': 'http://localhost:8080/api',
    ...dummy,
}

const staticSlice = createSlice({
    name: 'static',
    initialState,
    reducers: {

    },
})

export const {} = staticSlice.actions
export default staticSlice.reducer
export {initialState}

