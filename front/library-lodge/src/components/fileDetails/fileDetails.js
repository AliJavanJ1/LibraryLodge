import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import EditingFileDetails from "./editingFileDetails";
import ViewFileDetails from "./viewFileDetails";


const FileDetails = () => {
    const fileDetailStatus = useSelector(store => store.env.fileDetail)
    const editing = useSelector(store => store.env.editingFileDetail)


    if (fileDetailStatus === 'closed') {
        return null
    } else {
        if (fileDetailStatus === -1 || editing) {
            return <EditingFileDetails fileId={fileDetailStatus}/>
        } else {
            return <ViewFileDetails fileId={fileDetailStatus}/>
        }
    }
};

export default FileDetails;
