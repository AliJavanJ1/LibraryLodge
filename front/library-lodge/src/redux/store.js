import {configureStore} from "@reduxjs/toolkit";
import staticReducer from "./staticSlice";
import treeReducer from "./treeSlice";
import fileDetailReducer from "./fileDetailSlice";
import libraryDetailReducer from "./libraryDetailSlice";
import fileTemplateReducer from "./fileTemplateSlice";
import profileReducer from "./profileSlice";

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
            file_template: 'file_template_id',
            'information': {
                'name' : 'value',
            },
            'attachments': {
                'name': 'id',
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
            icon: 'id', //null/not existent if it's built-in
        },
    },
    tree: [
        {
            type: 'file' | 'library',
            id: 'file_id' | 'library_id',
            children: [
                // recursive
            ],
        },
    ],
}
 */

const store = configureStore({
    reducer: {
        static: staticReducer,
        tree: treeReducer,
        file_detail: fileDetailReducer,
        library_detail: libraryDetailReducer,
        file_template: fileTemplateReducer,
        profile: profileReducer,
    },
});

export default store