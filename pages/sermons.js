import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import HomeLayout from '../components/home/HomeLayout';
import CustomHead from '../components/HEAD/head'

import { Container, Grid, Typography, createMuiTheme, ThemeProvider, Divider, IconButton, Button } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import AudioPlayer from 'material-ui-audio-player';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { PlayCircleFilled } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';
import clsx from 'clsx';

import { getSermons } from '../redux/actions/sermonActions';
 
// import sermonImage from '';

const $primaryColor = '#6D0EB5';
const $lightGrey = '#636363';

const useStyles = makeStyles((theme) => ({
  main: {
    paddingBottom: '2rem',
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
  audio: {
    width: '100%',
    padding: '1rem',
    '& svg:hover': {
      color: purple[500]
    }
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  cover: {
    width: 151,
  },
  sermonList: {
    marginTop: '1rem'
  },
  sermonCard: {
    marginBottom: '1rem'
  },
  iconButton: {
    marginRight: '2rem'
  },
  sermonFooter: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-between'
  },
  downloadButton: {
    color: '#fff',
    background: $primaryColor,

    '&:hover': {
      background: $primaryColor
    }
  }
}));

function sermon() {
  let domain = process.env.NODE_ENV == 'development' ? 
    'http://localhost:5000': 'https://api.daca.org.ng';
  const classes = useStyles();
  const dispatch = useDispatch();
  const sermons = useSelector(state => state.sermonReducer.detailedSermons)
    .sort((a, b) => b.id - a.id);
  const [currentSermon, setCurrentSermon] = useState({
    id: 0,
    sermonTitle: '',
    sermonPreacher: '',
    sermonDesc: '',
    sermonFileName: '',
    duration: 0,
    category: '',
    createdAt: '',
    updatedAt: ''
  });

  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    window.scrollTo(0,0);
    dispatch(getSermons());

  }, []);

  React.useEffect(() => {
    if (sermons.length < 1)
      setLoading(true);
    else{
      setLoading(false);
      let sermon = {...sermons[0]};
      sermon.sermonFileName = `${domain}/${sermon.sermonFileName}`;

      setCurrentSermon(sermon);
    }
  }, [sermons]);

  function setSermon(id) {
    const sermon = { ...sermons.find(sermon => sermon.id == id) };

    if (sermon != undefined){
      sermon.sermonFileName = `${domain}/${sermon.sermonFileName}`;
      setCurrentSermon(sermon);
    }
  }

  return (
    <HomeLayout>
      <CustomHead 
        iosApplicationTitle="Daca-ng Sermons"
        title="Daca-ng - Sermons"
        robots="Sermons"
      />

      <main className={classes.main}>
        <div className={classes.banner}>
          <Container>
            <div className={classes.captions} >
              <Typography variant="h4" >
                Sermons
              </Typography>
            </div>
          </Container>
        </div>
      </main>

      <Container>

        <div>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={5}>
              {
                loading ? 
                  <>
                    <Skeleton height="2rem" />
                    <Skeleton height="2rem" />
                  </> :
                  <Card className={classes.root}>
                    <div className={classes.details}>
                      <div className={classes.controls}>
                        <div className={classes.audio}>
                          <AudioPlayer 
                            src={currentSermon.sermonFileName} 
                            className={classes.audio}
                            elevation={0}
                            rounded={true}
                            download={true}
                          />
                        </div>
                      </div>
                      <Divider />
                      <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                          {currentSermon.sermonTitle} 
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {currentSermon.sermonPreacher} 
                        </Typography>
                      </CardContent>
                    </div>
                    <CardMedia
                      className={classes.cover}
                      image="/images/sermon.jpg"
                      title="Live from space album cover"
                    />
                  </Card>
              }
            </Grid>

            <Grid item xs={12} sm={7} >
              <Typography variant="h5">Sermon List</Typography>

              <div className={classes.sermonList}>
                {
                  loading ? 
                    <>
                      <div style={{marginTop: '1rem'}}>
                        <Skeleton height="3rem" />
                      </div>
                      <div style={{marginTop: '1rem'}}>
                        <Skeleton height="3rem" />
                      </div>
                      <div style={{marginTop: '1rem'}}>
                        <Skeleton height="3rem" />
                      </div>
                    </> : 
                    <>
                      {
                        sermons.map((sermon, i) => {
                          let createdAt = moment(sermon.createdAt);

                          return (
                            <Card className={classes.sermonCard} key={i}>
                              <div className={classes.details}>
                                <CardContent className={classes.content}>
                                  <Typography component="h5" variant="h5">
                                    <IconButton className={classes.iconButton} onClick={() => setSermon(sermon.id)}>
                                      <PlayCircleFilled />
                                    </IconButton>
                                    {sermon.sermonTitle}
                                  </Typography>
                                  <Typography variant="subtitle1" color="textSecondary">
                                    {sermon.sermonPreacher}
                                  </Typography>
                                  <div className={classes.sermonFooter} >
                                    <Typography variant="subtitle1" color="textSecondary">
                                      {createdAt.format('dddd, MMMM Do YYYY')} BY :
                                        <span>{` ${createdAt.format('HH')}:00 ${createdAt.format('HH') < 12 ? 'am' : 'pm'}`}</span>
                                    </Typography>
                                    <a 
                                      className={clsx(classes.downloadButton, 
                                        "MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedSizeSmall MuiButton-sizeSmall")} 
                                      href={`${domain}/${sermon.sermonFileName}`} 
                                      download
                                    >
                                      <span class="MuiButton-label">download sermon</span>
                                      <span class="MuiTouchRipple-root"></span>
                                    </a>
                                  </div>
                                </CardContent>
                              </div>
                            </Card>
                          )
                        })
                      }
                    </>
                }
                
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
    </HomeLayout>
  )
}

export default sermon
