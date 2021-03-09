import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';;
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { authLogin } from "../../redux/actions/authActions";
import {connect} from 'react-redux';
import { LockOpen } from '@material-ui/icons';
import validators from '../../middlewares/validators';
import Swal from 'sweetalert2';
import axiosConfig from '../../middlewares/axiosConfig';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 4rem)',
    marginTop: '4rem',
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

const Register = function({authLogin}) {
  const classes = useStyles();

  const [signUpText, setSignUpText] = useState("SIGN UP");
  const [signUpButtonState, setSignUpButtonState] = useState(false);

  const [firstNameErrorMsg, setfirstNameErrorMsg] = useState("");
  const [firstNameError, setfirstNameError] = useState(false);

  const [lastNameErrorMsg, setlastNameErrorMsg] = useState("");
  const [lastNameError, setlastNameError] = useState(false);

  const [emailErrorMsg, setemailErrorMsg] = useState("");
  const [emailError, setemailError] = useState(false);

  const [passowrdErrorMsg, setpassowrdErrorMsg] = useState("");
  const [passowrdError, setpassowrdError] = useState(false);

  const [confirmPasswordErrorMsg, setconfirmPasswordErrorMsg] = useState("");
  const [confirmPasswordError, setconfirmPasswordError] = useState(false);

  const checkFirstName = (e) => {
    e ? e.preventDefault() : '';
    
    let id = 'firstName';

    let hasContent = validators.isRequired(id);
    if (hasContent){
      setfirstNameError(hasContent);
      setfirstNameErrorMsg('field is required');

      return false;
    }

    setfirstNameError(false);
    setfirstNameErrorMsg('');
    
    return true;
  }

  const checkLastName = (e) => {
    e ? e.preventDefault() : '';
    
    let id = 'lastName';

    let hasContent = validators.isRequired(id);
    if (hasContent){
      setlastNameError(hasContent);
      setlastNameErrorMsg('field is required');

      return false;
    }

    setlastNameError(false);
    setlastNameErrorMsg('');
    
    return true;
  }

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

    let isStrongPassword = validators.isStrongPassword(id);
    if (isStrongPassword){
      setpassowrdError(isStrongPassword);
      setpassowrdErrorMsg('password must have 1 lowercase, 1 uppercase and 5 characters long');
      return false;
    }

    setpassowrdError(false);
    setpassowrdErrorMsg('');

    return true;
  }

  const checkConfirmPassword = (e) => {
    e ? e.preventDefault() : '';
    
    let id = 'confirmPassword';

    let hasContent = validators.isRequired(id);
    if (hasContent){
      setconfirmPasswordError(hasContent);
      setconfirmPasswordErrorMsg('field is required');
      return false;
    }

    let isSamePassword = validators.isSamePassword('password', id);
    if (isSamePassword){
      setconfirmPasswordError(isSamePassword);
      setconfirmPasswordErrorMsg('passwords must match');
      return false;
    }

    setconfirmPasswordError(false);
    setconfirmPasswordErrorMsg('');

    return true;
  }

  const submit = async (e) => {
    e ? e.preventDefault() : '';

    if (!checkFirstName() || !checkLastName() || !checkEmail() || !checkPassword() || !checkConfirmPassword() ){
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields',
        icon: 'error',
        confirmButtonText: 'Ok'
      });

      return;
    }

    setSignUpButtonState(true);
    setSignUpText("LOADING...");

    let data = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      confirmPassword: document.getElementById('confirmPassword').value
    }
    
    axiosConfig.post('/users/register', data)
      .then(() => {
  
        Swal.fire({
          title: 'success',
          text: 'User Successfully created, Please check your email to activate your account',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(() => {
          setSignUpButtonState(false);
          setSignUpText("SIGN UP");
          authLogin();
        });

      })
      .catch((res) => {
        Swal.fire({
          title: 'Error!',
          text: res ? res.data.msg.length > 0 ? res.data.msg 
            : 'Error registering user, please contact admin'
            : 'Error registering user, please contact admin',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        
        setSignUpButtonState(false);
        setSignUpText("SIGN UP");
      });
  }

  return (
    <Grid container component="main" className={classes.root}>
      
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOpen />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={firstNameError}
                  helperText={firstNameErrorMsg}
                  onBlur={checkFirstName}
                  onKeyUp={checkFirstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  error={lastNameError}
                  helperText={lastNameErrorMsg}
                  onBlur={checkLastName}
                  onKeyUp={checkLastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={emailError}
                  helperText={emailErrorMsg}
                  onBlur={checkEmail}
                  onKeyUp={checkEmail}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  error={passowrdError}
                  helperText={passowrdErrorMsg}
                  onBlur={checkPassword}
                  onKeyUp={checkPassword}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  error={confirmPasswordError}
                  helperText={confirmPasswordErrorMsg}
                  onBlur={checkConfirmPassword}
                  onKeyUp={checkConfirmPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={submit}
              disabled={signUpButtonState}
            >
              {signUpText}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link onClick={authLogin}  variant="body2" style={{cursor:'pointer'}}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = {
  authLogin
}

export default connect(function(){return {}}, mapDispatchToProps)(Register);