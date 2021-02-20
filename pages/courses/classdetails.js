import React, {useEffect, useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Head from 'next/head';

import HomeLayout from '../../components/home/HomeLayout';
import { Container, Grid, IconButton } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { School } from '@material-ui/icons';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

import {connect} from 'react-redux';
import {reintialiseState, isUserLoggedIn} from '../../redux/actions/authActions';
import { getUserCurrentClass } from '../../redux/actions/classActions';
import api from '../../middlewares/axiosConfig'
import Skeleton from 'react-loading-skeleton';

const $primaryColor = '#6D0EB5';
const $lightGrey = '#636363';

const useStyles = makeStyles((theme) =>({
  root: {
    maxWidth: 345,
  },
  main: {
    marginTop: '4rem'
  },
  classes: {
    marginTop: '2rem'
  },
  banner: {
    height: '40vh',
    marginTop: '4rem',
    background: $lightGrey,  /* fallback colour. Make sure this is just one solid colour. */
    background: '-webkit-linear-gradient(rgba(48, 48, 54, 0.8), rgba(44, 33, 36, 0.5)), url("/images/classes.jpg")',
    background: 'linear-gradient(rgba(48, 48, 54, 0.8), rgba(44, 33, 36, 0.6)), url("/images/classes.jpg")', 
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
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
    color: '#fff',

    '& h4': {
      fontSize: '3rem',
      marginBottom: '30px',
      fontWeight: '500',
      [theme.breakpoints.down('xs')]: {
        fontSize: '2rem'
      }
    },
    '& .spanCaption': {
      fontSize: '1.5rem',
      marginBottom: '30px',
      fontWeight: '400',
      display: 'block',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.3rem'
      }
    },
    '& button':{
      background: $primaryColor,
      transition: '0.4s all',
      color: '#fff',
      padding: '10px 30px',

      '&:hover': {
        background: '#fff',
        color: $primaryColor
      }
    }
  },
  username: {
    textTransform: 'capitalize'
  },
  videoDetails: {
    textAlign: 'center',
    marginTop: '1rem',
    marginLeft: '1rem',

    '& > h5' : {
      fontSize: '1.6rem',
      fontWeight: '600',
    },

    '& > p' : {
      fontSize: '.9rem',
      color: "rgba(0, 0, 0, .7)",
      fontWeight: '500'
    }
  },
  pastor: {
    margin: '1rem 0',
    
    '& span': {
      fontStyle: 'italic',
      fontSize: '.8rem',
      fontWeight: '500',
      color: "rgba(0, 0, 0, .7)"
    }
  },
  card: {
    boxShadow: 'none !important'
  },
  videoFooter: {
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
  },
  classDetails: {
    marginTop: '1rem',
    marginBottom: '3rem',
    background: '#fff'
  },
  detailsHeader: {
    textAlign: 'center',
    paddingTop: '2rem'
  },
  schoolIcon: {
    fontSize: '3rem',
    color: '#fff'
  },
  classHeader: {
    marginTop: '1rem',
    fontWeight: 600, 
    fontSize: '2.1rem',
    textDecoration: 'underline',
    textDecorationColor: $primaryColor,
    textTransform: 'uppercase'
  },
  classes: {
    marginTop: '2rem',
    marginBottom: '4rem'
  },
  button: {
    background: $primaryColor,
    color: '#fff',
    fontWeight: '500',

    '&:hover': {
      background: '#fff',
      color: $primaryColor,
    }
  },
  classGrid: {
    padding: '1rem'
  },
  noClass: {
    margin: '0 auto 1rem',
    paddingLeft: '3rem',
    paddingRight: '3rem',
  },
  resumeClassBtn: {
    position: 'fixed',
    bottom: '23px',
    zIndex: '1000',
    right: '1%',
  }
}));

function classdetails(props) {
  const classes = useStyles();
  const router = useRouter();

  const [state, setState] = useState({
    currentTime: 0,
    duration: 0,
    formattedDuration: '00:00',
    formattedCurrentTime: '00:00',
    progress: 0,
    paused: true,
    muted: false,
    classes: [],
    loading: true,
    classType: 1
  });

  const [classType, setType] = useState(1)

  useEffect(() => {
    props.reintialiseState();
    getClassesByType();
  }, []);

  const getClassesByType = async () => {
    let type = getTypeFromRoute();
    if (!type)
      router.push('/courses');

    let isUserLoggedIn = await props.isUserLoggedIn();
    if (isUserLoggedIn) {
      checkUserClass();
    }

    setType(parseInt(type));
    await api.get('/classes/getAllClassByTypeId/' + type).then(res => {
      setState({...state, classes: res.data.data, loading: false});
      window.scrollTo(0, 0);
      
    }).catch(err => {
      setState({...state, loading: false});
      Swal.fire({
        title: 'error',
        text: err ? err.data.msg : 'An error occured',
        icon: 'error',
        timer: 2000
      });
    })
  }

  const checkUserClass = () => {
    props.getUserCurrentClass();
  }

  const cutText = (text = '') => {
     if (text.length < 201)
      return text;

    return text.slice(0, 200);
  }

  const getTypeFromRoute = () => {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("type")) {
      let search = location.search;
      let type = search.replace("?type=", '');
      
      return type
    }
    return false;
  }

  const videoRef = useRef(null);

  const getFormatedTime = (time) => {
    let sec_num = parseInt(time, 10);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - hours * 3600) / 60);
    let seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
  }

  const setDuration = () => {
    let formattedDuration = getFormatedTime(videoRef.current.duration);

    setState({
      ...state, 
      duration: videoRef.current.duration,
      formattedDuration: formattedDuration
    });
  }

  const updateTime = () => {
    let formattedCurrentTime = getFormatedTime(videoRef.current.currentTime);

    setState({
      ...state,
      currentTime: videoRef.current.currentTime,
      progress: 100*state.currentTime/state.duration,
      formattedCurrentTime
    });
  }

  const playPause = () => {
    videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
    setState({...state, paused: videoRef.current.paused});
  }

  const muteUnmute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setState({...state, muted: videoRef.current.muted});
  }
  
  return (
    <HomeLayout>

      <Head>
        <title>Daca-ng - Classes Details</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="copyright" content="Classes page for taking online classes and exams" />
        <meta name="description" content="To model the nature of God(love) and a culture of excellence while delivering selfless service" />
        <meta name="robots" content="Classes"></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet"></link>
      </Head>

      <main className={classes.main}>
        <div className={classes.banner}>
          <Container>
            <div className={classes.captions} >
              <Typography variant="h4" >
                Welcome, <span className={classes.username}>{ Object.keys(props.user).length > 0 ? props.user.name : 'visitor' }</span>
              </Typography>
              <Typography variant="caption" className="spanCaption">
                Introduction Classes meant to prepare you for being a better Christain.
              </Typography>
            </div>
          </Container>
        </div>

        <Container className={classes.classes}>
          <div>
            { props.userCurrentClassId > 0 ?
                <Button className={classes.resumeClassBtn} variant="contained" color="secondary">
                  Resume Class
                </Button> : ''
            }
            
          </div>
          <Grid container className={classes.introDiv}>
            <Grid item xs={12} sm={4}>
              <div>
                <Card id="vp-card" raised={false} className={classes.card}>
                  <video id="vp-media" width="100%" ref={videoRef}
                    onLoadedMetadata={setDuration} onTimeUpdate={updateTime}>
                    <source src="/videos/intro.mp4" 
                      type="video/mp4" />
                  </video>
                  <CardActions className={classes.videoFooter}>
                    <IconButton aria-label="Play/Pause" onClick={playPause}>
                      {state.paused ? (<PlayArrowIcon />) : (<PauseIcon />)}
                    </IconButton>
                    <LinearProgress style={{ width: '100%' }} id="vp-progress" variant="determinate" value={state.progress} />
                    <div style={{ width: '50%' }} >{state.formattedCurrentTime} / {state.formattedDuration}</div>
                    <IconButton aria-label="Play/Pause" onClick={muteUnmute}>
                      {state.muted ? (<VolumeOffIcon />) : (<VolumeUpIcon />)}
                    </IconButton>
                  </CardActions>
                </Card>
              </div>
            </Grid>
            <Grid item xs={12} sm={8}>
              <div className={classes.videoDetails}>
                <Typography variant="h5">
                  Introduction
                </Typography>
                <Typography variant="caption" align="justify" variantMapping={{caption: 'p'}} >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, corporis doloremque 
                  sunt enim voluptate explicabo ullam sapiente aliquam nemo, praesentium eius. 
                  Deserunt corrupti natus, nihil blanditiis, consectetur beatae delectus facere 
                  distinctio repellendus possimus exercitationem assumenda totam optio magni 
                  reprehenderit dolor.
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, corporis doloremque 
                  sunt enim voluptate explicabo ullam sapiente aliquam nemo, praesentium eius. 
                  Deserunt corrupti natus, nihil blanditiis, consectetur beatae delectus facere 
                  distinctio repellendus possimus exercitationem assumenda totam optio magni 
                  reprehenderit dolor.
                </Typography>

                <div className={classes.pastor}>
                  <Typography variant="caption">
                    Pastor Timothy Benedict
                  </Typography>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>

        <div className={classes.classDetails}>
          <Container>
            <section className={classes.detailsHeader}>
              <Typography variant="caption">
                <IconButton style={{background: $primaryColor}}>
                  <School className={classes.schoolIcon}/>
                </IconButton>
              </Typography>
              <Typography variant="h4" className={classes.classHeader}>
                {classType == 1 ? 'Basic' : 'Advanced'} Classes
              </Typography>
            </section>

            <Grid container className={classes.classes}>
              {state.loading ? (
                <Grid container>
                  <Grid item xs={12} sm={6} className={classes.classGrid}>
                    <Skeleton height='300' />
                    <Skeleton count={3} />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.classGrid}>
                    <Skeleton height='150' />
                    <Skeleton count={3} />
                  </Grid>
                </Grid>
              ) : (
                state.classes.length < 1 ? 
                  <Card raised={true} className={classes.noClass}>
                    <div>
                      <CardContent>
                        <Typography component="h5" variant="h5">
                          No classes
                        </Typography>
                      </CardContent>
                    </div>
                  </Card> :
                  state.classes.map( Class => {
                    return <Grid item xs={12} sm={6} md={4} className={classes.classGrid} key={Class.id}>
                      <Card raised={true} >
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image="https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                            title="Contemplative Reptile"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                              {Class.classTitle}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              {cutText(Class.description.length < 1 ? Class.classTitle : Class.description)}
                            </Typography>
                            <div className={classes.pastor}>
                              <Typography variant="caption">
                                {Class.tutor}
                              </Typography>
                            </div>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button size="small" variant="contained" className={classes.button} 
                            onClick={ () => router.push('/courses/classroom?classId=' + Class.id) }>
                            goto class
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                })
              )}
              
            </Grid>
          </Container>
        </div>
      </main>
      

    </HomeLayout>
  )
}

const mapStateToProps = state => ({
  user: state.authPage.user,
  resumeClassId: state.classReducer.userCurrentClassId
});

const mapDispatchToProps = {
  reintialiseState,
  isUserLoggedIn,
  getUserCurrentClass
}

export default connect(mapStateToProps, mapDispatchToProps)(classdetails);
