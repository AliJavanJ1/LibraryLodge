import * as React from 'react';
import {
    DataGridPro, useGridApiRef,
} from '@mui/x-data-grid-pro';
import {Stack} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import _ from "lodash";
import {useLocationFileTemplate, useLocationItems} from "../utils";
import prettyBytes from 'pretty-bytes';
import {iconMap} from "../redux/fileTemplateSlice";
import ListItemContextMenu from "./ListItemContextMenu";
import Scrollbars from "react-custom-scrollbars-2";

const isFile = (row) => 'size' in row


const NameCell = (props) => {
    const {row: {icon, name}} = props
    return (
        <Stack direction={'row'}>
            <Stack sx={{
                height: '100%',
                marginRight: '12px',
                ...(!isFile(props.row) &&
                    {
                        color: 'primary.main'
                    })
            }}>
                {iconMap[icon].type.render()}
            </Stack>
            {name}
        </Stack>
    )
}


const sizeValueGetter = (params) => {
    if (isFile(params.row)) {
        let file = params.row
        let totalSize = file.size
        totalSize = _.reduce(
            file.attachments, (totalSize, attachment) => totalSize + attachment.size, totalSize)
        return totalSize
    } else {
        return null
    }
}

const getColumns = (ft) => {
    let columns = [
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            renderCell: NameCell
        },
        {
            field: 'last_modified',
            headerName: 'Last Modified',
            minWidth: 150,
            type: 'dateTime',
            valueGetter: (params) => new Date(params.row.last_modified),
            valueFormatter: (params) => new Date(params.value).toDateString(),
        },
        {
            field: 'size',
            headerName: 'Size',
            // width: 200,
            type: 'number',
            align: 'left',
            headerAlign: 'left',
            valueGetter: sizeValueGetter,
            valueFormatter: (params) => params.value ? prettyBytes(params.value) : '-',
        }
    ]
    if (ft != null) {
        let info_cols = _.map(ft.information, (info, key) => {
            return {
                field: info,
                // width: 200,
                valueGetter: (params) => key in params.row.information ? params.row.information[key] : '-',
            }
        })
        columns = _.concat(columns, info_cols)
    }
    return columns
}

const getRows = (currFiles, currLibs, file_details, library_details, file_templates) => {
    let lib_rows = _.map(currLibs, (lib) => {
        return {
            ...library_details[lib],
            id: 'lib_' + lib,
            icon: file_templates[library_details[lib].file_template].libIcon
        }
    })
    let file_rows = _.map(currFiles, (file) => {
        return {
            ...file_details[file],
            id: 'file_' + file,
            icon: file_templates[file_details[file].file_template].icon
        }
    })
    return _.concat(lib_rows, file_rows)
}


const ItemList = ({libs: currLibs = [], files: currFiles = [], file_template = null}) => {
    const library_details = useSelector(state => state.library_details)
    const file_templates = useSelector(state => state.file_templates)
    const file_details = useSelector(state => state.file_details)
    const apiRef = useGridApiRef()
    const quickFilterInput = useSelector(state => state.env.quickFilterInput)

    useEffect(() => {
        let words = quickFilterInput.split(' ').filter(word => word !== '')
        apiRef.current.setQuickFilterValues(words)
    }, [apiRef.current, quickFilterInput]);

    let columns = useMemo(
        () => getColumns(file_template),
        [file_template])
    let rows = useMemo(
        () => getRows(currFiles, currLibs, file_details, library_details, file_templates),
        [currFiles, currLibs, file_details, library_details])

    const initialListItemContextMenu = {
        open: false,
        mouseX: 0,
        mouseY: 0,
        id: null,
    }
    const [listItemContextMenu, setListItemContextMenu] = useState(initialListItemContextMenu);
    const handleListItemContextMenu = (event) => {
        event.preventDefault();
        setListItemContextMenu(
            !listItemContextMenu.open
                ? {
                    mouseX: event.clientX + 2,
                    mouseY: event.clientY - 6,
                    open: true,
                    id: 1,
                }
                : initialListItemContextMenu,
        );
    };
    const handleListItemContextMenuClose = () => {
        setListItemContextMenu(initialListItemContextMenu);
    };


    return (
        <Stack sx={{
            height: '100%',
            width: '100%',
        }}>
            <Scrollbars>
                <DataGridPro
                    apiRef={apiRef}
                    rowHeight={48}
                    headerHeight={38}

                    rows={rows}
                    columns={columns}

                    // disableColumnResize
                    disableSelectionOnClick
                    disableColumnSelector
                    disableColumnPinning
                    disableColumnReorder
                    hideFooter
                    disableColumnMenu

                    componentsProps={{
                        row: {
                            onContextMenu: handleListItemContextMenu
                        },
                    }}
                />
            </Scrollbars>
            <ListItemContextMenu contextMenu={listItemContextMenu} handleClose={handleListItemContextMenuClose}/>
        </Stack>
    );
}

export default ItemList;