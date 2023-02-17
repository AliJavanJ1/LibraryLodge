import * as React from 'react';
import {
    DataGridPro,
} from '@mui/x-data-grid-pro';
import {Stack} from "@mui/material";
import {useMemo} from "react";
import {useSelector} from "react-redux";
import _ from "lodash";
import {useLocationItems} from "../utils";
import prettyBytes from 'pretty-bytes';

const isFile = (row) => 'size' in row


const NameCell = (props) => {
    const {row: {icon, name}} = props
    console.log(icon, name)
    return (
        <Stack direction={'row'}>
            <Stack sx={{
                height: '100%',
                marginRight: '12px',
                ...(!isFile(props.row) &&
                    {
                        color: 'orange'
                    })
            }}>
                {icon.type.render()}
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
            width: 200,
            type: 'dateTime',
            valueGetter: (params) => new Date(params.row.last_modified),
            valueFormatter: (params) => new Date(params.value).toDateString(),
        },
        {
            field: 'size',
            headerName: 'Size',
            width: 200,
            type: 'number',
            align: 'left',
            headerAlign: 'left',
            valueGetter: sizeValueGetter,
            valueFormatter: (params) => params.value ? prettyBytes(params.value) : '-',
        }
    ]
    if (ft != null) {
        let info_cols = _.map(ft.information, (info) => {
            return {
                field: info,
                width: 200,
                valueGetter: (params) => info in params.row.information ? params.row.information[info] : '-',
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

const ItemList = () => {
    const {libs: currLibs, files: currFiles} = useLocationItems()
    const location = useSelector(state => state.env.location)
    const library_details = useSelector(state => state.library_details)
    const library_detail = location.length > 0 ? library_details[_.last(location)] : null
    const file_templates = useSelector(state => state.file_templates)
    const file_template = library_detail ? file_templates[library_detail.file_template] : null
    const file_details = useSelector(state => state.file_details)

    let columns = useMemo(
        () => getColumns(file_template),
        [file_template])
    let rows = useMemo(
        () => getRows(currFiles, currLibs, file_details, library_details, file_templates),
        [currFiles, currLibs, file_details, library_details])


    return (
        <Stack sx={{
            // height: '100%'
            height: '100vh'
        }}>
            <DataGridPro
                rowHeight={48}
                headerHeight={38}

                rows={rows}
                columns={columns}

                disableColumnResize
                disableSelectionOnClick
                disableColumnSelector
                disableColumnPinning
                disableColumnReorder
                hideFooter
                disableColumnMenu
            />
        </Stack>
    );
}

export default ItemList;