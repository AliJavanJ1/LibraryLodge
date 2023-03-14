import React, {useMemo, useState} from 'react';
import {Stack, styled, TextField, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import * as Yup from "yup";
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {setAlert} from "../redux/envSlice";

export const StyledIconButton = styled(IconButton)({
    padding: .5,
});

//switch case for different Adornments: editMode, sureMode and default
const Adornment = ({editMode, sureMode, onEdit, onRemove, onCancel, setEditMode, setSureMode}) => {
    switch (true) {
        case editMode:
            return (
                <Stack direction={'row'}>
                    <Tooltip title={'Save'}>
                        <StyledIconButton onClick={onEdit}>
                            <DoneIcon/>
                        </StyledIconButton>
                    </Tooltip>
                    <Tooltip title={'Cancel'}>
                        <StyledIconButton onClick={onCancel}>
                            <CloseIcon/>
                        </StyledIconButton>
                    </Tooltip>
                </Stack>
            );
        case sureMode:
            return (
                <Stack direction={'row'}>
                    <Tooltip title={"I'm sure"}>
                        <StyledIconButton onClick={onRemove}>
                            <DoneIcon/>
                        </StyledIconButton>
                    </Tooltip>
                    <Tooltip title={'Cancel'}>
                        <StyledIconButton onClick={onCancel}>
                            <CloseIcon/>
                        </StyledIconButton>
                    </Tooltip>
                </Stack>
            );
        default:
            return (
                <Stack direction={'row'}>
                    <Tooltip title={'Edit'}>
                        <StyledIconButton onClick={() => setEditMode(true)}>
                            <ModeOutlinedIcon/>
                        </StyledIconButton>
                    </Tooltip>
                    <Tooltip title={'Remove'}>
                        <StyledIconButton onClick={() => setSureMode(true)}>
                            <DeleteOutlineIcon/>
                        </StyledIconButton>
                    </Tooltip>
                </Stack>
            );
    }
}

function StandaloneField({value, onEdit, onRemove, ...props}) {
    const [editMode, setEditMode] = useState(false);
    const [sureMode, setSureMode] = useState(false);
    const dispatch = useDispatch();

    const initialValue = useMemo(() => ({
        value: value
    }), [value]);

    const formik = useFormik({
        validateOnMount: true,
        enableReinitialize: true,
        initialValues: initialValue,
        validationSchema: Yup.object({
            value: Yup.string().trim().required('Field name cannot be empty')
        }),
    })

    const onEditWrapper = () => {
        if (formik.isValid) {
            setEditMode(false);
            onEdit(formik.values.value);
            formik.resetForm(); //remaps initialValues
        } else {
            dispatch(setAlert({
                severity: 'error',
                message: formik.errors.value
            }))
        }
    }

    const onRemoveWrapper = () => {
        console.assert(sureMode, 'onRemoveWrapper: sureMode is false');
        setSureMode(false);
        onRemove();
    }

    const onCancel = () => {
        setEditMode(false);
        setSureMode(false);
        formik.resetForm()
    }

    return (
        <>
            <TextField
                {...props}
                size={"small"}
                InputProps={{
                    endAdornment: (
                        <Adornment
                            editMode={editMode}
                            sureMode={sureMode}
                            onEdit={onEditWrapper}
                            onRemove={onRemoveWrapper}
                            onCancel={onCancel}
                            setEditMode={setEditMode}
                            setSureMode={setSureMode}
                        />
                    )
                }}
                sx={{
                    width: '275px',
                    '& .MuiInputBase-root': {
                        paddingRight: .5,
                    }
                }}
                name={'value'}
                value={formik.values.value}
                onChange={formik.handleChange}
                disabled={!editMode}
            />
        </>
    );
}

export default StandaloneField;