import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {initialState as staticIS} from './staticSlice'

const dummy = {
    "username": "test",
    "email": "test@email.com",
}

const fetchProfileData = createAsyncThunk(
    'profile/fetchProfileData',
    async (arg, {rejectWithValue, fulfillWithValue}) => {
        try {
            const response = await fetch(staticIS.apiDomain + '/account/profile/', {
                method: 'GET',
                credentials: 'include',
                accessControlAllowOrigin: staticIS.domain,
            })
            if (!response.ok) {
                return rejectWithValue(response.statusText)
            }
            return fulfillWithValue(await response.json())
        }
        catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const login = createAsyncThunk(
    'profile/login',
    async (arg, {rejectWithValue, fulfillWithValue}) => {
        try {
            const response = await fetch(staticIS.apiDomain + '/account/login/', {
                method: 'POST',
                credentials: 'include',
                accessControlAllowOrigin: staticIS.domain,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arg),
            })
            if (!response.ok) {
                return rejectWithValue(response.statusText)
            }
            return fulfillWithValue(await response.json())
        }
        catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const signUp = createAsyncThunk(
    'profile/signUp',
    async (arg, {rejectWithValue, fulfillWithValue}) => {
        try {
            const response = await fetch(staticIS.apiDomain + '/account/signup/', {
                method: 'POST',
                credentials: 'include',
                accessControlAllowOrigin: staticIS.domain,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arg),
            })
            if (!response.ok) {
                return rejectWithValue(response.statusText)
            }
            return fulfillWithValue(await response.json())
        }
        catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const logout = createAsyncThunk(
    'profile/logout', async (arg, {rejectWithValue, fulfillWithValue}) => {
        try {
            const response = await fetch(staticIS.apiDomain + '/account/logout/', {
                method: 'POST',
                credentials: 'include',
                accessControlAllowOrigin: staticIS.domain,
            })
            if (!response.ok) {
                return rejectWithValue(response.statusText)
            }
            return fulfillWithValue(await response.json())
        }
        catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const editProfile = createAsyncThunk(
    'profile/editProfile',
    async (arg, {rejectWithValue, fulfillWithValue, getState}) => {
        try {
            const state = getState()
            const queries = "?" + new URLSearchParams(arg).toString()
            const response = await fetch(staticIS.apiDomain + '/account/update_profile/' + state.profile.id + queries, {
                method: 'PUT',
                credentials: 'include',
                accessControlAllowOrigin: staticIS.domain,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arg),
            })
            if (!response.ok) {
                return rejectWithValue(response.statusText)
            }
            return fulfillWithValue(await response.json())
        }
        catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const requestPasswordReset = createAsyncThunk(
    'profile/requestPasswordReset',
    async (arg, {rejectWithValue, fulfillWithValue}) => {
        try {
            const response = await fetch(staticIS.apiDomain + '/reset-password/', {
                method: 'POST',
                credentials: 'include',
                accessControlAllowOrigin: staticIS.domain,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arg),
            })
            if (!response.ok) {
                return rejectWithValue(response.statusText)
            }
            return fulfillWithValue(await response.json())
        }
        catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const resetPassword = createAsyncThunk(
    'profile/resetPassword',
    async (arg, {rejectWithValue, fulfillWithValue}) => {
        try {
            const response = await fetch(staticIS.apiDomain + '/reset-password/', {
                method: 'PUT',
                credentials: 'include',
                accessControlAllowOrigin: staticIS.domain,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(arg),
            })
            if (!response.ok) {
                return rejectWithValue(response.statusText)
            }
            return fulfillWithValue(await response.json())
        }
        catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

// const initialState = {
//     ...dummy,
// }
const initialState = null

const staticSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        resetProfile(state, action) {
            state = initialState
            return state
        },
        updateProfile(state, action) {
            console.log("setProfile", state)
            console.log(action)
            state.username = action.payload.username
            state.email = action.payload.email
            state.password = action.payload.password
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfileData.fulfilled, (state, action) => {
            state = action.payload
            return state
        })
        builder.addCase(logout.fulfilled, (state, action) => { // TODO: should I delete action input?
            state = null
            return state
        })
    }
})

export const {resetProfile, updateProfile} = staticSlice.actions
export default staticSlice.reducer
export {fetchProfileData, login, signUp, logout, editProfile, requestPasswordReset, resetPassword}
