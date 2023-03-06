import {useState} from "react";
import {useSelector} from "react-redux";
import EditingFileDetails from "./editingFileDetails";
import ViewFileDetails from "./viewFileDetails";


const FileDetails = () => {
    const fileDetailStatus = useSelector(store => store.env.fileDetail)
    const [editing, setEditing] = useState(fileDetailStatus === -1)

    switch (fileDetailStatus) {
        case 'closed':
            return null
        case 'new':
            return <EditingFileDetails fileId={-1}/>
        default:
            if (editing) {
                return <EditingFileDetails fileId={fileDetailStatus} setEditting={setEditing}/>
            } else {
                return <ViewFileDetails fileId={fileDetailStatus} setEditing={setEditing}/>
            }
    }
};

export default FileDetails;
