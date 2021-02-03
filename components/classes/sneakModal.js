import React, {useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Divider, Grid, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import Classes from './classes';
import { useRouter } from 'next/router';


const useStyles = makeStyles(({ spacing, palette, breakpoints }) => {
  const family =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  return {
    card: {
      display: 'flex',
      padding: spacing(2),
      minWidth: 288,
      borderRadius: 12,
      boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
      '& > *:nth-child(1)': {
        marginRight: spacing(2),
      },
      '& > *:nth-child(2)': {
        flex: 'auto',
      },
    },
    avatar: {},
    heading: {
      fontFamily: family,
      fontSize: 16,
      marginBottom: 0,
    },
    subheader: {
      fontFamily: family,
      fontSize: 14,
      color: palette.grey[600],
      letterSpacing: '1px',
      marginBottom: 4,
    },
    value: {
      marginLeft: 8,
      fontSize: 14,
      color: palette.grey[500],
    },
    dialogHeader: {
      background: 'whitesmoke',
      padding: '.5rem 1rem',
  
      '& > *': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      },
  
    },
    dialogHeaderText: {
      fontSize: '1.4rem',
      textTransform: 'uppercase',
      fontWeight: '500'
    },
    videoDetails: {
      marginTop: '1rem',
  
      '& > h5' : {
        fontSize: '1.6rem',
        fontWeight: '600',
      },
  
      '& > span' : {
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
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '.8rem'
    },
    details: {
      display: 'flex',
      flexDirection: 'column',

      '& h5': {
        fontSize: '1rem',
        fontWeight: '500'
      },

      '& h6': {
        fontSize: '.9rem',
        color: "rgba(0, 0, 0, .7)",
        fontWeight: '400'
      }

    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    contentHead: {
      marginBottom: '.5rem',
      fontSize: '1.5rem', 
      fontWeight:'600',
    },
    button: {
      background: '#6D0EB5',
      marginTop: '.5rem',
      color: '#fff',

      '& *': {
        color: '#fff',
        fontSize: '.9rem',
        marginLeft: '.4rem'
      },

      '&:hover': {
        background: '#6D0EB5',
        color: '#fff',
      }
      
    },
    modalContainer: {
      [breakpoints.down('sm')]: {
        paddingLeft: 0,
        paddingRight: 0
      }
    }
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function sneakModal(props) {
  const styles = useStyles();
  const router = useRouter();

  const [state, setState] = useState({
    currentTime: 0,
    duration: 0,
    formattedDuration: '',
    formattedCurrentTime: '00:00',
    progress: 0,
    paused: true,
    muted: false
  });

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
      formattedDuration
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
  
  const handleClose = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    let formattedCurrentTime = '00:00';

    setState({...state, currentTime: 0, formattedCurrentTime: formattedCurrentTime});
    props.handleClose();
  }

  const openClassRoom = (classId) => {
    handleClose();
    router.push({
      pathname: '/classes/classroom',
      query: { classId }
    });
  }

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="lg"
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className={styles.dialogHeader}>
          <span className={styles.dialogHeaderText}>
            {props.classType == 1 ? "Basic Classes" : "Advanced Classes"}
          </span>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Container style={{marginTop: '1rem'}} className={styles.modalContainer}>
            <Grid container>
              <Grid item xs={12} sm={5}>
                <div>
                  <Card id="vp-card">
                    <video id="vp-media" width="100%" ref={videoRef}
                      onLoadedMetadata={setDuration} onTimeUpdate={updateTime}>
                      <source src="/videos/intro.mp4" 
                        type="video/mp4" />
                    </video>
                    <CardActions>
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

                  <div className={styles.videoDetails}>
                    <Typography variant="h5">
                      Introduction
                    </Typography>
                    <Typography variant="caption">
                      Lorem ipsum dolor sit amet consectetur adipisicing.
                    </Typography>

                    <div className={styles.pastor}>
                      <Typography variant="caption">
                        Pastor Timothy Benedict
                      </Typography>
                    </div>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={7}>
                <Container className={styles.modalContainer}>
                  <Typography variant="h5" className={styles.contentHead}>
                    Classes
                  </Typography>
                  <Divider />
                  
                  <Classes classType={props.classType} handleClose={handleClose} openClassRoom={openClassRoom} />
                </Container>
                
              </Grid>
            </Grid>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  )
}
