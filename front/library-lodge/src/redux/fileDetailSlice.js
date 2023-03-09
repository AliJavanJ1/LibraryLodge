import {createSlice} from '@reduxjs/toolkit'

const dummy = {
    1: {
        name: 'Asking for a Friend dddddddddddddddddddddd',
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
                name: 'Asking for a Friend.png',
            },
            2: {
                id: 42142,
                size: 12345,
                name: 'Asking for a Friend.txt',
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
        },
        attachments: {
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
                name: 'The Hunger Games.png'
            },
            2: {
                id: 42144,
                size: 12345,
                name: 'The Hunger Games.txt'
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
        },
        attachments: {
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
        },
        attachments: {
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
        },
        attachments: {
        }
    },
    7: {
        name: 'Titanic',
        library: null,
        size: 1200000345,
        last_modified: '2022-01-01T00:00:00Z',
        file_template: 2,
        information: {
            1: 'James Cameron',
            2: '1997',
            3: 'Romance',
        },
        attachments: {
            1: {
                id: 42145,
                size: 12345,
                name: 'Titanic.srt'
            }
        }
    },
    8: {
        name: 'Clueless',
        library: null,
        size: 1200000345,
        last_modified: '2022-01-01T00:00:00Z',
        file_template: 2,
        information: {
            1: 'Amy Heckerling',
            2: '1995',
            3: 'Comedy',
        },
        attachments: {
            1: {
                id: 42145,
                size: 12345,
                name: 'Clueless.srt'
            }
        }
    },
    9: {
        name: 'The Last of Us Part I',
        library: null,
        size: 1200000345,
        last_modified: '2022-01-01T00:00:00Z',
        file_template: 2,
        information: {
            2: '2022',
            3: 'Action',
        },
        attachments: {
        }
    }
}

const initialState = {
    ...dummy,
}

const fileDetailSlice = createSlice({
    name: 'fileDetail',
    initialState,
    reducers: {

    },
})

export const {} = fileDetailSlice.actions
export default fileDetailSlice.reducer
