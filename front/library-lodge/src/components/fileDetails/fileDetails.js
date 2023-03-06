import {useState} from "react";
import {useSelector} from "react-redux";
import EditingFileDetails from "./editingFileDetails";
import ViewFileDetails from "./viewFileDetails";


const FileDetails = () => {
    const [editing, setEditing] = useState(false);
    const fileDetailStatus = useSelector(store => store.env.fileDetail)

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
