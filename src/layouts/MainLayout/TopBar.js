import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import { useRoutes, useRedirect } from 'hookrouter';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  makeStyles,
  Button
} from '@material-ui/core';

// import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';

const useStyles = makeStyles(({
  root: {},
  toolbar: {
    height: 64
  }
}));

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('user');
  if (currentUser === null) {
    return (
      <AppBar
        className={clsx(classes.root, className)}
        elevation={0}
        {...rest}
      >
        <Toolbar>
          <Logo />
          <Box flexGrow={1} />
        </Toolbar>
      </AppBar>
    );
  }

  const jsonCurrentUser = JSON.parse(currentUser);

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <Logo />
        <Box flexGrow={1} />
        <Typography
          color="textPrimary"
          variant="h4"
          align="center"
        >
          Hello
          {' '}

          {jsonCurrentUser.email}
        </Typography>

        <IconButton color="inherit">

          <Button
            onClick={() => {
              localStorage.clear();
              navigate('/login', { replace: true });
            }}
          >
            LogOut

          </Button>
        </IconButton>

      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};

export default TopBar;
