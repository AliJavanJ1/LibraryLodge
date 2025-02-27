import {useDispatch, useSelector} from "react-redux";
import {useNavigate, Link as RouterLink} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography} from "@mui/material";
import {fetchProfileData, login, resetProfile} from "../redux/profileSlice";
import {makeStyles} from "@mui/styles";
import {useEffectOnce} from "react-use";
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

const Login = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = useSelector((state) => state.profile);

    useEffectOnce(() => {
        if (profile) {
            navigate('/'); // TODO: redirect to dashboard
        }
    });



    const formik = useFormik({
        validateOnMount: true,
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Required'),
            password: Yup.string()
                .required('Required'),
        }),
        onSubmit: values => {
            dispatch(login(values)).unwrap()
                .then((res) => {
                    dispatch(fetchProfileData()).unwrap()
                        .then((res) => navigate('/'))
                        .catch((message) => {
                            dispatch(resetProfile())
                            navigate('/login')
                        })
                })
                .catch((message) => {
                    dispatch(setAlert({message: message, severity: 'error'}))
                })
        },
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={!formik.isValid}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link component={RouterLink} to="/reset-password" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link component={RouterLink} to='/signup' variant="body2">
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

export default Login;