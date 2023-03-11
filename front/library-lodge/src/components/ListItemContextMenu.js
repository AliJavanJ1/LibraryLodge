import {Box, Divider, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {Delete, Edit, Link, Share} from "@mui/icons-material";
import {useState} from "react";
import ShareDialog from "./ShareDialog";
import {useDispatch, useSelector} from "react-redux";
import {setEditingFileDetail, setFileDetail} from "../redux/envSlice";


export default function ListItemContextMenu({contextMenu, handleClose}) {
    const {open, mouseX, mouseY, id, isFile} = contextMenu;
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const file_details = useSelector((state) => state.file_details);
    const dispatch = useDispatch();

    const handleEdit = () => {
        console.log("id", id, "onEdit", isFile)
        if(isFile){
            dispatch(setEditingFileDetail(true))
            dispatch(setFileDetail(id))
        }else{
            //todo: open library edit dialog
        }
        handleClose()
    }

    const handleShare = () => {
        setShareDialogOpen(true)
        handleClose()
    }

    const handleDelete = () => {
        console.log("id", id, "onDelete") // TODO: delete
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
        </Box>

    );
}

