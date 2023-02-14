import { React, useState } from 'react'
import { Grid, Paper, Typography, TextField, Button, Box, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Checkbox } from '@material-ui/core'
import { Field, Formik, Form } from 'formik'
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import UserService from '../../Services/UserService';


const Signup = () => {
    const paperStyle = { padding: '30px 20px', margin: "auto" }
    const formTitle = { color: '#1c78fa' }
    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(4, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .min(6, 'Too Short!')
            .required('Required'),
        confirmPassword: Yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Both password need to be the same"
            )
        })
    });

    const [userRegister, setUserRegister] = useState(
        {
            id: uuidv4(),
            name: '',
            email: '',
            gender: '',
            password: '',
            confirmPassword: ''
        }
    );

    //handle user Data
    let handleOnChange = (e) => {
        setUserRegister((prevProps) => ({
            ...prevProps,
            [e.target.name]: e.target.value
        }));
    };

    let handleOnSubmit = (e) => {
        e.preventDefault();
        UserService.Register(userRegister.name,userRegister.email,userRegister.gender,userRegister.password)  
        console.log('Register',userRegister);
    };

    return (
        <Grid>
            <Paper style={paperStyle}>
                <Grid align='center'>
                    <h1 style={formTitle} >Sign Up</h1>
                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                </Grid>
                <Box mt={3} />
                <Formik
                    initialValues={userRegister}
                    onSubmit={(data, { setSubmitting }) => {
                        setSubmitting(true);
                        console.log("submit", data);
                        setSubmitting(false);
                    }}
                    validationSchema={SignupSchema}
                >
                    {({ errors, touched, values, isSubmitting }) => (
                        <Form method="POST" onSubmit={(e) => { handleOnSubmit(e) }}>
                            <Field as={TextField}
                                label='Name'
                                name="name" placeholder="Enter your name" fullWidth
                                type="input"
                                value={userRegister.name}
                                onChange={(e) => { handleOnChange(e) }}
                            />
                            {errors.name && touched.name && <div>{errors.name}</div>}
                            <Field as={TextField}
                                label='Email'
                                name="email" placeholder="Enter your email" fullWidth
                                type="input"
                                value={userRegister.email}
                                onChange={(e) => { handleOnChange(e) }}
                            />
                            {errors.email && touched.email && <div>{errors.email}</div>}
                            <Box mt={3} />
                            <FormControl name="gender" component="fieldset">
                                <FormLabel component="legend">Gender</FormLabel>
                                <RadioGroup aria-label="gender" name="gender" style={{ display: 'initial' }}>
                                    <FormControlLabel label="Female" type="radio"
                                        control=
                                        {<Radio value="female"
                                            onChange={(e) => { handleOnChange(e) }}
                                        />}
                                    />
                                    <FormControlLabel label="Male" type="radio"
                                        control=
                                        {<Radio value="male"
                                            onChange={(e) => { handleOnChange(e) }}
                                        />} />
                                </RadioGroup>
                            </FormControl>
                            {errors.gender && touched.gender && <div>{errors.gender}</div>}
                            <Field as={TextField}
                                label='Password'
                                name="password" placeholder="Enter your password" fullWidth
                                type="password"
                                value={userRegister.password}
                                onChange={(e) => { handleOnChange(e) }}
                                autoComplete="off"
                            />
                            {errors.password && touched.password && <div>{errors.password}</div>}
                            <Field as={TextField}
                                label='Confirm Password'
                                name="confirmPassword" placeholder="Confirm your password" fullWidth
                                type="password"
                                value={userRegister.confirmPassword}
                                onChange={(e) => { handleOnChange(e) }}
                                autoComplete="off"
                            />
                            {errors.confirmPassword && touched.confirmPassword && <div>{errors.confirmPassword}</div>}
                            <Box mt={3} />
                            <FormControlLabel
                                control={<Checkbox className="MuiCheckbox-colorSecondary Mui-checked" name="checkedA" />}
                                label="I accept the terms and conditions."
                            />
                            <Box mt={2} />
                            <Button align="center" type='submit' disabled={isSubmitting}
                                variant='contained' color='primary'>
                                Sign up
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </Grid>
    )
}

export default Signup;