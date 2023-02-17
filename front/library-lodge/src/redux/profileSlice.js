import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
// import initialState of staticSlice as staticIS
import {initialState as staticIS} from './staticSlice'

const dummy = {

}

const fetchProfileData = createAsyncThunk(
    'profile/fetchProfileData',
    async () => {
        return await fetch(staticIS.apiDomain + '/profile/', {
            method: 'GET',
            credentials: 'include',
        }).then(response => response.json())
    }
)

// login function that use username and password to login and saves the token in the cookie
const login = createAsyncThunk(
    'profile/login',
    async (arg) => {
        return await fetch(staticIS.apiDomain + '/login/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(arg),
        }).then(response => response.json())
    }
)

const signUp = createAsyncThunk(
    'profile/signUp',
    async (arg) => {
        return await fetch(staticIS.apiDomain + '/signUp/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(arg),
        }).then(response => response.json())
    }
)

const initialState = {
    ...dummy,
}

const staticSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfileData.fulfilled, (state, action) => {
            state = action.payload
            return state
        })
    }
})

export const {} = staticSlice.actions
export default staticSlice.reducer
export {fetchProfileData, login, signUp}
