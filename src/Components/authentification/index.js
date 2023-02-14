import React, { useState } from 'react'
import { Paper, Box, Tabs, Tab } from '@material-ui/core'
import Signup from './sign_up.js';
import Login from './login.js';

const SignInOutContainer = () => {
    const tabTitle = { color: 'black', fontWeight: 'bold' }
    const paperStyle = { width: 380, margin: "20px auto" }
    const [value, setValue] = useState(0)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, classes, ...other } = props;

        return (
            <div 
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box>
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    return (
        <div>
            <Box mt={15}/>
            <Paper elevation={20} style={paperStyle}>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                >
                    <Tab style={tabTitle} label="Sign Up" />
                    <Tab style={tabTitle} label="Sign In" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Signup />
                </TabPanel>
                <TabPanel value={value} index={1}>
                   <Login />
                </TabPanel>
            </Paper>
        </div>
    )
}

export default SignInOutContainer
