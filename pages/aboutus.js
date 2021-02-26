import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import HomeLayout from "../components/home/HomeLayout";
import { Container, Grid, Typography } from '@material-ui/core';
import CustomHead from '../components/HEAD/head';

const $primaryColor = '#6D0EB5';
const $lightGrey = '#636363';

const useStyles = makeStyles((theme) => ({
  main: {
    paddingBottom: '1rem',
  },
  banner: {
    height: '30vh',
    marginTop: '4rem',
    background: $lightGrey,  /* fallback colour. Make sure this is just one solid colour. */
    background: '-webkit-linear-gradient(rgba(48, 48, 54, 0.8), rgba(44, 33, 36, 0.5)), url("/images/churchBuilding.jpg")',
    background: 'linear-gradient(rgba(48, 48, 54, 0.8), rgba(44, 33, 36, 0.6)), url("/images/churchBuilding.jpg")', 
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 3rem',
    alignItems: 'center',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      padding: '0 1rem'
    }
  },
  captions: {
    textAlign: 'center',

    '& h4': {
      color: '#fff',
      fontSize: '2.5rem',
      textTransform: 'uppercase',
      fontWeight: 700
    }
  },
  church: {
    backgroundColor: '#e9e3f4'
  },
  container: {
    padding: '2rem'
  },
  buidingImage:{
    width: '100%',
    height: '300px'
  },
  textDiv: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '3rem',
    textTransform: 'uppercase',
    fontWeight: '600'
  },
  text: {
    fontSize: '1rem',
    color: '#6d6a74'
  },
  missions: {
    backgroundImage: 'linear-gradient(#e9e3f4, rgba(255,227,177, .5))',
    paddingTop: '1rem'
  },
  coreValue: {
    backgroundImage: 'linear-gradient(rgba(255,227,177, .5), #fff)',
    paddingTop: '1rem'
  },
}));

function about() {
  const classes = useStyles();

  React.useEffect(() => {
    window.scrollTo(0,0);
  }, [])

  return (
    <HomeLayout>
      <CustomHead 
        iosApplicationTitle="Daca-ng About us"
        title="Daca-ng - About us"
        robots="About Us"
      />
      
      <main className={classes.main}>
        <div className={classes.banner}>
          <Container>
            <div className={classes.captions} >
              <Typography variant="h4" >
                About us
              </Typography>
            </div>
          </Container>
        </div>

        <section className={classes.church}>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container>
              <Grid item xs={false} sm={6}>
                <img src="/images/Building.svg" className={classes.buidingImage} alt="building" srcset=""/>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.textDiv}>
                <Typography variant="h5" className={classes.title} > 
                  Our Church
                </Typography>

                <Typography variant="caption" className={classes.text}>
                  We’re mandated to raise a people that are spiritually vibrant,financially stable and socially responsible. 
                </Typography>
              </Grid>
            </Grid>
            
          </Container>
        </section>

        <section className={classes.missions}>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container>
              <Grid item xs={12} sm={6} className={classes.textDiv}>
                <Typography variant="h5" className={classes.title} > 
                  Our Mission
                </Typography>

                <Typography variant="caption" className={classes.text}>
                  We are committed to helping you develop a buoyant spiritual relationship with God.  
                  We are committed to developing your creativity in order for your life to yield maximum 
                  productivity in your chosen field for you to exert financial dominion on the behalf of God.  
                  We are dutifully committed to developing the social man to affect and influence his community for God.
                </Typography>
              </Grid>
              <Grid item xs={false} sm={6}>
                <img src="/images/mission.svg" className={classes.buidingImage} alt="building" srcset=""/>
              </Grid>
            </Grid>
            
          </Container>
        </section>

        <section className={classes.coreValue}>
          <Container maxWidth="lg" className={classes.container}>
            <Grid container>
              <Grid item xs={false} sm={6}>
                <img src="/images/corevalue.svg" className={classes.buidingImage} alt="building" srcset=""/>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.textDiv}>
                <Typography variant="h5" className={classes.title} > 
                  Our CORE VALUE
                </Typography>

                <Typography variant="caption" className={classes.text}>
                  To model the nature of God which is love and a culture of excellence while delivering selfless service.   
                  DACA is not just a church but a divine factory where societal influencers are molded and deployed. 
                  It’s a place where the nobodys are nurtured to become disruptors of causality and normality.  
                  A place where people without a history are groomed to become history makers. 
                  It’s a place where your spirituality is carefully safeguarded while pushing you to your destiny.
                </Typography>
              </Grid>
            </Grid>
            
          </Container>
        </section>


      </main>
    </HomeLayout>
  )
}

export default about
