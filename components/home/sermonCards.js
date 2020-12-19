import React from 'react';
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
import FileCopyRounded from '@material-ui/icons/FileCopyRounded'
import CloudDownloadRounded from '@material-ui/icons/CloudDownloadRounded';
import Person from '@material-ui/icons/Person';
import Category from '@material-ui/icons/Category';
import Watch from '@material-ui/icons/WatchLater';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';


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
        fontSize: '20px'
      }
    }
  },
  title: {
    textAlign: 'left',
    marginTop: '10px'
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
  }
}));

export const SermonCards = React.memo(function NewsCard() {
  const styles = useStyles();
  const mediaStyles = useWideCardMediaStyles();
  const textCardContentStyles = useN01TextInfoContentStyles();
  
  return (
    <div className={styles.cards}>
      <Grid container spacing={4}>
        <Grid item sm={12} md={4} className={styles.grid}>
          <Card className={cx(styles.root, styles.cardRoot)} >
            <CardMedia classes={mediaStyles} className={styles.image}
              image='/images/newWayOfLiving.jpg'
            />
            <CardContent className={styles.content}>
              <div className={cx(styles.logo, 'avartar', styles.avartar)} >
                <Typography variant="h5" className="avartar">
                  13
                </Typography>
                <Typography variant="h6"  className="avartar">
                  AUG
                </Typography>
              </div>

              <div className={styles.icons}>
                <Tooltip title="video" placement="top" aria-label="Video" className="toolIcon">
                  <Icon>
                    <VideocamRounded />
                  </Icon>
                </Tooltip>
                <Tooltip title="Audio" placement="top" aria-label="Audio" className="toolIcon">
                  <Icon>
                    <HeadsetMicRounded />
                  </Icon>
                </Tooltip>
                <Tooltip title="Docs" placement="top" aria-label="Docs" className="toolIcon">
                  <Icon>
                    <FileCopyRounded />
                  </Icon>
                </Tooltip>
                <Tooltip title="Download" placement="top" aria-label="Download" className="toolIcon">
                  <Icon>
                    <CloudDownloadRounded />
                  </Icon>
                </Tooltip>
              </div>

              <div className={styles.title}>
                <TextInfoContent
                  classes={textCardContentStyles}
                  heading={'Start a New Way of Living'}
                />
              </div>
              
              <Divider />

              <div className={styles.info}>
                <div>
                  <Icon>
                    <Person />
                  </Icon>
                  <Typography variant="caption" className="pTitle">
                    Sermon From: <span>Pst. Timothy Benedict</span>
                  </Typography>
                </div>
                <div>
                  <Icon>
                    <Category />
                  </Icon>
                  <Typography variant="caption" className="pTitle">
                    Category: <span>God, Pray</span>
                  </Typography>
                </div>
                <div>
                  <Icon>
                    <Watch />
                  </Icon>
                  <Typography variant="caption" className="pTitle">
                    August 10 0n: <span>9:00 am - 11:00 am</span>
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} md={4} className={styles.grid}>
          <Card className={cx(styles.root, styles.cardRoot)} >
            <CardMedia
              classes={mediaStyles}
              className={styles.image}
              image='/images/toBeSaved.jpg'
            />
            <CardContent className={styles.content}>
            <div className={cx(styles.logo, 'avartar', styles.avartar)} >
                <Typography variant="h5" className="avartar">
                  15
                </Typography>
                <Typography variant="h6"  className="avartar">
                  AUG
                </Typography>
              </div>

              <div className={styles.icons}>
                <Tooltip title="video" placement="top" aria-label="Video" className="toolIcon">
                  <Icon>
                    <VideocamRounded />
                  </Icon>
                </Tooltip>
                <Tooltip title="Audio" placement="top" aria-label="Audio" className="toolIcon">
                  <Icon>
                    <HeadsetMicRounded />
                  </Icon>
                </Tooltip>
                <Tooltip title="Docs" placement="top" aria-label="Docs" className="toolIcon">
                  <Icon>
                    <FileCopyRounded />
                  </Icon>
                </Tooltip>
                <Tooltip title="Download" placement="top" aria-label="Download" className="toolIcon">
                  <Icon>
                    <CloudDownloadRounded />
                  </Icon>
                </Tooltip>
              </div>

              <div className={styles.title}>
                <TextInfoContent
                  classes={textCardContentStyles}
                  heading={'What Must I do to be Saved'}
                />
              </div>
              
              <Divider />

              <div className={styles.info}>
                <div>
                  <Icon>
                    <Person />
                  </Icon>
                  <Typography variant="caption" className="pTitle">
                    Sermon From: <span>Pst. Lilian Benedict</span>
                  </Typography>
                </div>
                <div>
                  <Icon>
                    <Category />
                  </Icon>
                  <Typography variant="caption" className="pTitle">
                    Category: <span>God, Pray</span>
                  </Typography>
                </div>
                <div>
                  <Icon>
                    <Watch />
                  </Icon>
                  <Typography variant="caption" className="pTitle">
                    August 15 0n: <span>10:00 am - 05:00 pm</span>
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} md={4} className={styles.grid}>
          <Card className={cx(styles.root, styles.cardRoot)} >
            <CardMedia
              classes={mediaStyles}
              className={styles.image}
              image='/images/theSecondComing.jpg'
            />
            <CardContent className={styles.content}>
            <div className={cx(styles.logo, 'avartar', styles.avartar)} >
                <Typography variant="h5" className="avartar">
                  30
                </Typography>
                <Typography variant="h6"  className="avartar">
                  AUG
                </Typography>
              </div>

              <div className={styles.icons}>
                <Tooltip title="video" placement="top" aria-label="Video" className="toolIcon">
                  <Icon>
                    <VideocamRounded />
                  </Icon>
                </Tooltip>
                <Tooltip title="Audio" placement="top" aria-label="Audio" className="toolIcon">
                  <Icon>
                    <HeadsetMicRounded />
                  </Icon>
                </Tooltip>
                <Tooltip title="Docs" placement="top" aria-label="Docs" className="toolIcon">
                  <Icon>
                    <FileCopyRounded />
                  </Icon>
                </Tooltip>
                <Tooltip title="Download" placement="top" aria-label="Download" className="toolIcon">
                  <Icon>
                    <CloudDownloadRounded />
                  </Icon>
                </Tooltip>
              </div>

              <div className={styles.title}>
                <TextInfoContent
                  classes={textCardContentStyles}
                  heading={'The Second Coming of Christ'}
                />
              </div>
              
              <Divider />

              <div className={styles.info}>
                <div>
                  <Icon>
                    <Person />
                  </Icon>
                  <Typography variant="caption" className="pTitle">
                    Sermon From: <span>Pst. Chigozie Onuoha</span>
                  </Typography>
                </div>
                <div>
                  <Icon>
                    <Category />
                  </Icon>
                  <Typography variant="caption" className="pTitle">
                    Category: <span>God, Pray</span>
                  </Typography>
                </div>
                <div>
                  <Icon>
                    <Watch />
                  </Icon>
                  <Typography variant="caption" className="pTitle">
                    August 30 0n: <span>12:00 pm - 04:00 pm</span>
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
    
  );
});

export default SermonCards