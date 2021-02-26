import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
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
import Skeleton from 'react-loading-skeleton';

import api from '../../middlewares/axiosConfig';
import CustomHead from '../../components/HEAD/head';

export const exam = (props) => {
  const styles = componentStyles();
  const router = useRouter();

  const [quiz, setQuiz] = useState({Quizzes: []});
  const [quizIds, setQuizIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, [props.user]);

  const checkUser = async () => {
    await props.reintialiseState();
    let isUserLoggedIn = await props.isUserLoggedIn();
    let classId = getClassIdFromRoute();
    
    if (classId == false || !isUserLoggedIn)
      return router.push('/Courses');

    getQuiz(classId);
    window.scrollTo(0, 0);
  }

  const getQuiz = async (classId) => {
    await api.get('/classes/getAllQuizByClassId/' + classId)
      .then(res => {
        let quizData = res.data.data;
        let quizIds = quizData.Quizzes.map(quiz => `quiz${quiz.id}`);

        setQuiz(quizData);
        setQuizIds(quizIds);
        setLoading(false);  
      })
      .catch(err => {
        Swal.fire({
          title: 'Error!',
          text: err ? err.data.msg : 'An error occured',
          icon: 'error',
          timer: 1500
        });

        return router.push('/Courses');
      });
  }

  const getClassIdFromRoute = () => {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("classId")) {
      let search = location.search;
      let classId = search.replace("?classId=", '');
      
      return classId;
    }
    return false;
  }

  //const quizIds = props.quizzes.map(quiz => `quiz${quiz.quizId}`);

  const checkQuiz = () => {
    
    let allFieldsFilled = validateAllFields();

    if (!allFieldsFilled)
      return;

    document.querySelectorAll("input[type=radio]").forEach(input => 
        input.parentNode.parentElement.parentElement.children[1].style = "");
    
    Swal.fire({
      title: 'info',
      text: 'Are you sure you want to submit?',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'yes, submit'
    }).then(res => {
      if (res.isConfirmed) {
        Swal.fire({
          title: 'info',
          text: 'Submitting and marking quiz',
          icon: 'info',
          timer: 1500,
          allowOutsideClick: false,
          showConfirmButton: false
        }).then(async () => {
          await api.get('/classes/setStudentClass/' + getClassIdFromRoute());
          let quizResponse = await markQuiz();
    
          if (quizResponse.status == 500) {
            Swal.fire({
              title: 'error',
              text: 'Could not submit quiz, please refresh page, if error persits, contact admin',
              icon: 'error',
              timer: 2500,
              confirmButtonText: 'Ok'
            });
    
            return
          }
    
          if (quizResponse.status == 204) {
            Swal.fire({
              title: 'success',
              text: 'You have successfully reached the end of the courses, Congratulations',
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then(() => {
              router.push('/');
            });
    
            return;
          }
    
          let classId = quizResponse.data.data.ClassId;
    
          Swal.fire({
            title: 'success',
            text: 'Finished marking quiz',
            icon: 'success',
            timer: 2500,
            confirmButtonText: 'Ok'
          }).then(() => {
            router.push(`/courses/classroom?classId=${classId}`)
          });
    
        });
      }
    })

  }

  const changed = (event, id) => {
    validateField(id);
  };

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

  const markQuiz = async () => {
    let studentResponses = [];
    let numberCorrectAnswers = 0;

    for (let i = 0; i < quizIds.length; i++) {
      const quizId = quizIds[i];
      
      let quizCorrectAnswer = quiz.Quizzes.find(quiz => {
                                let realQuizId = quizId.replace("quiz", '');

                                return quiz.id == realQuizId;
                              }).quizCorrectAns;
      
      let studentData = {
        quizCorrectAnswer,
        quizId : quizId.replace("quiz", ''),
        classId: getClassIdFromRoute(),
      }

      let quizInputElements = document.querySelectorAll(`#${quizId} input`);
      let userPickedInputLabelElement = '';
      let correctAnswerLabelElement = '';

      quizInputElements.forEach(input => {
        if (input.checked) {
          studentData.userAnswer = input.value;
          userPickedInputLabelElement = input.parentNode.parentElement.parentElement.children[1];
        }
        if (input.value == quizCorrectAnswer) {
          correctAnswerLabelElement = input.parentNode.parentElement.parentElement.children[1];
          ++numberCorrectAnswers;
        }
      });
      
      userPickedInputLabelElement.style = "color:red;font-weight:600";
      correctAnswerLabelElement.style = "color:green;font-weight:600";

      studentResponses.push(studentData);
    }

    let data = {
      classId: getClassIdFromRoute(),
      numberCorrectAnswers
    }

    api.post('/classes/setStudentResponses', studentResponses)
      .then()
      .catch(err => err);

    let savedUserAnswer = await api.post('/classes/setAnsweredQuiz', data)
      .then()
      .catch(err => err);

    return savedUserAnswer;
  }

  return (
    <HomeLayout>
      <>
      
        <CustomHead 
          iosApplicationTitle="Daca-ng Class Quiz"
          title="Daca-ng - Class Quiz"
          robots="Quizzes"
        />

        <main className={styles.main}>
          <Container className={styles.headerContainer}>
            <Typography variant="h5">
              {loading ? <Skeleton /> : `${quiz.classTitle} Quiz`}
            </Typography>
          </Container>

          <Container maxWidth="md" className={styles.quizBody}>
            <Card raised={true} className={styles.card} elevation={3}>
              <CardContent className={styles.cardContent}>

                {loading ? <Skeleton count={5} height={70} /> :
                  quiz.Quizzes.length > 0 ?
                    quiz.Quizzes.map((value, index) => {
                      let count = index + 1;
                      return <div className={styles.quiz} id={`quiz${value.id}`} key={index}>
                              <FormControl component="fieldset">
                                <FormLabel component="legend" className={styles.legend}>
                                  {`${count}. ${value.quizBody}`}
                                </FormLabel>
                                <RadioGroup aria-label="answers" onChange={() => changed(event, `quiz${value.id}`)} name={`answers${count}`} className={styles.radioGroup}>
                                  {value.QuizAnswers.map((answer, i) => {
                                    return <FormControlLabel value={answer.answerValue} key={i} control={<Radio />} label={answer.answerBody} />
                                  })}
                                </RadioGroup>
                              <FormHelperText className={styles.helperText}></FormHelperText>
                            </FormControl>
                          </div>
                      })
                  :
                  <Typography component="h5" variant="h5">
                    No quizzes yet
                  </Typography>
                }
              </CardContent>

              {loading ? '' 
              :
                <CardActions className={styles.cardActions}>
                  <Button variant="contained" 
                    onClick={() => router.push(`/courses/classroom?classId=${getClassIdFromRoute()}`)}>
                      Back to class
                  </Button>
                  <Button variant="contained" onClick={() => checkQuiz()} >Submit</Button>
                </CardActions>
              }
              
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

