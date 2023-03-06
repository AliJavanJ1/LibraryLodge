import {Dialog, DialogContent, DialogTitle, InputBase} from "@mui/material";
import {useState} from "react";
import ItemList from "./ItemList";


export default function SearchDialog({open, onClose}) {
    const [search, setSearch] = useState('');

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen={false}
            sx={{
                '& .MuiDialog-paper': {
                    width: '100%',
                    height: 600
                }
            }}
        >
            <DialogTitle>
                <InputBase
                    placeholder="Search..."
                    type="search"
                    sx={{
                        width: '100%',
                        fontSize: 18,
                    }}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </DialogTitle>
            <DialogContent dividers>
                <ItemList/>
            </DialogContent>
        </Dialog>
    )
}