import {Divider, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import {Delete, Edit, Share} from "@mui/icons-material";


export default function ListItemContextMenu({id, contextMenu, handleClose}) {
    let handleEdit = () => {
        console.log("id", id, "onEdit") // TODO: open edit dialog
        handleClose()
    }

    let handleShare = () => {
        console.log("id", id, "onShare") // TODO: open share dialog
        handleClose()
    }

    let handleDelete = () => {
        console.log("id", id, "onDelete") // TODO: delete
        handleClose()
    }

    return (
        <Menu
            open={contextMenu !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
                contextMenu !== null
                    ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                    : undefined
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
    );
}

