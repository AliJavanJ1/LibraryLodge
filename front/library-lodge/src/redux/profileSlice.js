import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {initialState as staticIS} from './staticSlice'

const dummy = {
    "username": "test",
    "email": "test@email.com",
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

const logout = createAsyncThunk(
    'profile/logout',
    async () => {
        return await fetch(staticIS.apiDomain + '/logout/', {
            method: 'POST',
            credentials: 'include',
        }).then(response => response.json())
    }
)

const editProfile = createAsyncThunk(
    'profile/editProfile',
    async (arg) => {
        return await fetch(staticIS.apiDomain + '/edit-profile/', {
            method: 'PUT',
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
// const initialState = null

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
        builder.addCase(login.fulfilled, (state, action) => {
            state = action.payload
            return state
        })
        builder.addCase(signUp.fulfilled, (state, action) => {
            state = action.payload
            return state
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state = null
            return state
        })
        builder.addCase(editProfile.fulfilled, (state, action) => {
            state = action.payload
            return state
        })
    }
})

export const {} = staticSlice.actions
export default staticSlice.reducer
export {fetchProfileData, login, signUp, logout, editProfile}
