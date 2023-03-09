import {Dialog, DialogContent, DialogTitle, InputBase} from "@mui/material";
import {useEffect, useMemo, useRef, useState} from "react";
import ItemList from "./ItemList";
import {useSelector} from "react-redux";
import Fuse from "fuse.js";
import _ from "lodash";


export default function SearchDialog({open, onClose}) {
    const [search, setSearch] = useState('');
    const library_details = useSelector(state => state.library_details)
    const file_details = useSelector(state => state.file_details)
    const [searchResults, setSearchResults] = useState({libs: [], files: []})
    const inputRef = useRef(null);

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus()
        }
    }, [open, inputRef.current])

    const searchObjs = useMemo(() => {
        let libObjs = _.map(library_details, (lib, id) => {
            return {
                library: id,
                searchStr: lib.name
            }
        })
        let fileObjs = _.map(file_details, (file, id) => {
            return {
                file: id,
                searchStr: file.name + _.join(_.values(file.information), '')
            }
        })
        return _.concat(libObjs, fileObjs)
    }, [library_details.length, file_details.length])

    const fuse = useMemo(() => {
        if (searchObjs.length) {
            return new Fuse(searchObjs, {
                includeScore: true,
                keys: ['searchStr'],
            })
        } else {
            return null
        }
    }, [searchObjs.length])
    useEffect(() => {
        if (fuse) {
            if (search === '') {
                setSearchResults({libs: [], files: []})
            } else {
                let results = fuse.search(search.replaceAll(' ', ''))
                // if results has library key, then it's a library, otherwise it's a file. create the appropriate object
                setSearchResults(results.slice(0, 10))
                results = {
                    libs: _.map(_.filter(results, (result) => 'library' in result.item), (result) => {
                        return result.item.library
                    }),
                    files: _.map(_.filter(results, (result) => 'file' in result.item), (result) => {
                        return result.item.file
                    })
                }
                setSearchResults(results)
            }
        }
    }, [search, fuse])

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
                    inputRef={inputRef}
                />
            </DialogTitle>
            <DialogContent dividers>
                <ItemList libs={searchResults.libs} files={searchResults.files}/>
            </DialogContent>
        </Dialog>
    )
}