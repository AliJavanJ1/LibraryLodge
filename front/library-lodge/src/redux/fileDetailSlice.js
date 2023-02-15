import {createSlice} from '@reduxjs/toolkit'

const dummy = {
    1: {
        name: 'Asking for a Friend',
        library: 1,
        last_modified: '2021-01-01T00:00:00Z',
        file_template: 1,
        information: {
            'Singer': 'Chvrches',
            'Year': '2013',
            'Genre': 'Synthpop',
        },
        attachments: {
            'Cover': 42141,
            'Lyrics': 42142,
        }
    },
    2: {
        name: 'The Bones of What You Believe',
        library: 1,
        last_modified: '2021-01-01T00:00:00Z',
        file_template: 1,
        information: {
            'Singer': 'Chvrches',
            'Year': '2015',
            'Genre': 'Synthpop',
        }
    },
    3: {
        name: 'The Hunger Games',
        library: 2,
        last_modified: '2021-01-01T00:00:00Z',
        file_template: 3,
        information: {
            'Author': 'Suzanne Collins',
            'Year': '2008',
            'Genre': 'Young Adult',
        },
        attachments: {
            'Cover': 42143,
            'Summary': 42144,
        }
    },
    4: {
        name: 'The Hunger Games: Catching Fire',
        library: 2,
        last_modified: '2021-01-01T00:00:00Z',
        file_template: 3,
        information: {
            'Author': 'Suzanne Collins',
            'Year': '2009',
            'Genre': 'Young Adult',
        }
    },
    5: {
        name: 'The Hunger Games: Mockingjay',
        library: 2,
        last_modified: '2021-01-01T00:00:00Z',
        file_template: 3,
        information: {
            'Author': 'Suzanne Collins',
            'Year': '2010',
            'Genre': 'Young Adult',
        }
    },
    6: {
        name: 'Starry Night',
        library: null,
        last_modified: '2021-01-01T00:00:00Z',
        file_template: 5,
        information: {
            'Photographer': 'Vincent van Gogh',
            'Date': '1889',
            'Place': 'Saint-Rémy-de-Provence',
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

export const {} = staticSlice.actions
export default staticSlice.reducer
