import {useDispatch, useSelector} from "react-redux";
import {signUp, fetchProfileData, login, resetProfile} from "../redux/profileSlice";
import {useNavigate, Link as RouterLink} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {setAlert} from "../redux/envSlice";
import {useEffectOnce} from "react-use";


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

const SignUp = () => {
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
            email: '',
            password: '',
            password_confirmation: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .required('Required'),
            password_confirmation: Yup.string()
                .required('Required')
                .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        }),
        onSubmit: values => {
            const result = { ...values }
            delete result.password_confirmation
            dispatch(signUp(result)).unwrap()
                .then((res) => {
                    const account = { username: values.username, password: values.password }
                    dispatch(login(account)).unwrap()
                        .then((res) => {
                            dispatch(fetchProfileData()).unwrap()
                                .then((res) => navigate('/'))
                                .catch((message) => {
                                    dispatch(resetProfile())
                                    navigate('/login')
                                })
                        })
                        .catch((message) => {
                            navigate('/login')
                        })
                })
                .catch((message) => {
                    dispatch(setAlert({severity: 'error', message: message}));
                })

        },
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign Up
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
                        Sign Up
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link component={RouterLink} to="/login" variant="body2">
                                Already have an account? Sign In
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

export default SignUp;