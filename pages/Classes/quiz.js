import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import HomeLayout from '../../components/home/HomeLayout';

import componentStyles from '../../styles/quizStyles';
import { reintialiseState, isUserLoggedIn } from '../../redux/actions/authActions';
import { getQuizzes } from '../../redux/actions/classActions';
import { Button, Card, CardActions, CardContent, Container, FormGroup, FormHelperText, Typography } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Swal from 'sweetalert2';
import Checkbox from '@material-ui/core/Checkbox';

export const exam = (props) => {
  const styles = componentStyles();
  const router = useRouter();

  const checkUser = async () => {
    await props.reintialiseState();
    let isUserLoggedIn = await props.isUserLoggedIn();
    let quizId = getExamIdFromRoute();

    if (quizId == false || !isUserLoggedIn)
      router.push('/Classes');

  }

  useEffect(() => {
    checkUser();
  }, [checkUser, props.user]);

  const getExamIdFromRoute = () => {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("quizId")) {
      let search = location.search;
      let quizId = search.replace("?quizId=", '');
      
      return quizId;
    }
    return false;
  }

  const quizIds = props.quizzes.map(quiz => `quiz${quiz.quizId}`);

  const checkQuiz = () => {
    let allFieldsFilled = validateAllFields();

    if (!allFieldsFilled)
      return;

    document.querySelectorAll("input[type=radio]").forEach(input => 
        input.parentNode.parentElement.parentElement.children[1].style = "");

    Swal.fire({
      title: 'info',
      text: 'Submitting and marking quiz',
      icon: 'info',
      timer: 1500,
      allowOutsideClick: false,
      showConfirmButton: false
    }).then(() => {

      Swal.fire({
        title: 'success',
        text: 'Finished marking quiz',
        icon: 'success',
        timer: 1000,
        confirmButtonText: 'Ok'
      });

      markQuiz();
    });
  }

  const changed = (event, id) => {
    validateField(id);
  };

  const validateAllFields = () => {
    let state = false; 

    for (let i = 0; i < quizIds.length; i++) {
      let quizId = quizIds[i];
      let isAnyFieldFalse = false;

      let fieldToValidate = validateField(quizId);
      if (fieldToValidate == false){
        isAnyFieldFalse = true;
      }
        
      isAnyFieldFalse ? state = false : state = true;
    }

    return state;
  }

  const validateField = (id) => {
    let elementInputs = document.querySelectorAll(`#${id} input`);
    let elementsToColor = document.querySelectorAll(`#${id} .MuiFormLabel-root, #${id} .MuiFormHelperText-root`);
    let anyFieldChecked = false;
    elementInputs.forEach(node => node.checked == true ? anyFieldChecked = true : '');

    if (!anyFieldChecked){
      elementsToColor.forEach(node => node.classList.add("Mui-error"));
      document.querySelector(`#${id} .MuiFormHelperText-root`).textContent = "field is required";

      return false;
    } else {
      elementsToColor.forEach(node => node.classList.remove("Mui-error"));
      document.querySelector(`#${id} .MuiFormHelperText-root`).textContent = "";
      
      return true;
    }
  }

  const markQuiz = () => {
    for (let i = 0; i < quizIds.length; i++) {
      const quizId = quizIds[i];
      
      let quizCorrectAnswer = props.quizzes.find(quiz => {
                                let realQuizId = quizId.replace("quiz", '');

                                return quiz.quizId == realQuizId;
                              }).correctAnswer;
      
      let quizInputElements = document.querySelectorAll(`#${quizId} input`);
      let userPickedInputLabelElement = '';
      let correctAnswerLabelElement = '';

      quizInputElements.forEach(input => {
        if (input.checked) {
          userPickedInputLabelElement = input.parentNode.parentElement.parentElement.children[1];
        }
        if (input.value == quizCorrectAnswer) {
          correctAnswerLabelElement = input.parentNode.parentElement.parentElement.children[1];
        }
      });
      
      userPickedInputLabelElement.style = "color:red;font-weight:600";
      correctAnswerLabelElement.style = "color:green;font-weight:600";
      
    }
  }

  return (
    <HomeLayout>
      <>
        <Head>
          <title>Daca-ng - Classes</title>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="copyright" content={`Copyright © Daca-ng ${new Date().getFullYear()}`} />
          <meta name="description" content="Online exam for preparatory classes" />
          <meta name="robots" content="Classes"></meta>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&family=Yusei+Magic&display=swap" rel="stylesheet" />
        </Head>

        <main className={styles.main}>
          <Container className={styles.headerContainer}>
            <Typography variant="h5">
              Introduction to Christianity Part 1 Quiz
            </Typography>
          </Container>

          <Container maxWidth="md" className={styles.quizBody}>
            <Card raised={true} className={styles.card} elevation={3}>
              <CardContent className={styles.cardContent}>

                {props.quizzes.map((value, index) => {
                  let count = index + 1;
                  return <div className={styles.quiz} id={`quiz${value.quizId}`} key={index}>
                          <FormControl component="fieldset">
                            <FormLabel component="legend" className={styles.legend}>
                              {`${count}. ${value.question}`}
                            </FormLabel>
                            <RadioGroup aria-label="answers" onChange={() => changed(event, `quiz${value.quizId}`)} name={`answers${count}`} className={styles.radioGroup}>
                              {Object.keys(value.answers).map((key, i) => {
                                return <FormControlLabel value={key} key={i} control={<Radio />} label={value.answers[key]} />
                              })}
                            </RadioGroup>
                            <FormHelperText className={styles.helperText}></FormHelperText>
                          </FormControl>
                        </div>
                })}

              </CardContent>

              <CardActions className={styles.cardActions}>
                <Button variant="contained">Back to class</Button>
                <Button variant="contained" onClick={() => checkQuiz()} >Submit</Button>
              </CardActions>
            </Card>
          </Container>
        </main>
      </>
    </HomeLayout>
  )
}

const mapStateToProps = (state) => ({
  user: state.authPage.user,
  quizzes: state.classReducer
});

const mapDispatchToProps = {
  reintialiseState,
  isUserLoggedIn,
  getQuizzes
}

export default connect(mapStateToProps, mapDispatchToProps)(exam)

