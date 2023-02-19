import {createSlice} from '@reduxjs/toolkit'

const dummy = {
    1: {
        name: 'Asking for a Friend',
        library: 1,
        last_modified: '2021-01-01T00:00:00Z',
        file_template: 1,
        size: 12345,
        information: {
            1: 'Chvrches',
            2: '2013',
            3: 'Synthpop',
        },
        attachments: {
            1: {
                id: 42141,
                size: 12345,
            },
            2: {
                id: 42142,
                size: 12345,
            },
        }
    },
    2: {
        name: 'The Bones of What You Believe',
        library: 1,
        last_modified: '2021-01-01T00:00:00Z',
        file_template: 1,
        size: 12345,
        information: {
            1: 'Chvrches',
            2: '2015',
            3: 'Synthpop',
        }
    },
    3: {
        name: 'The Hunger Games',
        library: 2,
        last_modified: '2021-01-01T00:00:00Z',
        file_template: 3,
        size: 12345,
        information: {
            1: 'Suzanne Collins',
            2: '2008',
            3: 'Young Adult',
        },
        attachments: {
            1: {
                id: 42143,
                size: 12345,
            },
            2: {
                id: 42144,
                size: 12345,
            },
        }
    },
    4: {
        name: 'The Hunger Games: Catching Fire',
        library: 2,
        last_modified: '2021-01-01T00:00:00Z',
        file_template: 3,
        size: 12345,
        information: {
            1: 'Suzanne Collins',
            2: '2009',
            3: 'Young Adult',
        }
    },
    5: {
        name: 'The Hunger Games: Mockingjay',
        library: 2,
        size: 12345,
        last_modified: '2021-01-01T00:00:00Z',
        file_template: 3,
        information: {
            1: 'Suzanne Collins',
            2: '2010',
            3: 'Young Adult',
        }
    },
    6: {
        name: 'Starry Night',
        library: null,
        size: 12345,
        last_modified: '2021-01-01T00:00:00Z',
        file_template: 5,
        information: {
            1: 'Vincent van Gogh',
            2: '1889',
            3: 'Saint-Rémy-de-Provence',
        }
    }
}

const initialState = {
    ...dummy,
}

const staticSlice = createSlice({
    name: 'fileDetail',
    initialState,
    reducers: {

    },
})

// export const {} = staticSlice.actions
export default staticSlice.reducer
