import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ChevronRightRounded from '@material-ui/icons/ChevronRightRounded';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import { useN01TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n01';
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(({breakpoints}) => ({
  root: {
    margin: 'auto',
    boxShadow: 'none',
    borderRadius: '10px',
  },
  content: {
    padding: 24,
  },
  cta: {
    marginTop: 24,
    textTransform: 'initial',
  },
  cards: {
    marginTop: "30px"
  },
  grid: {
    width: '100%',
    [breakpoints.down('md')]:{
      padding: '0 25px !important',
      marginTop: '30px'
    }
  }
}));

export const WelcomeCards = React.memo(function NewsCard() {
  const styles = useStyles();
  const mediaStyles = useWideCardMediaStyles();
  const textCardContentStyles = useN01TextInfoContentStyles();
  const shadowStyles = useBouncyShadowStyles();
  return (
    <div className={styles.cards}>
      <Grid container spacing={4}>
        <Grid item sm={12} md={4} className={styles.grid}>
          <Card className={cx(styles.root, shadowStyles.root)}>
            <CardMedia
              classes={mediaStyles}
              image={
                '/images/church.jpg'
              }
            />
            <CardContent className={styles.content}>
              <TextInfoContent
                classes={textCardContentStyles}
                heading={'Our Church'}
                body={
                  'We’re mandated to raise people that are spiritually vibrant,financially stable and socially responsible.'
                }
              />
              <Button color={'primary'} fullWidth className={styles.cta}>
                Find Out More <ChevronRightRounded />
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} md={4} className={styles.grid}>
          <Card className={cx(styles.root, shadowStyles.root)}>
            <CardMedia
              classes={mediaStyles}
              image={
                '/images/history.jpg'
              }
            />
            <CardContent className={styles.content}>
              <TextInfoContent
                classes={textCardContentStyles}
                heading={'Our Mission'}
                body={
                  'We are committed to helping you develop a buoyant spiritual relationship with God.'
                }
              />
              <Button color={'primary'} fullWidth className={styles.cta}>
                Find Out More <ChevronRightRounded />
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} md={4} className={styles.grid}>
          <Card className={cx(styles.root, shadowStyles.root)}>
            <CardMedia
              classes={mediaStyles}
              image={
                '/images/sermon.jpg'
              }
            />
            <CardContent className={styles.content}>
              <TextInfoContent
                classes={textCardContentStyles}
                heading={'Core Values'}
                body={
                  'To model the nature of God which is love and a culture of excellence while delivering selfless service.'
                }
              />
              <Button color={'primary'} fullWidth className={styles.cta}>
                Find Out More <ChevronRightRounded />
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
    
  );
});

export default WelcomeCards