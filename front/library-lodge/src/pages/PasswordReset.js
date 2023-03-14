import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {fetchProfileData, resetPassword} from "../redux/profileSlice";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {setAlert} from "../redux/envSlice";



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(16),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function PasswordReset() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useParams().token;
    const classes = useStyles();

    const formik = useFormik({
        validateOnMount: true,
        initialValues: {
            password: '',
            password_confirmation: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required('Required'),
            password_confirmation: Yup.string()
                .required('Required')
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        }),
        onSubmit: values => {
            const result = { ...values, token: token }
            delete result.password_confirmation;
            dispatch(resetPassword(values)).unwrap()
                .then((res) => {
                    // dispatch(fetchProfileData()) // // TODO: should we fetch profile data after reset password?
                    navigate('/');
                })
                .catch((message) => {
                    dispatch(setAlert({message: message, severity: 'error'}))
                });

        },
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Change Password
                </Typography>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password_confirmation"
                        label="Password Confirmation"
                        type="password"
                        id="password_confirmation"
                        autoComplete="new-password"
                        value={formik.values.password_confirmation}
                        onChange={formik.handleChange}
                        error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                        helperText={formik.touched.password_confirmation && formik.errors.password_confirmation}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Change Password
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link component={RouterLink} to="/login" variant="body2" sx={{
                                fontSize: 13
                            }}>
                                Remember password? Sign In
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={RouterLink} to='/signup' variant="body2" sx={{
                                fontSize: 13
                            }}>
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Typography variant="body2" color="text.secondary" align="center">
                    {'Library Lodge'}
                </Typography>
            </Box>
        </Container>
    )
}

export default PasswordReset;