import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import HomeLayout from '../../components/home/HomeLayout';
import Skeleton from 'react-loading-skeleton';
import Swal from 'sweetalert2';

import componentStyles from '../../styles/classroomStyles';
import { reintialiseState, isUserLoggedIn } from '../../redux/actions/authActions';
import { Avatar, Button, Container, Typography } from '@material-ui/core';
import api from '../../middlewares/axiosConfig';

export const classroom = (props) => {
  const styles = componentStyles();
  const router = useRouter();

  const [Class, setClass] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    window.scrollTo(0, 0);
  }, []);

  const checkUser = async () => {
    await props.reintialiseState();
    let isUserLoggedIn = await props.isUserLoggedIn();
    let classId = getClassIdFromRoute();

    if (classId == false)
      return router.push('/Classes');

    if (!isUserLoggedIn) 
      return router.push(`/auth?redirect=classes/classroom?classId=${classId}`);

    getClassByClassId(classId);
  }

  const getClassIdFromRoute = () => {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("classId")) {
      let search = location.search;
      let classId = search.replace("?classId=", '');
      
      return classId
    }
    return false;
  }

  const getClassByClassId = async (classId) => {
    let classResponse = await api.get('/classes/getclass/' + classId)
      .then(res => res)
      .catch(err => {
        Swal.fire({
          title: 'error',
          text: err ? err.data.msg : 'An error occured',
          icon: 'error',
          timer: 2000
        });

        router.push('/classes');
      });

    let Class = classResponse.data.data;
    setClass(Class);
    setLoading(false);
  }

  const openQuizArea = (quizId) => {
    router.push({
      pathname: '/Classes/quiz',
      query: { quizId }
    });
  }
  function createMarkup(html) {
    return {__html: html};
  }

  return (
    <HomeLayout>
      <>
        <Head>
          <title>Daca-ng - Classes</title>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="copyright" content={`Copyright © Daca-ng ${new Date().getFullYear()}`} />
          <meta name="description" content="Online preparatory classes for christians" />
          <meta name="robots" content="Classes"></meta>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet"></link>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&family=Yusei+Magic&display=swap" rel="stylesheet" />
        </Head>

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
                <Button variant="contained">Previous class</Button>
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
  user: state.authPage.user
});

const mapDispatchToProps = {
  reintialiseState,
  isUserLoggedIn
}

export default connect(mapStateToProps, mapDispatchToProps)(classroom)
