import React, {useEffect} from 'react';
import Head from 'next/head';
import NoSsr from '@material-ui/core/NoSsr';
import GoogleFontLoader from 'react-google-font-loader';
import componentStyles from '../../styles/classesStyles';
import {Container, Typography, Button, Grid} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import HomeLayout from '../../components/home/HomeLayout';
import { makeStyles } from '@material-ui/core/styles';
import { Row, Item } from '@mui-treasury/components/flex';
import { Info, InfoSubtitle, InfoTitle } from '@mui-treasury/components/info';
import { useNewsInfoStyles } from '@mui-treasury/styles/info/news';
import Modal from '../../components/classes/sneakModal';

import {connect} from 'react-redux';
import {reintialiseState} from '../../redux/actions/authActions';

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 320,
    margin: '0 2rem',
    position: 'relative',
    boxShadow: '0 8px 24px 0 rgba(0,0,0,0.12)',
    overflow: 'visible',
    borderRadius: '1.5rem',
    transition: '0.4s',
    '&:hover': {
      transform: 'translateY(-2px)',
      '& $shadow': {
        bottom: '-1.5rem',
      },
      '& $shadow2': {
        bottom: '-2.5rem',
      },
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      zIndex: 0,
      display: 'block',
      width: '100%',
      bottom: -1,
      height: '100%',
      borderRadius: '1.5rem',
      backgroundColor: 'rgba(0,0,0,0.08)',
    },
  },
  main: {
    overflow: 'hidden',
    borderTopLeftRadius: '1.5rem',
    borderTopRightRadius: '1.5rem',
    zIndex: 1,
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      display: 'block',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(to top, #014a7d, rgba(0,0,0,0))',
    },
  },
  content: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
    padding: '1.5rem 1.5rem 1rem',
  },
  avatar: {
    width: 48,
    height: 48,
  },
  tag: {
    display: 'inline-block',
    fontFamily: "'Sen', sans-serif",
    backgroundColor: '#ff5dac',
    borderRadius: '0.5rem',
    padding: '2px 0.5rem',
    color: '#fff',
    marginBottom: '0.5rem',
  },
  title: {
    fontFamily: "'Sen', sans-serif",
    fontSize: '2rem',
    fontWeight: 800,
    color: '#fff',
  },
  author: {
    zIndex: 1,
    position: 'relative',
    borderBottomLeftRadius: '1.5rem',
    borderBottomRightRadius: '1.5rem',
  },
  shadow: {
    transition: '0.2s',
    position: 'absolute',
    zIndex: 0,
    width: '88%',
    height: '100%',
    bottom: 0,
    borderRadius: '1.5rem',
    backgroundColor: 'rgba(0,0,0,0.06)',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  shadow2: {
    bottom: 0,
    width: '72%',
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  Button: {
    color: '#fff',
    background: "#6D0EB5",
    marginTop: '1rem',

    '&:hover' :{
      background: "#6D0EB5 !important"
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

function Classes(props){
  const styles = componentStyles();
  const cardStyles = useStyles();

  const mediaStyles = useWideCardMediaStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");

  const handleOpen = (state) => {
    state == "basic" ? setTitle("Basic Classes") : setTitle("Advanced Classes");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    props.reintialiseState();
  }, []);

  return (
    <HomeLayout>
    <div>
      <Head>
        <title>Daca-ng - Classes</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="copyright" content="Classes page for taking online classes and exams" />
        <meta name="description" content="To model the nature of God(love) and a culture of excellence while delivering selfless service" />
        <meta name="robots" content="Classes"></meta>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet"></link>
      </Head>

      <main className={styles.main}>
        <div className={styles.banner}>
          <Container>
            <div className={styles.captions} >
              <Typography variant="h4" >
                Welcome, <span className={styles.username}>{ Object.keys(props.user).length > 0 ? props.user.name : 'visitor' }</span>
              </Typography>
              <Typography variant="caption" className="spanCaption">
                Introduction Classes meant to prepare you for being a better Christain.
              </Typography>
              <Button variant="contained" onClick={() => handleOpen("basic")}>
                Start learning
              </Button>
            </div>
          </Container>
        </div>

        <Container className={styles.classes}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <>
                <NoSsr>
                  <GoogleFontLoader fonts={[{ font: 'Sen', weights: [400, 800] }]} />
                </NoSsr>
                <Card className={cardStyles.card}>
                  <Box className={cardStyles.main} minHeight={300} position={'relative'}>
                    <CardMedia
                      classes={mediaStyles}
                      image={
                        'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'
                      }
                    />
                    <div className={cardStyles.content}>
                      <div className={cardStyles.tag}>Beginner Classes</div>
                      <Typography variant={'h2'} className={cardStyles.title}>
                        Beginner Classes are meant to prepare you for a life with Christ
                      </Typography>
                      <Button variant="contained" className={cardStyles.Button} onClick={() => handleOpen("basic")}>
                        start learning
                      </Button>
                    </div>
                  </Box>
                  <Row
                    className={cardStyles.author}
                    m={0}
                    p={3}
                    pt={2}
                    gap={2}
                    bgcolor={'common.white'}
                  >
                    <Item>
                      <Avatar
                        className={cardStyles.avatar}
                        src={'https://i.pravatar.cc/300?img=13'}
                      />
                    </Item>
                    <Info position={'middle'} useStyles={useNewsInfoStyles}>
                      <InfoTitle>Pastor Chigozie Onii</InfoTitle>
                      <InfoSubtitle>Junior Pastor | Youth Pastor</InfoSubtitle>
                      <InfoSubtitle>10 Min Read | 6 classes</InfoSubtitle>
                    </Info>
                  </Row>
                  <div className={cardStyles.shadow} />
                  <div className={`${cardStyles.shadow} ${cardStyles.shadow2}`} />
                </Card>
              </>
            </Grid>
            <Grid item xs={12} sm={6}>
              <>
                <NoSsr>
                  <GoogleFontLoader fonts={[{ font: 'Sen', weights: [400, 800] }]} />
                </NoSsr>
                <Card className={cardStyles.card}>
                  <Box className={cardStyles.main} minHeight={300} position={'relative'}>
                    <CardMedia
                      classes={mediaStyles}
                      image={
                        'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80'
                      }
                    />
                    <div className={cardStyles.content}>
                      <div className={cardStyles.tag}>Advanced Classes</div>
                      <Typography variant={'h2'} className={cardStyles.title}>
                        Advanced classes meant to deepen your understanding of the kingdom
                      </Typography>
                      <Button variant="contained" className={cardStyles.Button} onClick={() => handleOpen("advanced")}>
                        start learning
                      </Button>
                    </div>
                  </Box>
                  <Row
                    className={cardStyles.author}
                    m={0}
                    p={3}
                    pt={2}
                    gap={2}
                    bgcolor={'common.white'}
                  >
                    <Item>
                      <Avatar
                        className={cardStyles.avatar}
                        src={'https://i.pravatar.cc/300?img=14'}
                      />
                    </Item>
                    <Info position={'middle'} useStyles={useNewsInfoStyles}>
                      <InfoTitle>Pastor Timothy Benedict</InfoTitle>
                      <InfoSubtitle>Senior Pastor</InfoSubtitle>
                      <InfoSubtitle>15 Min Read | 6 classes</InfoSubtitle>
                    </Info>
                  </Row>
                  <div className={cardStyles.shadow} />
                  <div className={`${cardStyles.shadow} ${cardStyles.shadow2}`} />
                </Card>
              </>
            </Grid>
          </Grid>
          <Modal open={open} handleClose={handleClose} title={title} />
        </Container>
      </main>
    </div>
    </HomeLayout>
  );
}

const mapStateToProps = state => ({
  user: state.authPage.user
});

const mapDispatchToProps = {
  reintialiseState
}

export default connect(mapStateToProps, mapDispatchToProps)(Classes);