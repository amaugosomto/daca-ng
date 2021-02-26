import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import WelcomeCards from '../components/home/welcomeCards';
import SermonCards from '../components/home/sermonCards';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'; 
import { Container, Typography, Button} from '@material-ui/core';
import WithExternalControls from '../components/home/UpcomingEvents'
import HomeLayout from '../components/home/HomeLayout';
import CustomHead from '../components/HEAD/head';

export default function Home() {
  let [pageLoaded, setPageLoaded] = useState(false);
  let [flipImage, setFlipImage] = useState(false);

  useEffect(() => {
    flipLoader();
  }, []);

  const flipLoader = () => {
    setFlipImage(flipImage = true);
    setTimeout(function () {
      setPageLoaded(pageLoaded = true);
    }, 1000);
  }

  return (
    <HomeLayout>
      <div>
        <CustomHead 
          iosApplicationTitle="Daca-ng Home"
          title="Daca-ng - Home"
          robots="Classes"
        />

        <main className={styles.main}>

          <Carousel infiniteLoop="true" autoPlay transitionTime= "1000" showThumbs={false} showStatus={false}>
            <div>
                <img src="/images/DACA-1.jpg" />
            </div>
            <div>
                <img src="/images/DACA-2.jpg" />
            </div>
            <div>
                <img src="/images/DACA-3.jpg" />
            </div>
            <div>
                <img src="/images/DACA-4.jpg" />
            </div>
            <div>
                <img src="/images/DACA-5.jpg" />
            </div>
            <div>
                <img src="/images/DACA-6.jpg" />
            </div>
          </Carousel>

          <section id={styles.welcome}>
            <Container maxWidth="md" className={styles.center, styles.midWidth}>
              <Typography variant="h5" gutterBottom id={styles.welcomeTitle} >
                Welcome to Church
              </Typography>
              <Typography variant="caption" id={styles.welcomeMessage}>
                A church isn't a building--it's the people. We meet at 210 Okigwe Road, Opp Glass House, Owerri. You are welcome to join us.
              </Typography>

              <WelcomeCards />
              
            </Container>
          </section>

          <section id={styles.membership}>
            <Container maxWidth="md" >
              <div id={styles.innerCont}>
                <Typography variant="h6" gutterBottom>
                  A Place for you
                </Typography>
                <Typography variant="h4" gutterBottom>
                  Find a place to connect and grow through a small group, class, or regular gathering.
                </Typography>
                <Button color="secondary">
                  BECOME A MEMBER
                </Button>
              </div>
            </Container>
          </section>

          <section id={styles.sermons}>
            <Container maxWidth="md" className={styles.midWidth}>
              <Typography variant="h5" gutterBottom id={styles.welcomeTitle} >
                Latest Sermons
              </Typography>
              <SermonCards />
            </Container>
          </section>

          <section>
            <WithExternalControls />
          </section>
        </main>
      </div>
    </HomeLayout>
  );
}
