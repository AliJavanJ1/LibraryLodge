import {Chip, emphasize, styled} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";
import {Home} from "@mui/icons-material";
import {iconMap} from "../redux/fileTemplateSlice";
import {Breadcrumbs as MUIBreadCrumbs} from "@mui/material";


const StyledBreadcrumb = styled(Chip)(({ theme }) => {
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

export default function BreadCrumbs({data}) {

    return (
        <MUIBreadCrumbs
            sx={{
                marginBottom: 2
            }}
        >
            <StyledBreadcrumb
                component={RouterLink}
                to="/"
                label="Home"
                icon={<Home fontSize="small" />}
            />
            {data.map(({id, name ,link, type}) => (
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