import React, {useEffect, useState} from 'react';
import { Carousel } from 'react-responsive-carousel';
import Container from '@material-ui/core/Container';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { makeStyles } from '@material-ui/core/styles';
import { DateRange, KeyboardArrowLeft, KeyboardArrowRight, LocationOn, WatchLater, DoubleArrow } from '@material-ui/icons';
import Color from 'color';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import cx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents } from '../../redux/actions/eventActions';
import moment from 'moment';

import EventDialog from '../../components/home/eventDialog';

const $primaryColor = '#6D0EB5';
const $lightGrey = '#636363';

const useStyles = makeStyles(({breakpoints}) => ({
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

    [breakpoints.down('sm')]: {
      padding: '0 2rem'
    },

    [breakpoints.only('xs')]: {
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
      height: '200px'
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

        [breakpoints.only('xs')]: {
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

            [breakpoints.only('xs')]: {
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

        [breakpoints.only('xs')]: {
          fontSize: '.7rem',
        }
      },

      '& .caption': {
        [breakpoints.down('sm')]: {
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

        [breakpoints.only('xs')]: {
          fontSize: '.7rem',
        }
      },
      [breakpoints.down('sm')]: {
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
        [breakpoints.down('sm')]: {
          padding: '10px 20px'
        },

        [breakpoints.only('xs')]: {
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
    [breakpoints.down('sm')]: {
      marginTop: '20px',
      '& img': {
        height: '250px'
      }
    }
  }
}));

function WithExternalControlsv2() {
  let [currentSlide, setCurrentSlide] = useState(0);
  let [open, setOpen] = useState(false);
  let [eventId, setEventId] = useState(0);
  const dispatch = useDispatch();

  const updateCurrentSlide = (index) => {
    let currentSlide = currentSlide;

    if (currentSlide !== index) {
      setCurrentSlide( currentSlide = index);
    }
  }

  function handleClose() {
    setOpen(false);
    setEventId(0);
  }

  function handleOpen(eventId) {
    setEventId(eventId);
    setOpen(true);
  }

  const styles = useStyles();

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  const events = useSelector(state => state.eventReducer.detailedEvents);
  const [carouselItems, setCorouselItems] = useState([]);

  useEffect(() => {
    if (events.length > 0) {
      let newArray = [];
      
      let domain = location.hostname.toLowerCase().includes('localhost') ? 
        'http://localhost:5000': 'https://api.daca.org.ng';
  
      let number = 3;
      let lastNumber = 0;
      let condition = 0;
      let i = 0;
  
      while (condition < 1) {
        let newEvents = events.slice(lastNumber, number);
  
        newArray.push(
          <div key={i}>
            {
              newEvents.map((event, z) => {
                return (
                  <div className={styles.carouselItem} key={z}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={3}>
                        <img src={ `${domain}/${event.eventFileName.replace("\\", "/")}` } />
                      </Grid>
                      <Grid item xs={12} md={9} className="body">
                        <div>
                          <Typography variant="h5">
                            { event.eventTitle }
                          </Typography>
                          <div className="icons">
                            <span>
                              <DateRange />
                              <Typography variant="caption">
                                { moment(event.eventDate).format("MMMM do, yyyy") }
                              </Typography>
                            </span>
                            <span>
                              <WatchLater />
                              <Typography variant="caption">
                              { moment(event.eventDate).format("HH:MM") }
                              </Typography>
                            </span>
                            <span>
                              <LocationOn />
                              <Typography variant="caption">
                              { event.eventVenue }
                              </Typography>
                            </span>
                          </div>
                        </div>
                        <div className="caption">
                          <Typography variant="caption">
                            { event.eventDesc }
                          </Typography>
                        </div>
                        <div>
                          <Button variant="text" onClick={() => handleOpen(event.id)}>
                            Read More
                            <DoubleArrow />
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                )
              })
            }
            
          </div>
        );
        
        if (number > events.length - 1){
          ++condition;
          continue;
        }
  
        lastNumber = number;
        number += 3;
        i++;
  
      }
  
      setCorouselItems(newArray)
    }
  }, [events]);

  return (
    <div>
      <div className={styles.control}>
        <div>
          <TextInfoContent
            heading={'UPCOMING EVENTS'}
            body={
              'Be sure to visit our Upcoming Events page regularly to get information'
            }
          />
        </div>
        <div className="icons">
          <KeyboardArrowLeft  onClick={() => setCurrentSlide( currentSlide - 1)} />
          <KeyboardArrowRight onClick={() => setCurrentSlide( currentSlide + 1)} />
        </div>
      </div>

      <Container>
        <Carousel transitionTime={1000} interval={4000} infiniteLoop selectedItem={currentSlide} onChange={updateCurrentSlide} className={styles.carousel} stopOnHover={true}
          showThumbs={false} showStatus={false} showArrows={false} showIndicators={false} className={cx(styles.grid, 'upcomingCarousel')}>
          {carouselItems}
        </Carousel>
      </Container>
      
      <EventDialog handleClose={handleClose} open={open} eventId={eventId} />
    </div>
  );

}

export default WithExternalControlsv2
