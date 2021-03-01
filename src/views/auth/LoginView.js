import React, { useState } from 'react';
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

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status !== 200) {
        // logout();
        // location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
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
  const backendurl = 'http://127.0.0.1:8081/api/login/authenticate';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailOnChange = (e) => {
    setEmail(e.target.value);
  };

  const passwordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };

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
            onSubmit={async () => {
              fetch(backendurl, requestOptions)
                .then(handleResponse)
                .then((user) => {
                  // login successful if there's a user in the response
                  if (user) {
                    // store user details and basic auth credentials in local storage
                    // to keep user logged in between page refreshes
                    user.authdata = window.btoa(`${email}:${password}`);
                    localStorage.setItem('user', JSON.stringify(user));
                    navigate('/products', { replace: true });
                  } else {
                    navigate('/login', { replace: true });
                  }
                });
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
