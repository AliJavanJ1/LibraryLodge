import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import _ from 'lodash'

const dummy = {
    libraries: {
        1: {
            files: [1, 2],
        },
        2: {
            files: [3, 4, 5],
        },
    },
    files: [6, 7]
}

const buildTree = createAsyncThunk(
    'tree/buildTree',
    async (payload, thunkAPI) => {
        const {library_details, file_details} = thunkAPI.getState()
        const libraries = _.pickBy(library_details, (library) => !library.shared)
        const tree = {
            libraries: {},
            files: [],
        }
        _.forEach(libraries, (library, id) => {
            tree.libraries[id] = {
                files: _.keys(_.pickBy(file_details, (file) => {
                    return file.library == id
                })),
            }
        })
        tree.files = _.keys(_.pickBy(file_details, (file) => file.library === null))
        return tree
    }
)

const initialState = {
    // ...dummy,
}

const treeSlice = createSlice({
    name: 'tree',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(buildTree.fulfilled, (state, action) => {
            // console.log('buildTree.fulfilled', action.payload)
            return action.payload
        })
    }
})

export {buildTree}
export const {} = treeSlice.actions
export default treeSlice.reducer
