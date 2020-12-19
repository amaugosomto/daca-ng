import React, {Component, useState} from 'react';
import { Carousel } from 'react-responsive-carousel';
import Container from '@material-ui/core/Container';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { makeStyles } from '@material-ui/core/styles';
import { DateRange, KeyboardArrowLeft, KeyboardArrowRight, LocationOn, WatchLater, DoubleArrow } from '@material-ui/icons';
import Color from 'color';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

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
    padding: '0 100px',
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
  
    '& svg': {
      fontSize: '50px',
      color:'rgb(219, 214, 214)',
      cursor: 'pointer',
  
      '&:hover': {
        color: '#fff'
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
        fontSize: '1.6rem'
      },

      '& .icons': {
        display: 'flex',

        '& span': {
          display: 'flex',
          alignItems: 'center',

          '& span': {
            color: Color($lightGrey).lighten(0.3).toString(),
            fontSize: '.9rem',
            fontStyle: 'italic'
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
        [breakpoints.down('sm')]: {
          fontSize: '1.1rem'
        }
      },

      '& .caption': {
        [breakpoints.down('sm')]: {
          margin: '15px 0'
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
        [breakpoints.down('sm')]: {
          fontSize: '1rem'
        }
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
          fontSize: '1.3rem',
          padding: '10px 35px'
        }
      }
    }
  },
  grid: {
    [breakpoints.down('sm')]: {
      padding: '0 25px !important',
      marginTop: '20px',

      '& img': {
        height: '300px'
      }
    }
  }
}));

function WithExternalControlsv2() {
  let [currentSlide, setCurrentSlide] = useState(0);

  const updateCurrentSlide = (index) => {
    let currentSlide = currentSlide;

    if (currentSlide !== index) {
      setCurrentSlide( currentSlide = index);
    }
  }

  const styles = useStyles();

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
        <div>
          <KeyboardArrowLeft  onClick={() => setCurrentSlide( currentSlide - 1)} />
          <KeyboardArrowRight onClick={() => setCurrentSlide( currentSlide + 1)} />
        </div>
      </div>

      <Container>
        <Carousel transitionTime={1000} interval={4000} infiniteLoop selectedItem={currentSlide} onChange={updateCurrentSlide} className={styles.carousel} stopOnHover={true}
          showThumbs={false} showStatus={false} showArrows={false} showIndicators={false} className={styles.grid}>
          <div>
            <div className={styles.carouselItem}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <img src="/images/DACA-2.jpg" />
                </Grid>
                <Grid item xs={12} md={7} className="body">
                  <div>
                    <Typography variant="h5">
                      Seeing and Savoring Christ
                    </Typography>
                    <div className="icons">
                      <span>
                        <DateRange />
                        <Typography variant="caption">
                          March 01, 2020
                        </Typography>
                      </span>
                      <span>
                        <WatchLater />
                        <Typography variant="caption">
                          10:00 - 11:00
                        </Typography>
                      </span>
                      <span>
                        <LocationOn />
                        <Typography variant="caption">
                          210 Okigwe Road
                        </Typography>
                      </span>
                    </div>
                  </div>
                  <div className="caption">
                    <Typography variant="caption">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ea, possimus sapiente voluptatum esse sequi consequatur beatae. Deleniti, eos quas?
                    </Typography>
                  </div>
                  <div>
                    <Button variant="text">
                      Read More
                      <DoubleArrow />
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12} md={2} className="findMore">
                  <Button variant="contained">
                    Find Out More
                  </Button>
                </Grid>
              </Grid>
            </div>
            <div className={styles.carouselItem}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <img src="/images/DACA-4.jpg" />
                </Grid>
                <Grid item xs={12} md={7} className="body">
                  <div>
                    <Typography variant="h5">
                      A God-Entranced Vision of All Things
                    </Typography>
                    <div className="icons">
                      <span>
                        <DateRange />
                        <Typography variant="caption">
                          March 15, 2020
                        </Typography>
                      </span>
                      <span>
                        <WatchLater />
                        <Typography variant="caption">
                          12:00 - 04:00
                        </Typography>
                      </span>
                      <span>
                        <LocationOn />
                        <Typography variant="caption">
                          210 Okigwe Road
                        </Typography>
                      </span>
                    </div>
                  </div>
                  <div className="caption">
                    <Typography variant="caption">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ea, possimus sapiente voluptatum esse sequi consequatur beatae. Deleniti, eos quas?
                    </Typography>
                  </div>
                  <div>
                    <Button variant="text">
                      Read More
                      <DoubleArrow />
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12} md={2} className="findMore">
                  <Button variant="contained">
                    Find Out More
                  </Button>
                </Grid>
              </Grid>
            </div>
            <div className={styles.carouselItem}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <img src="/images/DACA-6.jpg" />
                </Grid>
                <Grid item xs={12} md={7} className="body">
                  <div>
                    <Typography variant="h5">
                      A Holy Spirit Filled Life
                    </Typography>
                    <div className="icons">
                      <span>
                        <DateRange />
                        <Typography variant="caption">
                          March 01, 2018
                        </Typography>
                      </span>
                      <span>
                        <WatchLater />
                        <Typography variant="caption">
                          10:00 - 11:00
                        </Typography>
                      </span>
                      <span>
                        <LocationOn />
                        <Typography variant="caption">
                          210 Okigwe Road
                        </Typography>
                      </span>
                    </div>
                  </div>
                  <div className="caption">
                    <Typography variant="caption">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ea, possimus sapiente voluptatum esse sequi consequatur beatae. Deleniti, eos quas?
                    </Typography>
                  </div>
                  <div>
                    <Button variant="text">
                      Read More
                      <DoubleArrow />
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12} md={2} className="findMore">
                  <Button variant="contained">
                    Find Out More
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
          <div>
            <div className={styles.carouselItem}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <img src="/images/DACA-2.jpg" />
                </Grid>
                <Grid item xs={12} md={7} className="body">
                  <div>
                    <Typography variant="h5">
                      Seeing and Savoring Christ
                    </Typography>
                    <div className="icons">
                      <span>
                        <DateRange />
                        <Typography variant="caption">
                          March 01, 2020
                        </Typography>
                      </span>
                      <span>
                        <WatchLater />
                        <Typography variant="caption">
                          10:00 - 11:00
                        </Typography>
                      </span>
                      <span>
                        <LocationOn />
                        <Typography variant="caption">
                          210 Okigwe Road
                        </Typography>
                      </span>
                    </div>
                  </div>
                  <div className="caption">
                    <Typography variant="caption">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ea, possimus sapiente voluptatum esse sequi consequatur beatae. Deleniti, eos quas?
                    </Typography>
                  </div>
                  <div>
                    <Button variant="text">
                      Read More
                      <DoubleArrow />
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12} md={2} className="findMore">
                  <Button variant="contained">
                    Find Out More
                  </Button>
                </Grid>
              </Grid>
            </div>
            <div className={styles.carouselItem}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <img src="/images/DACA-4.jpg" />
                </Grid>
                <Grid item xs={12} md={7} className="body">
                  <div>
                    <Typography variant="h5">
                      A God-Entranced Vision of All Things
                    </Typography>
                    <div className="icons">
                      <span>
                        <DateRange />
                        <Typography variant="caption">
                          March 15, 2020
                        </Typography>
                      </span>
                      <span>
                        <WatchLater />
                        <Typography variant="caption">
                          12:00 - 04:00
                        </Typography>
                      </span>
                      <span>
                        <LocationOn />
                        <Typography variant="caption">
                          210 Okigwe Road
                        </Typography>
                      </span>
                    </div>
                  </div>
                  <div className="caption">
                    <Typography variant="caption">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ea, possimus sapiente voluptatum esse sequi consequatur beatae. Deleniti, eos quas?
                    </Typography>
                  </div>
                  <div>
                    <Button variant="text">
                      Read More
                      <DoubleArrow />
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12} md={2} className="findMore">
                  <Button variant="contained">
                    Find Out More
                  </Button>
                </Grid>
              </Grid>
            </div>
            <div className={styles.carouselItem}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <img src="/images/DACA-6.jpg" />
                </Grid>
                <Grid item xs={12} md={7} className="body">
                  <div>
                    <Typography variant="h5">
                      A Holy Spirit Filled Life
                    </Typography>
                    <div className="icons">
                      <span>
                        <DateRange />
                        <Typography variant="caption">
                          March 01, 2018
                        </Typography>
                      </span>
                      <span>
                        <WatchLater />
                        <Typography variant="caption">
                          10:00 - 11:00
                        </Typography>
                      </span>
                      <span>
                        <LocationOn />
                        <Typography variant="caption">
                          210 Okigwe Road
                        </Typography>
                      </span>
                    </div>
                  </div>
                  <div className="caption">
                    <Typography variant="caption">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ea, possimus sapiente voluptatum esse sequi consequatur beatae. Deleniti, eos quas?
                    </Typography>
                  </div>
                  <div>
                    <Button variant="text">
                      Read More
                      <DoubleArrow />
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12} md={2} className="findMore">
                  <Button variant="contained">
                    Find Out More
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
          <div>
            <div className={styles.carouselItem}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <img src="/images/DACA-2.jpg" />
                </Grid>
                <Grid item xs={12} md={7} className="body">
                  <div>
                    <Typography variant="h5">
                      Seeing and Savoring Christ
                    </Typography>
                    <div className="icons">
                      <span>
                        <DateRange />
                        <Typography variant="caption">
                          March 01, 2020
                        </Typography>
                      </span>
                      <span>
                        <WatchLater />
                        <Typography variant="caption">
                          10:00 - 11:00
                        </Typography>
                      </span>
                      <span>
                        <LocationOn />
                        <Typography variant="caption">
                          210 Okigwe Road
                        </Typography>
                      </span>
                    </div>
                  </div>
                  <div className="caption">
                    <Typography variant="caption">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ea, possimus sapiente voluptatum esse sequi consequatur beatae. Deleniti, eos quas?
                    </Typography>
                  </div>
                  <div>
                    <Button variant="text">
                      Read More
                      <DoubleArrow />
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12} md={2} className="findMore">
                  <Button variant="contained">
                    Find Out More
                  </Button>
                </Grid>
              </Grid>
            </div>
            <div className={styles.carouselItem}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <img src="/images/DACA-4.jpg" />
                </Grid>
                <Grid item xs={12} md={7} className="body">
                  <div>
                    <Typography variant="h5">
                      A God-Entranced Vision of All Things
                    </Typography>
                    <div className="icons">
                      <span>
                        <DateRange />
                        <Typography variant="caption">
                          March 15, 2020
                        </Typography>
                      </span>
                      <span>
                        <WatchLater />
                        <Typography variant="caption">
                          12:00 - 04:00
                        </Typography>
                      </span>
                      <span>
                        <LocationOn />
                        <Typography variant="caption">
                          210 Okigwe Road
                        </Typography>
                      </span>
                    </div>
                  </div>
                  <div className="caption">
                    <Typography variant="caption">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ea, possimus sapiente voluptatum esse sequi consequatur beatae. Deleniti, eos quas?
                    </Typography>
                  </div>
                  <div>
                    <Button variant="text">
                      Read More
                      <DoubleArrow />
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12} md={2} className="findMore">
                  <Button variant="contained">
                    Find Out More
                  </Button>
                </Grid>
              </Grid>
            </div>
            <div className={styles.carouselItem}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                  <img src="/images/DACA-6.jpg" />
                </Grid>
                <Grid item xs={12} md={7} className="body">
                  <div>
                    <Typography variant="h5">
                      A Holy Spirit Filled Life
                    </Typography>
                    <div className="icons">
                      <span>
                        <DateRange />
                        <Typography variant="caption">
                          March 01, 2018
                        </Typography>
                      </span>
                      <span>
                        <WatchLater />
                        <Typography variant="caption">
                          10:00 - 11:00
                        </Typography>
                      </span>
                      <span>
                        <LocationOn />
                        <Typography variant="caption">
                          210 Okigwe Road
                        </Typography>
                      </span>
                    </div>
                  </div>
                  <div className="caption">
                    <Typography variant="caption">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt ea, possimus sapiente voluptatum esse sequi consequatur beatae. Deleniti, eos quas?
                    </Typography>
                  </div>
                  <div>
                    <Button variant="text">
                      Read More
                      <DoubleArrow />
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12} md={2} className="findMore">
                  <Button variant="contained">
                    Find Out More
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </Carousel>
      </Container>
      
    </div>
  );

}

export default WithExternalControlsv2
