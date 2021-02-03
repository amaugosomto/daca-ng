import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Divider, Grid, Typography, TextField, Button, 
  FormControl, InputLabel, Select, MenuItem, Paper } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Swal from 'sweetalert2';
import { Check } from '@material-ui/icons';
import Skelton from 'react-loading-skeleton';

import validators from '../../middlewares/validators';
import api from '../../middlewares/axiosConfig';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(({ spacing, palette, breakpoints }) => {
  const family =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  return {
    dialogHeader: {
      background: 'whitesmoke',
      padding: '.5rem 1rem',
  
      '& > *': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
  
    },
    dialogHeaderText: {
      fontSize: '1.4rem',
      textTransform: 'uppercase',
      fontWeight: '500'
    },
    firstGrid: {
      '& > div' : {
        padding: '1rem'
      }
    }
  }
});

function addUserDialog(props) {
  const styles = useStyles();

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Add User");
  
  const [saveButtonState, setSaveButtonState] = useState(false);
  const [saveButtonText, setSaveButtonText] = useState("save user");

  const [updateButtonState, setUpdateButtonState] = useState(false);
  const [updateButtonText, setUpdateButtonText] = useState("update user");

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

  const [isActive, setisActive] = useState(true);
  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    if (props.userId > 0){
      setTitle("Update User")
      getUser();
    }
  }, [props.userId])

  const getUser = async () => {
    setLoading(true);

    let userResponse = await api.get('/adminuser/getuser/' + props.userId)
      .then(res => res)
      .catch(() => props.handleClose);

    setLoading(false);
    let user = userResponse.data.data;

    document.getElementById('firstname').value = user.firstName;
    document.getElementById('lastname').value = user.lastName;
    document.getElementById('email').value = user.email;

    setisActive(user.isActive);
    setisAdmin(user.isAdmin);
    checkFirstName();
    checkLastName();

  }

  const closeDialog = () => {
    cleanForm();
    props.handleClose();
  }
  
  const cleanForm = () => {
    document.getElementById('firstname').value = "";
    document.getElementById('lastname').value = "";
    document.getElementById('email').value = "";
    document.getElementById('password') ? document.getElementById('password').value = "" : "";
    document.getElementById('confirm_password') ? document.getElementById('confirm_password').value = "" : "";

    setTitle("Add User");
    setisAdmin(false);
    setSaveButtonText("save user");
    setSaveButtonState(false);
    setUpdateButtonText("update user");
    setUpdateButtonState(false);
  }

  const checkFirstName = (e) => {
    e ? e.preventDefault() : '';
    
    let id = 'firstname';

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
    
    let id = 'lastname';

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
      setpassowrdErrorMsg('password must have 1 lowercase, 1 uppercase, 1 special character and 8 characters long');
      return false;
    }

    setpassowrdError(false);
    setpassowrdErrorMsg('');

    return true;
  }

  const checkConfirmPassword = (e) => {
    e ? e.preventDefault() : '';
    
    let id = 'confirm_password';

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

  const checkIsActive = (e) => {
    e ? e.preventDefault() : '';

    setisActive(e.target.value);
  }

  const checkIsAdmin = (e) => {
    e ? e.preventDefault() : '';

    setisAdmin(e.target.value);
  }

  const saveUser = () => {

    if (!checkFirstName() || !checkLastName() || !checkEmail() || !checkPassword() || !checkConfirmPassword() ){
      return;
    }

    setSaveButtonState(true);
    setSaveButtonText("loading...");

    let data = {
      firstName: document.getElementById('firstname').value,
      lastName: document.getElementById('lastname').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      confirmPassword: document.getElementById('confirm_password').value,
      isActive,
      isAdmin
    }

    api.post('/adminuser/addAdmin', data)
      .then(() => {
        props.handleClose();
        props.getAdminUsers();
        setSaveButtonState(false);
        setSaveButtonText("save user");

        Swal.fire({
          title: 'success',
          text: 'Successfully registered admin user',
          icon: 'success',
          confirmButtonText: 'Ok',
          timer: 2000
        });

      })
      .catch((res) => {
        props.handleClose();

        Swal.fire({
          title: 'Error!',
          text: res.data.msg.length > 0 ? res.data.msg : 'Error registering user, please contact admin',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        
        setSaveButtonState(false);
        setSaveButtonText("save user");
      });
  }
  
  const updateUser = () => {
    
    if (!checkFirstName() || !checkLastName() || !checkEmail()){
      return;
    }

    setUpdateButtonState(true);
    setUpdateButtonText("loading...");

    let data = {
      firstName: document.getElementById('firstname').value,
      lastName: document.getElementById('lastname').value,
      email: document.getElementById('email').value,
      isActive,
      isAdmin,
      userId : props.userId
    }

    api.post('/adminuser/updateAdmin', data)
      .then(() => {
        props.handleClose();
        props.getAdminUsers();

        setUpdateButtonState(false);
        setSaveButtonText("update user");

        Swal.fire({
          title: 'success',
          text: 'Successfully updated admin user',
          icon: 'success',
          confirmButtonText: 'Ok',
          timer: 3000
        })
        

      })
      .catch((res) => {
        props.handleClose();
        setUpdateButtonState(false);
        setUpdateButtonText("update user");

        Swal.fire({
          title: 'Error!',
          text: res ? res.data.msg.length > 0 ? res.data.msg : 'Error updating user, please contact admin' : "Error updating user, please contact admin",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
        
      });
  }

  return (
    <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        fullWidth={true}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >

        <DialogTitle className={styles.dialogHeader}> 
          <span className={styles.dialogHeaderText}>{title}</span>
          <IconButton aria-label="close" onClick={closeDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {loading ? 
            <Container style={{marginTop: '1rem'}} className={styles.modalContainer}>
              <Skelton count={6} height='2rem'/>
            </Container>
            :
            <Container style={{marginTop: '1rem'}} className={styles.modalContainer}>
              <Grid container className={styles.firstGrid}>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    id="firstname"
                    label="first name" 
                    variant="outlined" 
                    required 
                    autoFocus
                    size="small"
                    error={firstNameError}
                    helperText={firstNameErrorMsg}
                    onBlur={checkFirstName}
                    onKeyUp={checkFirstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    id="lastname"
                    label="last name" 
                    variant="outlined" 
                    required 
                    autoFocus
                    size="small"
                    error={lastNameError}
                    helperText={lastNameErrorMsg}
                    onBlur={checkLastName}
                    onKeyUp={checkLastName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    fullWidth 
                    id="email"
                    label="email" 
                    variant="outlined" 
                    required 
                    autoFocus
                    size="small"
                    error={emailError}
                    helperText={emailErrorMsg}
                    onBlur={checkEmail}
                    onKeyUp={checkEmail}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="isActive"
                    select
                    label="isActive"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={isActive}
                    onChange={checkIsActive}
                  >
                    <MenuItem value={true}>True</MenuItem>
                    <MenuItem value={false}>False</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    id="isAdmin"
                    select
                    label="isAdmin"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={isAdmin}
                    onChange={checkIsAdmin}
                  >
                    <MenuItem value={true}>True</MenuItem>
                    <MenuItem value={false}>False</MenuItem>
                  </TextField>
                </Grid>

                {props.userId < 1 ? 
                  <>
                    <Grid item xs={12} sm={6}>
                      <TextField 
                        fullWidth 
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        variant="outlined" 
                        required 
                        size="small"
                        error={passowrdError}
                        helperText={passowrdErrorMsg}
                        onBlur={checkPassword}
                        onKeyUp={checkPassword}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField 
                        fullWidth 
                        name="password"
                        label="confirm password"
                        type="password"
                        id="confirm_password"
                        variant="outlined" 
                        required 
                        size="small"
                        error={confirmPasswordError}
                        helperText={confirmPasswordErrorMsg}
                        onBlur={checkConfirmPassword}
                        onKeyUp={checkConfirmPassword}
                      /> 
                    </Grid>
                  </>: ""
                }
                
              </Grid>
            </Container>
          }
          
        </DialogContent>
        <DialogActions style={{padding: '1rem 2rem'}}>
          {props.isAdmin == true ? 
            props.userId < 1 ? 
              <Button onClick={saveUser} variant="contained" size="small" color="secondary" disabled={saveButtonState}>
                {saveButtonText}
              </Button>
              :
              <Button onClick={updateUser} variant="contained" size="small" color="secondary" disabled={updateButtonState || loading}>
                {updateButtonText}
             </Button>
            : ""
          }
          
        </DialogActions>
      </Dialog>
  )
}

export default addUserDialog
