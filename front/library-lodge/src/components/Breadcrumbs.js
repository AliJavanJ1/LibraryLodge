import {Chip, emphasize, styled, Breadcrumbs as MUIBreadCrumbs} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {Home} from "@mui/icons-material";
import {iconMap} from "../redux/fileTemplateSlice";
import {useSelector} from "react-redux";
import {useMemo} from "react";
import ShareIcon from "@mui/icons-material/Share";


const StyledBreadcrumb = styled(Chip)(({theme}) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
});

export default function BreadCrumbs({shared}) {
    const location = useSelector((state) => state.env.location);
    const library_details = useSelector((state) => state.library_details);
    const file_templates = useSelector((state) => state.file_templates);

    const data = useMemo(() => {
        return location.map((location_id) => {
            return {
                id: location_id,
                name: library_details[location_id].name,
                link: shared ? `/shared-with-me/${library_details[location_id].name.toLowerCase()}` :
                    `/${library_details[location_id].name.toLowerCase()}`,
                type: file_templates[library_details[location_id].file_template].libIcon
            }
        })
    }, [location, library_details, file_templates])

    // const data = [
    //     {id: 1, name: 'MusicNoteOutlinedIcon', link: '#', type: 'MusicNoteOutlinedIcon'},
    //     {id: 2, name: 'SlideshowOutlinedIcon', link: '#', type: 'SlideshowOutlinedIcon'},
    //     {id: 3, name: 'MenuBookOutlinedIcon', link: '#', type: 'MenuBookOutlinedIcon'},
    //     // {id: 4, name: 'TerminalOutlinedIcon', link: '#', type: 'TerminalOutlinedIcon'},
    //     // {id: 5, name: 'InsertPhotoOutlinedIcon', link: '#', type: 'InsertPhotoOutlinedIcon'},
    //     // {id: 6, name: 'PermMediaOutlinedIcon', link: '#', type: 'PermMediaOutlinedIcon'},
    //     // {id: 7, name: 'MovieFilterOutlinedIcon', link: '#', type: 'MovieFilterOutlinedIcon'},
    //     // {id: 8, name: 'LibraryBooksOutlinedIcon', link: '#', type: 'LibraryBooksOutlinedIcon'},
    //     // {id: 9, name: 'FilterNoneOutlinedIcon', link: '#', type: 'FilterNoneOutlinedIcon'},
    //     // {id: 10, name: 'LibraryMusicOutlinedIcon', link: '#', type: 'LibraryMusicOutlinedIcon'}
    // ]

    return (
        <MUIBreadCrumbs
            sx={{
                marginBottom: 2
            }}
        >
            {
                shared ? (
                    <StyledBreadcrumb
                        component={RouterLink}
                        to="/shared-with-me"
                        label="Shared with me"
                        icon={<ShareIcon fontSize="small"/>}
                    />
                ) : (
                    <StyledBreadcrumb
                        component={RouterLink}
                        to="/"
                        label="Home"
                        icon={<Home fontSize="small"/>}
                    />
                )
            }
            {data.map(({id, name, link, type}) => (
                <StyledBreadcrumb
                    key={id}
                    component={RouterLink}
                    to={link}
                    label={name}
                    icon={iconMap[type].type.render({fontSize: 'small'})}
                />
            ))}
        </MUIBreadCrumbs>
    )
}