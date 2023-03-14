import {Box, Divider, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {Delete, Edit, Link, Share} from "@mui/icons-material";
import {useState} from "react";
import ShareDialog from "./ShareDialog";
import {useDispatch, useSelector} from "react-redux";
import {setEditingFileDetail, setFileDetail} from "../redux/envSlice";
import {deleteLibrary, fetchLibraryDetails} from "../redux/libraryDetailSlice";
import {deleteFile, fetchFileDetails} from "../redux/fileDetailSlice";
import {buildTree, resetTree} from "../redux/treeSlice";
import LibraryDialog from "./LibraryDialog";


export default function ListItemContextMenu({contextMenu, handleClose}) {
    const {open, mouseX, mouseY, id, isFile} = contextMenu;
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [libraryDialogData, setLibraryDialogData] = useState(null)
    const file_details = useSelector((state) => state.file_details);
    const library_details = useSelector(state => state.library_details[id])
    const dispatch = useDispatch();

    const handleEdit = () => {
        console.log("id", id, "onEdit", isFile)
        if(isFile){
            dispatch(setEditingFileDetail(true))
            dispatch(setFileDetail(id))
            handleClose()
        }else{
            //todo: open library edit dialog
            setLibraryDialogData({
                file_template_id: library_details.file_template,
                name: library_details.name
            })
        }
    }

    const handleShare = () => {
        setShareDialogOpen(true)
        handleClose()
    }

    const handleDelete = () => {
        console.log("id", id, "onDelete") // TODO: delete
        if(isFile){
            dispatch(deleteFile({file_id: id})).unwrap()
                .then((res) => {
                    // setAlert({"severity": "success",
                    //     "message": "Library " + values.name + " added successfully."}) // TODO: add alert
                    dispatch(resetTree()).unwrap().then((res)=>{
                        dispatch(fetchLibraryDetails()).then((res)=>{
                            dispatch(fetchFileDetails()).then((res)=>{
                                dispatch(buildTree())
                            })
                        })
                    })
                    handleClose()
                })
                .catch((message) => {
                    // setAlert({"severity": "error",
                    //     "message": message}); // TODO: add alert
                })
        }else{
            dispatch(deleteLibrary({library_id: id})).unwrap()
                .then((res) => {
                    // setAlert({"severity": "success",
                    //     "message": "Library " + values.name + " added successfully."}) // TODO: add alert
                    dispatch(resetTree()).unwrap().then((res)=>{
                        dispatch(fetchLibraryDetails()).then((res)=>{
                            dispatch(fetchFileDetails()).then((res)=>{
                                dispatch(buildTree())
                            })
                        })
                    })
                    handleClose()
                })
                .catch((message) => {
                    // setAlert({"severity": "error",
                    //     "message": message}); // TODO: add alert
                })
        }
        handleClose()
    }

    const handleCopyPublicShareLink = () => {
        navigator.clipboard.writeText("https://www.google.com") // TODO: generate public share link if necessary and copy to clipboard
        handleClose()
    }

    return (
        <Box>
            <Menu
                open={open}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    { top: mouseY || 0, left: mouseX || 0 }
                }
            >
                <MenuItem onClick={handleEdit}>
                    <ListItemIcon>
                        <Edit fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleShare}>
                    <ListItemIcon>
                        <Share fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Share</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleCopyPublicShareLink}> {/* TODO: remove if current user is not owner */}
                    <ListItemIcon>
                        <Link fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Copy Public Share Link</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={handleDelete}
                    sx={{
                        color: 'error.main',
                    }}
                >
                    <ListItemIcon
                        sx={{
                            color: 'inherit',
                        }}
                    >
                        <Delete fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>
            {shareDialogOpen
             && <ShareDialog
                    id={id}
                    open={shareDialogOpen}
                    onClose={() => setShareDialogOpen(false)}/>
            }
            {Boolean(libraryDialogData)
             && <LibraryDialog
                    open={Boolean(libraryDialogData)}
                    onClose={() => setLibraryDialogData(null)}
                    file_template_id={libraryDialogData.file_template_id}
                    name={libraryDialogData.name}
                />
            }
        </Box>

    );
}

