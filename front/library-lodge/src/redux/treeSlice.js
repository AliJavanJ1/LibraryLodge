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

// asyncthunk to build the tree similar to dummy using file and library details. use lodash when possible.
// files includes files which are not in any library. each library includes files which are in that library. libraries that are in this tree are not shared.
const buildTree = createAsyncThunk(
    'tree/buildTree',
    async (payload, thunkAPI) => {
        const {library_details, file_details} = thunkAPI.getState()
        const libraries = _.pickBy(library_details, (library) => !library.shared)
        const tree = {
            libraries: {},
            files: [],
        }
        for (const library of _.values(libraries)) {
            _.forEach(libraries, (library, id)=>{
                tree.libraries[id] = {
                    files: _.keys(_.pickBy(file_details, (file) => file.library === library.id)),
                }
            })
        }
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
            console.log('buildTree.fulfilled', action.payload)
            return action.payload
        })
    }
})

export {buildTree}
export const {} = treeSlice.actions
export default treeSlice.reducer
