import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Color from 'color';
import moment from 'moment';

import api from '../../middlewares/axiosConfig';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@material-ui/core';
import { CloseIcon } from '@material-ui/data-grid';
import { DateRange, DoubleArrow, LocationOn, WatchLater } from '@material-ui/icons';
import Skeleton from 'react-loading-skeleton';

const $primaryColor = '#6D0EB5';
const $lightGrey = '#636363';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  container: {
    marginTop: '3rem',
  },
  header: {
    fontSize: '1.7rem',
    marginBottom: '1rem',
    fontWeight: 500,
    textTransform: 'uppercase'
  },
  headerDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2rem',
  },
  headerButton: {
    outline: 'none',
    '&:focus': {
      outline: 'none'
    },
    background: "#2E7D32",
    color: '#fff',
    '&:hover': {
      background: '#fff',
      color: '#2E7D32',
      outline: '#2E7D32 solid 1px'
    }
  },
  formControl: {
    minWidth: '100%',
  },
  Dialog: {
    '& *:focus': {
      outline: 'none'
    }
  },
  gridContainer: {
    '& > div': {
      padding: '.5rem'
    }
  },
  DialogTitle: {
    '& h2': {
      fontSize: "1.5rem"
    }
  },
  control: {
    marginTop: '4rem',
    background: $lightGrey,  /* fallback colour. Make sure this is just one solid colour. */
    background: '-webkit-linear-gradient(rgba(201, 135, 27, 0.5), rgba(201, 135, 27, 0.5)), url("/images/upcomingEvents.jpg")',
    background: 'linear-gradient(rgba(201, 135, 27, 0.5), rgba(201, 135, 27, 0.5)), url("/images/upcomingEvents.jpg")', 
    height: '250px',
    backgroundAttachment: 'fixed',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 6rem',
    alignItems: 'center',
    textAlign: 'left',
  
    '& div:first-of-type *' : {
      color: '#fff',
    },
  
    '& h4': {
      fontSize: '2.3rem',
      letterSpacing: '3px',
    },
  
    '& p': {
      fontSize: '1.3rem',
    },
  
    '& .icons': {
      display: 'flex'
    },

    '& svg': {
      fontSize: '50px',
      color:'rgb(219, 214, 214)',
      cursor: 'pointer',
  
      '&:hover': {
        color: '#fff'
      }
    },

    [theme.breakpoints.down('sm')]: {
      padding: '0 2rem'
    },

    [theme.breakpoints.only('xs')]: {
      padding: '0 1.5rem',
      '& h4': {
        fontSize: '1rem',
      },
      '& p': {
        fontSize: '.8rem',
      },
      height: '150px',
      '& svg': {
        fontSize: '1.3rem'
      }
    }
  },
  
  carouselItem: {
    marginBottom: '30px',

    '& img': {
      boxShadow: '0 4px 12px 0 rgba(0,0,0,0.24)',
      borderRadius: '10px',
      height: '200px',
      width: '100%'
    },

    '& .body': {
      fontFamily: '"Open Sans", sans-serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      textAlign: 'left',
      padding: '10px 30px',

      '& h5': {
        fontWeight: '500',
        marginBottom: '15px',
        fontSize: '1.6rem',

        [theme.breakpoints.only('xs')]: {
          fontSize: '1rem',
          marginBottom: '10px',
        }
      },

      '& .icons': {
        display: 'flex',
        flexWrap: 'wrap',

        '& span': {
          display: 'flex',
          alignItems: 'center',

          '& span': {
            color: Color($lightGrey).lighten(0.3).toString(),
            fontSize: '.9rem',
            fontStyle: 'italic',

            [theme.breakpoints.only('xs')]: {
              fontSize: '.7rem',
            }
          }
        },

        '& span:not(:first-of-type) svg':{
          marginLeft: '10px'
        }
      },

      '& svg':{
        fontSize: '20px',
        color: $primaryColor,
        marginRight: '5px'
      },

      '& .caption *': {
        fontSize: '.9rem',

        [theme.breakpoints.only('xs')]: {
          fontSize: '.7rem',
        }
      },

      '& .caption': {
        [theme.breakpoints.down('sm')]: {
          margin: '10px 0'
        }
      },

      '& button': {
        color: Color($lightGrey).lighten(0.3).toString(),
        fontWeight: '500',

        '& svg': {
          transition: '.3s all',
          color: Color($lightGrey).lighten(0.3).toString(),
          marginLeft: '5px'
        },

        '&:hover': {
          color: $primaryColor,
          '& svg': {
            marginLeft: '10px',
            color: $primaryColor
          }
        },

        [theme.breakpoints.only('xs')]: {
          fontSize: '.7rem',
        }
      },
      [theme.breakpoints.down('sm')]: {
        padding: '10px 20px'
      }

    },

    '& .findMore': {
      display: 'flex',
      alignItems: 'center',

      '& button': {
        padding: '10px 30px',
        background: '#fff',
        color: $primaryColor,
        transition: '0.5s all',

        '&:hover': {
          background: $primaryColor,
          color: '#fff'
        },
        [theme.breakpoints.down('sm')]: {
          padding: '10px 20px'
        },

        [theme.breakpoints.only('xs')]: {
          fontSize: '.7rem',
          padding: '10px 10px'
        }
      }
    }
  },
  grid: {
    '& > div': {
      marginRight: '30px'
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '20px',
      '& img': {
        height: '250px'
      }
    }
  }
}));

function eventDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const events = useSelector(state => state.eventReducer.detailedEvents);
  const [singleEvent, setSingleEvent] = useState({});
  const [loading, setLoading] = useState({});

  useEffect(() => {
    let eventId = props.eventId;

    if (eventId > 0) {
      let event = events.find(event => event.id == eventId);

      if (event == undefined) {
        getEventFromDB(eventId);
      } else {
        setSingleEvent(event);
        setLoading(false);
      }
    }

  }, [props.eventId]);

  function getEventFromDB(eventId) {
    api.get("/events/getEvent/" + eventId)
      .then(data => {
        let event = data.data;

        setSingleEvent({ ...event });
        setLoading(false);
      })
      .catch(() => {
        props.handleClose();
      });
  }

  let domain = process.env.NODE_ENV == "development" ?
    'http://localhost:5000': 'https://api.daca.org.ng';

  return (
    <>
      {
        loading ? 
          <Grid container spacing={4}>
            <Grid item xs={12} md={3} >
              <Skeleton height="10rem" />
            </Grid>
            <Grid item sx={12} md={9} >
              <Skeleton height="10rem" />
            </Grid>
          </Grid>
          :
          <Dialog aria-labelledby="customized-dialog-title"
            open={props.open} className={classes.Dialog} fullWidth={true} maxWidth="md">
            <DialogTitle id="customized-dialog-title" className={classes.DialogTitle} >
              View Event
              <IconButton aria-label="close" className={classes.closeButton} onClick={props.handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <div className={classes.carouselItem}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <img src={ `${domain}/${singleEvent.eventFileName.replace("\\", "/")}` } />
                  </Grid>
                  <Grid item xs={12} md={8} className="body">
                    <div>
                      <Typography variant="h5">
                        { singleEvent.eventTitle }
                      </Typography>
                      <div className="icons">
                        <span>
                          <DateRange />
                          <Typography variant="caption">
                            { moment(singleEvent.eventDate).format("MMMM do, yyyy") }
                          </Typography>
                        </span>
                        <span>
                          <WatchLater />
                          <Typography variant="caption">
                          { moment(singleEvent.eventDate).format("HH:MM") }
                          </Typography>
                        </span>
                        <span>
                          <LocationOn />
                          <Typography variant="caption">
                          { singleEvent.eventVenue }
                          </Typography>
                        </span>
                      </div>
                    </div>
                    <div className="caption">
                      <Typography variant="caption">
                        { singleEvent.eventDesc }
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </DialogContent>
          </Dialog>
      }
    </>
  )
}

export default eventDialog
