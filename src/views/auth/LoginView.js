import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import Link from '@material-ui/core/Link';
// import * as Yup from 'yup';
import { Formik } from 'formik';
// import axios from 'axios';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  Avatar
} from '@material-ui/core';

import Page from 'src/components/Page';

function Copyright() {
  return (
    <Box mt={8}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        By Blessie, Charles and Mathias.
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>

  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  // const url1 = 'http://127.0.0.1:2345';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailOnChange = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };

  const passwordOnChange = (e) => {
    setPassword(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      // const result = await axios(url1);
      /* const chatData = result.data;
      const values = [];
      for (let ln = 0; ln < chatData.length; ln++) {
        const item1 = {
          id: ln, server: url1
        };
        values.push(item1);
      } */
      // setChats(values);
      console.log(email);
      console.log(password);
    };
    fetchData();
  }, []);

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            onSubmit={() => {
              navigate('/products', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleSubmit,
              isSubmitting,
              touched
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3} align="center">
                  <Avatar
                    variant="round"
                  />
                  <Typography
                    color="textPrimary"
                    variant="h2"
                    align="center"
                  >
                    Sign in
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={emailOnChange}
                  type="email"
                  value={email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={passwordOnChange}
                  type="password"
                  value={password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    SIGN IN
                  </Button>
                  <Copyright />
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
