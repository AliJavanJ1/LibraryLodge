import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {initialState as staticIS} from "./staticSlice";
import _ from 'lodash'

const dummy = {
    1: {
        name: 'Chvrches',
        file_template: 1,
        last_modified: '2021-01-01T00:00:00Z',
        shared: false
    },
    2: {
        name: 'Hunger Games',
        file_template: 3,
        last_modified: '2021-01-01T00:00:00Z',
        shared: false,
    },
    3: {
        name: 'The Last of Us',
        file_template: 3,
        last_modified: '2021-01-01T00:00:00Z',
        shared: true,
    }
}

const fetchLibraryDetails = createAsyncThunk(
    'libraryDetail/fetchLibraryDetails',
    async (input, {
        rejectWithValue,
        fulfillWithValue,
    }) => {
        try {
            const response = await fetch(staticIS.apiDomain + '/dashboard/all_libraries', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input),
            })
            if (!response.ok) {
                return rejectWithValue(response.status)
            }
            return fulfillWithValue(await response.json())
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const initialState = {
    ...dummy,
}

const staticSlice = createSlice({
    name: 'libraryDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLibraryDetails.fulfilled, (state, action) => {
            const raw = action.payload
            const converted = {}
            _.forEach(raw, (value) => {
                converted[value.id] = {
                    name: value.name,
                    file_template: value.file_template_id,
                    last_modified: value.create_date,
                    shared: value.shared,
                }
            })
            // console.log('fetchLibraryDetails', converted)
            return converted
        })
    }
})

export {fetchLibraryDetails}
export const {} = staticSlice.actions
export default staticSlice.reducer
