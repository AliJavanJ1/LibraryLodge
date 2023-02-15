import {createSlice} from '@reduxjs/toolkit'

const dummy = [
    {
        type: 'library',
        id: 1,
        children: [
            {
                type: 'file',
                id: 1,
            },
            {
                type: 'file',
                id: 2,
            }
        ],
    },
    {
        type: 'library',
        id: 2,
        children: [
            {
                type: 'file',
                id: 3,
            },
            {
                type: 'file',
                id: 4,
            },
            {
                type: 'file',
                id: 5,
            }
        ],
    },
    {
        type: 'file',
        id: 6,
    }
]

const initialState = [
    ...dummy,
]

const staticSlice = createSlice({
    name: 'tree',
    initialState,
    reducers: {},
})

export const {} = staticSlice.actions
export default staticSlice.reducer
