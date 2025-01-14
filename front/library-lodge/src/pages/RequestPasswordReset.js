import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {requestPasswordReset} from "../redux/profileSlice";
import {Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Link as RouterLink} from "react-router-dom";
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

const RequestPasswordReset = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const formik = useFormik({
        validateOnMount: true,
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
        }),
        onSubmit: values => {
            dispatch(requestPasswordReset(values)).unwrap()
                .then((res) => {
                    dispatch(setAlert({"severity": "success",
                        "message": "Password reset email sent"}));
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
                    Reset Password
                </Typography>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Send Email
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
    );
}

export default RequestPasswordReset;