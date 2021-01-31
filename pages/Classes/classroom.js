import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import HomeLayout from '../../components/home/HomeLayout';
import Skeleton from 'react-loading-skeleton';

import componentStyles from '../../styles/classroomStyles';
import { reintialiseState, isUserLoggedIn } from '../../redux/actions/authActions';
import { Avatar, Button, Container, Typography } from '@material-ui/core';

export const classroom = (props) => {
  const styles = componentStyles();
  const router = useRouter();

  useEffect(() => {
    checkUser();
    window.scrollTo(0, 0);
  }, []);

  const checkUser = async () => {
    await props.reintialiseState();
    let isUserLoggedIn = await props.isUserLoggedIn();
    let classId = getClassIdFromRoute();

    if (classId == false)
      router.push('/Classes');

    if (!isUserLoggedIn) 
      router.push({
        pathname: '/auth',
        query: { notLI: true, redirect: `/classroom?classId=${classId}` }
      });

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

  const openQuizArea = (quizId) => {
    router.push({
      pathname: '/Classes/quiz',
      query: { quizId }
    });
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
                Introduction to Christianity Part 1
              </Typography>
              <div>
                <div className={styles.headerBody}>
                  <Avatar alt="pastors image" src="https://i.pravatar.cc/300?img=14" className={styles.large} />
                  <div>
                    <div>
                      <span>
                        Pst. Chigozie Onuoha
                      </span>
                    </div>
                    <span>
                      Jan 30, 2020 · 11 min read
                    </span>
                  </div>
                </div>
              </div>
              
            </Container>
          </div>

          <Container maxWidth="md" className={styles.classBody}>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, illo laboriosam eligendi, vero quos necessitatibus dolore a natus atque quis mollitia quia? Placeat necessitatibus delectus hic nihil voluptatibus repellendus explicabo distinctio beatae eaque ab omnis repellat numquam adipisci dicta aliquid dolorum, maxime corrupti deleniti natus voluptate commodi laborum quam facilis nesciunt. Nobis quibusdam, laboriosam itaque doloribus repellendus aperiam nulla tenetur deleniti accusamus obcaecati, sunt eaque id magnam, sequi quod odio ut laudantium adipisci culpa perspiciatis quas esse porro! Officiis eos, recusandae tempora praesentium eius ducimus ullam cupiditate dolores repudiandae at animi assumenda eum velit iste sapiente optio iusto dicta maxime facilis sit aliquid. Atque, aspernatur. Veniam sequi quisquam dolorum accusamus. Et iure earum maxime aut repellat vitae dolorum quisquam saepe cupiditate, iusto natus, ullam incidunt odit nostrum alias quas porro autem sequi praesentium doloremque rem deserunt dolore debitis? Debitis, unde? Explicabo perspiciatis, ipsa ipsum praesentium fugit corporis error eum necessitatibus, voluptas commodi dolore in ad cupiditate facilis! Suscipit voluptate magnam expedita quo omnis architecto. Totam possimus, incidunt amet repellat cupiditate molestiae voluptatum quaerat quas cumque laudantium eaque laboriosam voluptas libero voluptatem minus ab exercitationem. Maxime iste minus fuga aliquid ut. Ut provident magni perspiciatis maiores minima alias, praesentium distinctio accusantium non id tempora rem porro tempore sunt sequi reprehenderit incidunt explicabo? Similique voluptates ipsa impedit quia facere doloribus reprehenderit numquam, accusantium culpa magnam nam earum harum ea in quaerat. Exercitationem vero architecto quam et perferendis id harum minima delectus rerum dolore similique illum eos nesciunt deserunt eum ipsum aperiam labore adipisci, eaque doloribus perspiciatis consequuntur quia? Facilis voluptas, possimus rerum ipsum laudantium veniam optio ipsa impedit debitis repudiandae quas perspiciatis aliquid! Consequatur voluptate sapiente earum voluptates dolores deserunt alias a, vel sed ex voluptatem! Temporibus natus minima magnam quidem unde, perspiciatis odio sapiente provident incidunt ab a placeat necessitatibus suscipit!
            </p>
            
            <div>
              <Button variant="contained">Previous class</Button>
              <Button variant="contained" onClick={() => openQuizArea(1)} >Take Quiz</Button>
            </div>
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
