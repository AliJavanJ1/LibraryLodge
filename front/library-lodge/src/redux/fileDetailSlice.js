import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {initialState as staticIS} from "./staticSlice";
import _ from 'lodash'

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

const fetchFileDetails = createAsyncThunk(
    'fileDetail/fetchFileDetails',
    async (input, {
        rejectWithValue,
        fulfillWithValue,
    }) => {
        try {
            const response = await fetch(staticIS.apiDomain + '/dashboard/all_files', {
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

const deleteFile = createAsyncThunk(
    'fileDetail/deleteFile',
    async (input, {
        rejectWithValue,
        fulfillWithValue,
}) => {
    try {
        const response = await fetch(staticIS.apiDomain + '/dashboard/delete_file/' + input.file_id, {
            method: 'DELETE',
            credentials: 'include',
            accessControlAllowOrigin: staticIS.domain,
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
})


const initialState = {
    ...dummy,
}

const fileDetailSlice = createSlice({
    name: 'fileDetail',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFileDetails.fulfilled, (state, action) => {
            const raw = action.payload.filter((file) => file.type !== 'ATTACHMENT')
            const converted = {}
            _.forEach(raw, (value) => {
                converted[value.id] = {
                    name: value.name,
                    library: value.library_id,
                    last_modified: value.create_date,
                    file_template: value.file_template_id,
                    size: _.parseInt(value.desc),
                    information: value.extra_info,
                    attachments: _.reduce(value.attachments, (result, attachment_file_id, attachment_id) => {
                        const attachment = _.find(action.payload, (file) => file.id === attachment_file_id)
                        result[attachment_id] = {
                            id: attachment.id,
                            size: _.parseInt(attachment.desc ? attachment.desc : 0),
                            name: attachment.name,
                        }
                        return result
                    }, {}),
                }
            })
            console.log('fileDetailSlice', converted)
            return converted
        })
    }
})

export {fetchFileDetails, deleteFile}
export const {} = fileDetailSlice.actions
export default fileDetailSlice.reducer
