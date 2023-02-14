import { React, useState } from 'react'
import { Grid, Paper, Typography, Checkbox, Box, FormControlLabel, Button, TextField } from '@material-ui/core'
import { Field, Formik, Form } from 'formik'
import { Link, useHistory } from 'react-router-dom'
import './login.css'
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import { Alert } from '@material-ui/lab';

const Login = () => {
    const [message, setMessage] = useState("")
    const [testMessage, setTestMessage] = useState(false)
    const formTitle = { color: '#1c78fa' }
    const paperStyle = { padding: '30px 20px', margin: "auto" }
    let history = useHistory();

    function validateEmail(value) {
        let error;
        if (!value) {
            error = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = 'Invalid email address';
        }
        return error;
    }

    const [userLogin, setUerLogin] = useState(
        {
            id: uuidv4(),
            email: '',
            password: '',
        }
    );

    //handle inputs
    let handleOnChange = (e) => {
        setUerLogin((prevProps) => ({
            ...prevProps,
            [e.target.name]: e.target.value
        }));
    };

    //login
    let handleOnSubmit = (e) => {
        e.preventDefault();
        let userData = {
            email: userLogin.email,
            password: userLogin.password
        }
        axios.post('</login', userData,
            {
                headers: { "Access-Control-Allow-Origin": "*" }
            }
        )
            .then((res) => {
                if (res.data.auth === true) {
                    localStorage.setItem('token', res.data.accessToken)
                } else if (!res.data.auth) {
                    setTestMessage(true)
                    setMessage(res.data.message)
                }
                history.push('/survey')
            });

    }

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align="center">
                    <h1 style={formTitle}>Sign in</h1>
                    <Box mt={3} />
                    <Formik
                        initialValues={userLogin}
                        onSubmit={(data, { setSubmitting }) => {
                            setSubmitting(true);
                            console.log("submit", data);
                            setSubmitting(false);
                        }}
                    >
                        {({ errors, touched, values, isSubmitting }) => (
                            <Form >
                                <div className="alert" >
                                    {message && <Alert severity="error" >{message}</Alert>}
                                </div>
                                <Field as={TextField}
                                    label="email"
                                    name="email" placeholder="email"
                                    type="input" validate={validateEmail}
                                    fullWidth
                                    value={userLogin.email}
                                    onChange={(e) => { handleOnChange(e) }}
                                />
                                {errors.email && touched.email && <div>{errors.email}</div>}
                                <Field as={TextField}
                                    name="password" label="password" placeholder="paswword"
                                    type="password"
                                    autoComplete="off"
                                    fullWidth
                                    value={userLogin.password}
                                    onChange={(e) => { handleOnChange(e) }}
                                />
                                <Box mt={3} />
                                <FormControlLabel
                                    control={<Checkbox name="checkedB" color="secondary" />}
                                    label="Remember me"
                                />
                                <Box mt={3} />
                                <Button type="submit" disabled={isSubmitting} color="primary" variant="contained"
                                    onClick={(e) => handleOnSubmit(e)}>
                                    Sign in
                                </Button>
                                <Box mt={3} />
                                <Typography>
                                    <Link style={{ color: '#1c78fa', textDecoration: 'none' }} to="#">
                                        Forgot password ?
                                    </Link>
                                </Typography>
                                <Typography> Do you have an account ?
                                    <Link style={{ color: '#1c78fa', textDecoration: 'none' }} to='/signin'> Sign-up </Link>
                                </Typography>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Login
