import {configureStore} from "@reduxjs/toolkit";
import staticReducer from "./staticSlice";
import treeReducer from "./treeSlice";
import fileDetailReducer from "./fileDetailSlice";
import libraryDetailReducer from "./libraryDetailSlice";
import fileTemplateReducer from "./fileTemplateSlice";
import profileReducer from "./profileSlice";
import envSlice from "./envSlice";

/*
{
    static: {

    },
    profile: {

    },
    file_detail: {
        'file1_id': {
            name: 'name',
            library: 'library_id', //null if it's not in a library
            last_modified: 'last_modified',
            size: 'size',
            file_template: 'file_template_id',
            'information': {
                'name' : 'value',
            },
            'attachments': {
                'name': {
                    id: 'id',
                    size: 'size',
                },
            },
        },
    },
    library_detail: {
        'library1_id': {
            name: 'name',
            file_template: 'file_template_id',
            last_modified: 'last_modified',
        },
    },
    file_template: {
        'file_template1_id': {
            name: 'name',
            information: [
                'name',
            ],
            attachments: [
                'name',
            ],
            icon: 'icon',
            libIcon: 'icon'
        },
    },
    tree: {
        libraries: {
            'id': {
                // recursive
            }
        },
        files: ['id']
    },
}
 */

const store = configureStore({
    reducer: {
        static: staticReducer,
        tree: treeReducer,
        file_details: fileDetailReducer,
        library_details: libraryDetailReducer,
        file_templates: fileTemplateReducer,
        profile: profileReducer,
        env: envSlice,
    },
});

export default store