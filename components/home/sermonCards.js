import React, { useState, useEffect } from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Color from 'color';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import { useN01TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n01';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import VideocamRounded from '@material-ui/icons/VideocamRounded';
import HeadsetMicRounded from '@material-ui/icons/HeadsetMicRounded';
import Person from '@material-ui/icons/Person';
import Category from '@material-ui/icons/Category';
import Watch from '@material-ui/icons/WatchLater';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useRouter } from 'next/router';

import { getSermons } from '../../redux/actions/sermonActions'
import { Button, IconButton } from '@material-ui/core';
const $primaryColor = '#6D0EB5';

const useStyles = makeStyles(({breakpoints}) => ({
  root: {
    margin: 'auto',
    boxShadow: 'none',
    borderRadius: '10px'
  },
  content: {
    padding: 24,
    paddingLeft: 0,
    position: 'relative',
    backgroundColor: 'transparent',

    '& *:not(.avartar)': {
      textAlign: 'left'
    }
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial',
  },
  cards: {
    marginTop: "30px"
  },
  cardRoot: {
    background: 'transparent',

    '&:hover .avartar':{
      top: '-45%',
      background: Color('#6D0EB5').lighten(0.5).toString(),
      color: '#fff',

      '& h6':{
        color: '#fff'
      }
    }
  },
  logo:{
    transition: '0.3s',
    width: 80,
    boxShadow: '0 4px 12px 0 rgba(0,0,0,0.24)',
    position: 'absolute',
    top: '-35%',
    left: '3%',
    background: '#fff',
    borderRadius: '5px',

    '& h5':{
      marginTop: '5px',
      fontWeight: '700'
    },
    '& h6':{
      marginBottom: '5px',
      color: '#636363'
    }
  },
  image: {
    boxShadow: '0 4px 12px 0 rgba(0,0,0,0.24)',
    borderRadius: '10px',
    marginBottom: '10px'
  },
  icons: {
    textAlign: 'left',

    '& .toolIcon':{
      marginRight: '30px',
      cursor: 'pointer',

      '& svg': {
        color: Color("#636363").lighten(0.5).toString(),
        fontSize: '20px',

        [breakpoints.only('xs')]: {
          fontSize: '15px',
        }
      }
    }
  },
  title: {
    textAlign: 'left',
    marginTop: '10px',

    [breakpoints.only('xs')]: {
      marginTop: '0',
      '& *': {
        fontSize: '1rem'
      }
    }
  },
  info: {
    marginTop: '20px',

    '& div, & span': {
      display: 'flex',
      alignItems: 'center',
      // fontSize: '1rem'
    },
    
    '& svg': {
      marginRight: '10px',
      fontSize: '18px',
      color: '#F49642'
    },

    '& .pTitle': {
      color: Color('#636363').lighten(0.3).toString(),

      '& span': {
        color: '#636363',
        fontStyle: 'italic',
        marginLeft: '10px',
        fontWeight: '500',
      }
    },

    [breakpoints.only('xs')]: {
      marginTop: '5px'
    }
  },
  grid: {
    width: '100%',
    [breakpoints.down('sm')]:{
      padding: '0 25px !important',
      marginTop: '20px'
    }
  },
  avartar: {
    textAlign: 'center'
  },
  sermonButton:{
    background: $primaryColor,
    color: '#fff',
    marginTop: '2rem',

    '&:hover': {
      background: $primaryColor
    }
  }
}));

export const SermonCards = React.memo(function NewsCard() {
  const styles = useStyles();
  const mediaStyles = useWideCardMediaStyles();
  const textCardContentStyles = useN01TextInfoContentStyles();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  const sermons = useSelector(state => state.sermonReducer.detailedSermons)
    .sort((a, b) => b.id - a.id)
    .slice(0, 3)
    .map(sermon => sermon);

  function isAudio (sermonFileName) {
    const audioExtensions = ["wav", "mp3", "m3u"];
    
    let lastDot = sermonFileName.split("uploads")[1].lastIndexOf('.');
    let extention = sermonFileName.split("uploads")[1].substring(lastDot + 1).toLowerCase();
    let isValidAudioExtension = audioExtensions.find(audio => audio == extention);

    return isValidAudioExtension ? true: false;
  }
  
  useEffect(() => {
    dispatch(getSermons());
  }, []);
  
  useEffect(() => {
    if (sermons.length < 1)
      setLoading(true);
    else
      setLoading(false);
  }, [sermons]);

  return (
    <div className={styles.cards}>
      {
        loading ? (
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} >
              <Skeleton height='10rem' />
              <div style={{marginTop:'1rem'}}>
                <Skeleton count={4} height='2rem' />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} >
              <Skeleton height='10rem' />
              <div style={{marginTop:'1rem'}}>
                <Skeleton count={4} height='2rem' />
              </div>
            </Grid>
          </Grid>
        ) : 
          <div style={{textAlign: 'center'}}>
            <Grid container spacing={4}>
              { 
                sermons.map((sermon, i) => {
                  let createdAt = moment(sermon.createdAt);
                  return (
                    <Grid item sm={12} md={4} className={styles.grid} key={i}>
                      <Card className={cx(styles.root, styles.cardRoot)} >
                        <CardMedia classes={mediaStyles} className={styles.image}
                          image='/images/DEVELOPING-A-WINNING-CHARACTER-WITH-TIMOTHY-C-BENEDICT_01-mp3-image-600x600.jpg'
                        />
                        <CardContent className={styles.content}>
                          <div className={cx(styles.logo, 'avartar', styles.avartar)} >
                            <Typography variant="h5" className="avartar">
                              {createdAt.date()}
                            </Typography>
                            <Typography variant="h6"  className="avartar">
                              {createdAt.format('MMM')}
                            </Typography>
                          </div>

                          <div className={styles.icons}>
                            {
                              isAudio(sermon.sermonFileName) ?
                                <Tooltip title="Audio" placement="top" aria-label="Audio" className="toolIcon">
                                  <IconButton onClick={() => router.push(`/sermons?id=${sermon.id}`)}>
                                    <HeadsetMicRounded />
                                  </IconButton>
                                </Tooltip>
                                :
                                <Tooltip title="video" placement="top" aria-label="Video" className="toolIcon">
                                  <IconButton onClick={() => router.push(`/sermons?id=${sermon.id}`)}>
                                    <VideocamRounded />
                                  </IconButton>
                                </Tooltip>
                            }
                          </div>

                          <div className={styles.title}>
                            <TextInfoContent
                              classes={textCardContentStyles}
                              heading={sermon.sermonTitle}
                            />
                          </div>
                          
                          <Divider />

                          <div className={styles.info}>
                            <div>
                              <Icon>
                                <Person />
                              </Icon>
                              <Typography variant="caption" className="pTitle">
                                Sermon From: <span>{sermon.sermonPreacher}</span>
                              </Typography>
                            </div>
                            <div>
                              <Icon>
                                <Category />
                              </Icon>
                              <Typography variant="caption" className="pTitle">
                                Category: <span>{sermon.category}</span>
                              </Typography>
                            </div>
                            <div>
                              <Icon>
                                <Watch />
                              </Icon>
                              <Typography variant="caption" className="pTitle">
                                {createdAt.format('MMM DD')} 0n:
                                <span>{`${createdAt.format('HH')}:00 ${createdAt.format('HH') < 12 ? 'am' : 'pm'}`}</span>
                              </Typography>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                  )
                })
              }
            </Grid>
            <Button variant="contained" onClick={() => router.push('/sermons')} className={styles.sermonButton} >
              All Sermons
            </Button>
          </div>
      }
    </div>
    
  );
});

export default SermonCards