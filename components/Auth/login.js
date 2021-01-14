import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import {connect} from 'react-redux';
import { authRegister, commitToLocalStorage } from "../../redux/actions/authActions";
import { setToken } from "../../redux/actions/authActions";

import validators from '../../middlewares/validators';
import Swal from 'sweetalert2';
import axiosConfig from '../../middlewares/axiosConfig';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 4rem)',
    marginTop: '4rem'
  },
  image: {
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = function(props) {
  const classes = useStyles();

  const [signInText, setSignInText] = useState("SIGN IN");
  const [signInButtonState, setSignInButtonState] = useState(false);
  
  const [emailErrorMsg, setemailErrorMsg] = useState("");
  const [emailError, setemailError] = useState(false);

  const [passowrdErrorMsg, setpassowrdErrorMsg] = useState("");
  const [passowrdError, setpassowrdError] = useState(false);

  const checkEmail = (e) => {
    e ? e.preventDefault() : '';

    let id = 'email';

    let hasContent = validators.isRequired(id);
    if (hasContent){
      setemailError(hasContent);
      setemailErrorMsg('field is required');
      return false;
    }

    let isValidEmail = validators.isValidEmail(id);
    if (isValidEmail){
      setemailError(isValidEmail);
      setemailErrorMsg('email does not look right');
      return false;
    }

    setemailError(false);
    setemailErrorMsg('');

    return true;
  }

  const checkPassword = (e) => {
    e ? e.preventDefault() : '';
    
    let id = 'password';

    let hasContent = validators.isRequired(id);
    if (hasContent){
      setpassowrdError(hasContent);
      setpassowrdErrorMsg('field is required');
      return false;
    }

    setpassowrdError(false);
    setpassowrdErrorMsg('');

    return true;
  }

  const userSignIn = async (e) => {
    e.preventDefault();

    if (!checkEmail() || !checkPassword()) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields',
        icon: 'error',
        confirmButtonText: 'Ok'
      });

      return;
    }

    setSignInText("LOADING...");
    setSignInButtonState(true);

    let data = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    }

    axiosConfig.post("/users/login", data)
      .then(() => {
        let token = res.data.data.token;
        props.setToken(token);
        props.commitToLocalStorage();

        Swal.fire({
          title: 'success',
          text: 'User successfully logged in',
          icon: 'success',
          timer: 1500
        });

        setSignInText("SIGN IN");
        setSignInButtonState(false);

      });
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div className={classes.form} noValidate>
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
              error={emailError}
              helperText={emailErrorMsg}
              onBlur={checkEmail}
              onKeyUp={checkEmail}
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
              error={passowrdError}
              helperText={passowrdErrorMsg}
              onBlur={checkPassword}
              onKeyUp={checkPassword}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={signInButtonState}
              onClick={userSignIn}
            >
              {signInText}
            </Button>
            {props.token}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" style={{cursor:'pointer'}}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={props.authRegister} variant="body2" style={{cursor:'pointer'}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = state => ({
  token: state.authPage.token
});

const mapDispatchToProps = {
  authRegister,
  setToken,
  commitToLocalStorage
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);