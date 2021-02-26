import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import HomeLayout from '../../components/home/HomeLayout';
import Skeleton from 'react-loading-skeleton';
import Swal from 'sweetalert2';

import componentStyles from '../../styles/classroomStyles';
import { reintialiseState, isUserLoggedIn } from '../../redux/actions/authActions';
import { getUserCurrentClass, resetisWrongClass, setPreviousClass } from '../../redux/actions/classActions';
import { Avatar, Button, Container, Typography } from '@material-ui/core';
import api from '../../middlewares/axiosConfig';
import CustomHead from '../../components/HEAD/head';

export const classroom = (props) => {
  const styles = componentStyles();
  const router = useRouter();

  const [Class, setClass] = useState({});
  const [ClassId, setClassId] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (props.resumeClassId > 0) {
      getClassByClassId(props.resumeClassId);
    }
    
  }, [props.resumeClassId]);

  const checkUser = async () => {
    await props.reintialiseState();
    let isUserLoggedIn = await props.isUserLoggedIn();
    let classId = getClassIdFromRoute();

    if (classId == false)
      return router.push('/Courses');

    if (!isUserLoggedIn) 
      return router.push(`/auth?redirect=courses/classroom?classId=${classId}`);

    await setClassId(classId);
    console.log(classId)
    await props.getUserCurrentClass(classId);
    //getClassByClassId(classId);
  }

  const getClassIdFromRoute = () => {
    let searchParams = window.location.search
    if (searchParams.includes("classId")) {
      let search = location.search;
      let classId = search.replace("?classId=", '');
      return classId
    }
    return false;
  }

  const getClassByClassId = async (classId) => {
    await api.get('/classes/getclass/' + classId)
      .then(res => {
        let Class = res.data.data;
        setClass(Class);
        setLoading(false);
        window.scrollTo(0, 0);
        props.setPreviousClass(Class.previousClassId);

        if (props.isWrongClass) {
          Swal.fire({
            title: 'info',
            text: 'You are not qualified to take the class you selected, you are required to start from here',
            icon: 'info',
            showConfirmButton: true
          }).then(() => {
            props.resetisWrongClass();
          });
        }
      })
      .catch(err => {
        Swal.fire({
          title: 'error',
          text: err ? err.data.msg : 'An error occured',
          icon: 'error',
          timer: 2000
        });

        return router.push('/courses');
      });

  }

  const openQuizArea = (classId) => {
    router.push({
      pathname: '/courses/quiz',
      query: { classId }
    });
  }

  function createMarkup(html) {
    return {__html: html};
  }

  async function changeRoute(classId) {
    await router.push(`/courses/classroom?classId=${classId}`);
    checkUser();
  }

  return (
    <HomeLayout>
      <>
        <CustomHead 
          iosApplicationTitle="Daca-ng Classroom"
          title="Daca-ng - Classroom"
          robots="Classroom"
        />  

        <main className={styles.main}>
          {/* <Skeleton height={100} count={3} /> */}
          <div>
            <Container className={styles.headerContainer}>
              <Typography variant="h5">
                { loading ? <Skeleton /> : Class.classTitle}
              </Typography>
              <div>
                <div className={styles.headerBody}>
                  <Avatar alt="pastors image" src={loading ? "/images/loading.jpg" : "https://i.pravatar.cc/300?img=14"} className={styles.large} />
                  <div>
                    <div>
                      <span>
                        { loading ? <Skeleton /> : Class.tutor}
                      </span>
                    </div>
                    <span>
                      { loading ? <Skeleton /> : 'Jan 30, 2020 · 11 min read'}
                    </span>
                  </div>
                </div>
              </div>
              
            </Container>
          </div>

          <Container maxWidth="md" className={styles.classBody}>
            { loading ? <Skeleton height={80} count={3} /> : <div dangerouslySetInnerHTML={createMarkup(Class.classBody)} />}
            
            {loading ? '' : 
              <div>
                {props.userFirstCLass ? ''
                  : props.previousClassId < 1 ? '' :
                    <Button variant="contained" 
                      onClick={() => changeRoute(props.previousClassId)}>
                        Previous class</Button>
                }
                <Button variant="contained" onClick={() => openQuizArea(Class.id)} >Take Quiz</Button>
              </div>
            }
            
          </Container>


        </main>
      </>
    </HomeLayout>
    
  )
}

const mapStateToProps = (state) => ({
  user: state.authPage.user,
  resumeClassId: state.classReducer.userCurrentClassId,
  userFirstClass: state.classReducer.userFirstCLass,
  isWrongClass: state.classReducer.isWrongClass,
  previousClassId: state.classReducer.previousClass,
});

const mapDispatchToProps = {
  reintialiseState,
  isUserLoggedIn,
  getUserCurrentClass,
  resetisWrongClass,
  setPreviousClass
}

export default connect(mapStateToProps, mapDispatchToProps)(classroom)
