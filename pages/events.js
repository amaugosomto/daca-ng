import React, {useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import HomeLayout from '../components/home/HomeLayout';
import CustomHead from '../components/HEAD/head'
import cx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment';

import { getEvents } from '../redux/actions/eventActions';
import { Grid, Typography, Container } from '@material-ui/core';
 
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
  root: {
    margin: 'auto',
    borderRadius: theme.spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    position: 'relative',
    maxWidth: 500,
    marginLeft: 'auto',
    overflow: 'initial',
    background: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingTop: theme.spacing(2),
    },
  },
  media: {
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing(-3),
    height: 0,
    paddingBottom: '48%',
    borderRadius: theme.spacing(2),
    backgroundColor: '#fff',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      width: '100%',
      marginLeft: theme.spacing(-3),
      marginTop: 0,
      transform: 'translateX(-8px)',
    },
    '&:after': {
      content: '" "',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: theme.spacing(2), // 16
      opacity: 0.5,
    },
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial',
  },
  button: {
    backgroundImage: `linear-gradient(147deg, #8a2be2 0%, ${$primaryColor} 74%)`,
    color: '#fff',

    '&:hover': {
      backgroundImage: `linear-gradient(147deg, #8a2be2 0%, ${$primaryColor} 74%)`
    }
  }
}));

function events() {
  let domain = process.env.NODE_ENV == 'development' ? 
    'http://localhost:5000': 'https://api.daca.org.ng';

  const classes = useStyles();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const {
    button: buttonStyles,
    ...contentStyles
  } = useBlogTextInfoContentStyles();
  const shadowStyles = useOverShadowStyles();

  React.useEffect(() => {
    window.scrollTo(0,0);
    dispatch(getEvents());
  }, []);

  const events = useSelector(state => state.eventReducer.detailedEvents);

  function cutText (text = "") {
    if (text.length < 101) 
      return text;

    
    let cuttedText = text.slice(0, 97);
    cuttedText += "...";
    return cuttedText;
  }

  return (
    <HomeLayout>
      <CustomHead 
        iosApplicationTitle="Daca-ng Events"
        title="Daca-ng - Events"
        robots="Events"
      />

      <main className={classes.main}>
        <div className={classes.banner}>
          <Container>
            <div className={classes.captions} >
              <Typography variant="h4" >
                Events
              </Typography>
            </div>
          </Container>
        </div>
      </main>

      <Container style={{marginBottom: '2rem'}}>
        <Grid container spacing={4}>
          {
            events.length < 1 ? 
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <Skeleton height="15rem" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Skeleton height="15rem" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Skeleton height="15rem" />
                </Grid>
              </> : 
              events.map(event => {
               return (
                  <Grid item xs={12} sm={6}>
                    <Card className={cx(classes.root, shadowStyles.root)}>
                      <CardMedia
                        className={classes.media}
                        image={
                          `${domain}/${event.eventFileName.replace("\\", "/")}`
                        }
                      />
                      <CardContent>
                        <TextInfoContent
                          classes={contentStyles}
                          overline={moment(event.eventDate).format("Do MMMM YYYY, HH:MM")}
                          heading={event.eventTitle}
                          body={
                            cutText(event.eventDesc)
                          }
                        />
                        <Button className={classes.button}>Read more</Button>
                      </CardContent>
                    </Card>
                  </Grid> 
                )
              })

          }
        </Grid>
      </Container>
    </HomeLayout>
  )
}

export default events
