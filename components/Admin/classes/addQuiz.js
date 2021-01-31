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

import validators from '../../../middlewares/validators';

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
    modalContainer: {
      [breakpoints.down('sm')]: {
        paddingLeft: 0,
        paddingRight: 0
      }
    },
    firstGrid : {
      '& > div:first-of-type' : {
        marginBottom: '1rem'
      },
      '& > div:last-of-type' : {
        marginTop: '1rem'
      }
    },
    buttonDiv: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    formControl: {
      minWidth: '50%',
    },
    secondGrid: {
      margin: '2rem 0',
    },
    paper: {
      padding: '.1rem 1rem',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    quizText: {
      fontSize: '1.2rem',
      display: 'flex',
      alignItems: 'center'
    },
    icon: {
      color : 'red'
    }
  }
});

function addQuiz(props) {
  const styles = useStyles();
  const alphabets = ['a', 'b', 'c', 'd', 'e'];

  const [quizOptions, setQuizOptions] = useState([]);

  const [loading, setLoading] = useState(false);

  const [correctAnswer, setCorrectAnswer] = useState(0);

  const [optionError, setOptionError] = useState(false);
  const [optionErrorMsg, setOptionErrorMsg] = useState("");

  const [quizQuestionError, setQuizQuestionError] = useState(false);
  const [quizQuestionMsg, setQuizQuestionMsg] = useState("");

  const [correctAnsError, setCorrectAnsError] = useState(false);
  const [correctAnsErrornMsg, setCorrectAnsErrornMsg] = useState("");

  const [saveButtonState, setSaveButtonState] = useState(false);
  const [saveButtonText, setSaveButtonText] = useState("save quiz");

  const [updateButtonState, setUpdateButtonState] = useState(false);
  const [updateButtonText, setUpdateButtonText] = useState("update quiz");

  useEffect(() => {
    if (props.quizId > 0) {
      getQuiz();
    }
  }, [props.quizId])

  const getQuiz = async () => {
    setLoading(true);

    let quizResponse = await props.api.get('/classes/getQuiz/' + props.quizId)
      .then(res => res)
      .catch(err => closeDialog);

    let quiz = quizResponse.data.data;
    
    setLoading(false);

    document.getElementById('quiz_question').value = quiz.quizBody;
    let quizzes = quiz.QuizAnswers.map(quiz => { 
      return { value: quiz.answerValue, body: quiz.answerBody }
    });
    
    setQuizOptions(quizzes);
    setCorrectAnswer(quiz.quizCorrectAns);
    document.getElementById('quiz_question').focus();
  }

  const correctAnsChangeHandler = (e) => {
    e ? e.preventDefault() : '';

    setCorrectAnswer(e.target.value);
    setCorrectAnsError(false);
    setCorrectAnsErrornMsg('');
  }

  const checkOption = (e) => {
    e ? e.preventDefault() : '';
    
    let id = 'quiz_option';

    let hasContent = validators.isRequired(id);
    if (hasContent) {
      setOptionError(true);
      setOptionErrorMsg("field is required");

      return false;
    }

    setOptionError(false);
    setOptionErrorMsg("");

    return true;
  }

  const checkQuizQuestion = (e) => {
    e ? e.preventDefault() : '';
    
    let id = 'quiz_question';

    let hasContent = validators.isRequired(id);
    if (hasContent) {
      setQuizQuestionError(true);
      setQuizQuestionMsg("field is required");

      return false;
    }

    setQuizQuestionError(false);
    setQuizQuestionMsg("");

    return true;
  }

  const addQuizOption = () => {
    if (!checkOption())
      return;

    let quizOptionValue = document.getElementById('quiz_option').value;
    let quizLength = quizOptions.length;
    
    if (quizLength < 5) {
      setQuizOptions([...quizOptions, {value: alphabets[quizLength], body: quizOptionValue}]);
      document.getElementById('quiz_option').value = "";
    }
  }

  const removeQuiz = (value) => {
    let quizzes = [...quizOptions];
    let newQuizzes = quizzes.filter(i => i.value != value);

    setQuizOptions(newQuizzes);
    setCorrectAnswer(0);
  }

  const saveQuiz = () => {
    if (!checkQuizQuestion())
      return;

    if (correctAnswer == 0 || quizOptions.length < 1){
      setCorrectAnsError(true);
      setCorrectAnsErrornMsg('Please make sure a correct answer is selected and you have created some quiz options');

      return;
    }

    setSaveButtonState(true);
    setSaveButtonText("loading...");

    let data = {
      quizQuestion: document.getElementById('quiz_question').value,
      quizOptions,
      correctAnswer,
      ClassId: props.classId
    }

    props.api.post('/classes/addQuiz', data)
      .then(res => {
        props.handleClose();

        Swal.fire({
          title: 'success',
          text: res ? res.data.msg : 'Successfully saved quiz',
          icon: 'success',
          timer: 1500
        });

        cleanForm();
      }).catch(err => {
        Swal.fire({
          title: 'error',
          text: err ? err.data.msg : 'unable to save quiz',
          icon: 'error',
          timer: 1500
        });

        setSaveButtonState(false);
        setSaveButtonText("save quiz");
      })
  }

  const updateQuiz = () => {
    if (!checkQuizQuestion())
      return;

    if (correctAnswer == 0 || quizOptions.length < 1){
      setCorrectAnsError(true);
      setCorrectAnsErrornMsg('Please make sure a correct answer is selected and you have created some quiz options');

      return;
    }

    setUpdateButtonState(true);
    setUpdateButtonText("loading...");

    let data = {
      quizQuestion: document.getElementById('quiz_question').value,
      quizOptions,
      correctAnswer,
      QuizId: props.quizId
    }

    props.api.post('/classes/editQuiz', data)
      .then(res => {
        props.handleClose();

        Swal.fire({
          title: 'success',
          text: res ? res.data.msg : 'Successfully updated quiz',
          icon: 'success',
          timer: 2000
        });

        cleanForm();
      }).catch(err => {
        Swal.fire({
          title: 'error',
          text: err ? err.data.msg : 'unable to update quiz',
          icon: 'error',
          timer: 1500
        });

        setUpdateButtonState(false);
        setUpdateButtonText("update quiz");
      })
  }

  const closeDialog = () => {
    cleanForm();
    props.handleClose();
  }

  const cleanForm = () => {
    setQuizOptions([]);
    setCorrectAnswer(0);
    setSaveButtonText("save quiz");
    setUpdateButtonText("update quiz");
    setSaveButtonState(false);
    setUpdateButtonState(false);
    setLoading(false);
    document.getElementById('quiz_question').value = "";
  }


  return (
    <>
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
          <span className={styles.dialogHeaderText}>{props.title}</span>
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
                <Grid item xs={12}>
                  <TextField 
                    fullWidth 
                    id="quiz_question"
                    label="Question" 
                    variant="outlined" 
                    required 
                    autoFocus
                    size="small"
                    error={quizQuestionError}
                    helperText={quizQuestionMsg}
                    onKeyUp={checkQuizQuestion}
                  />
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField 
                    fullWidth 
                    id="quiz_option"
                    label="Quiz Option" 
                    variant="outlined" 
                    required 
                    autoFocus
                    size="small"
                    error={optionError}
                    helperText={optionErrorMsg}
                    onKeyUp={checkOption}
                  />
                </Grid>
                <Grid item xs={12} sm={2} className={styles.buttonDiv}>
                    <Button variant="contained" 
                      size="small" color="primary" onClick={addQuizOption}
                      disabled={quizOptions.length < 5 ? false : true}
                    >
                      Add Option
                    </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="correct_answer"
                    select
                    label="Select correct answer"
                    value={correctAnswer}
                    onChange={correctAnsChangeHandler}
                    variant="outlined"
                    className={styles.formControl}
                    size="small"
                    error={correctAnsError}
                    helperText={correctAnsErrornMsg}
                  >
                    <MenuItem value={0}>Select</MenuItem>
                    { quizOptions.map(quiz => <MenuItem value={quiz.value} style={{textTransform: 'uppercase'}} key={quiz.value}>{quiz.value}</MenuItem>)}
                  </TextField>
                </Grid>
              </Grid>

              <Grid container className={styles.secondGrid}>
                {quizOptions.map(quiz => {
                  return(
                    <Paper className={styles.paper} key={quiz.value} style={{marginBottom: '1rem'}}>
                      <Typography variant="caption" className={styles.quizText}>
                        {correctAnswer == quiz.value ? <Check style={{marginRight: '1rem', color: 'green'}}/> : ''}
                        <span style={{fontWeight: '500',textTransform: 'uppercase'}}>{quiz.value}</span>: {quiz.body}
                      </Typography>
                      <IconButton aria-label="close" className={styles.icon} onClick={() => removeQuiz(quiz.value)}>
                        <CloseIcon />
                      </IconButton>
                    </Paper>
                  );
                })}
                
              </Grid>

            </Container>
          }
          
        </DialogContent>
        <DialogActions style={{padding: '1rem 2rem'}}>
          {props.quizId < 1 ? 
            <Button onClick={saveQuiz} variant="contained" size="small" color="secondary" disabled={saveButtonState}>
              {saveButtonText}
            </Button>
            :
            <Button onClick={updateQuiz} variant="contained" size="small" color="secondary" disabled={updateButtonState || loading}>
              {updateButtonText}
            </Button>
          }
          
        </DialogActions>
      </Dialog>
    </>
  )
}

export default addQuiz
