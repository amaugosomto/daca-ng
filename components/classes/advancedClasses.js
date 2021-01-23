import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Button, CardContent, CardMedia, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => {
  const family =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  return {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '.8rem 0'
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
        marginLeft: '.4ren'
      },

      '&:hover': {
        background: '#6D0EB5',
        color: '#fff',
      }
      
    }
  }
});

function advancedClasses(props) {
  const styles = useStyles();
  
  return (
    <div>
      <Card className={styles.root} raised={true}>
        <div className={styles.details}>
          <CardContent className={styles.content}>
            <Typography component="h5" variant="h5">
              Introduction to Kingdomship part 1
            </Typography>
            <Button size="small" variant="contained" className={styles.button} onClick={() => props.openClassRoom(1)}>
              Start class
            </Button>
          </CardContent>
        </div>
        <CardMedia
          className={styles.cover}
          image="/images/events1.jpg"
          title="Live from space album cover"
        />
      </Card>
      <Card className={styles.root} raised={true}>
        <div className={styles.details}>
          <CardContent className={styles.content}>
            <Typography component="h5" variant="h5">
            Introduction to Kingdomship part 2
            </Typography>
            <Button size="small" variant="contained" className={styles.button} onClick={() => props.openClassRoom(1)}>
              Start class
            </Button>
          </CardContent>
        </div>
        <CardMedia
          className={styles.cover}
          image="/images/events2.jpg"
          title="Live from space album cover"
        />
      </Card>
      <Card className={styles.root} raised={true}>
        <div className={styles.details}>
          <CardContent className={styles.content}>
            <Typography component="h5" variant="h5">
            Introduction to Kingdomship part 3
            </Typography>
            <Button size="small" variant="contained" className={styles.button} onClick={() => props.openClassRoom(1)}>
              Start class
            </Button>
          </CardContent>
        </div>
        <CardMedia
          className={styles.cover}
          image="/images/newWayOfLiving.jpg"
          title="Live from space album cover"
        />
      </Card>
      <Card className={styles.root} raised={true}>
        <div className={styles.details}>
          <CardContent className={styles.content}>
            <Typography component="h5" variant="h5">
            Introduction to Kingdomship part 4
            </Typography>
            <Button size="small" variant="contained" className={styles.button} onClick={() => props.openClassRoom(1)}>
              Start class
            </Button>
          </CardContent>
        </div>
        <CardMedia
          className={styles.cover}
          image="/images/event3.jpg"
          title="Live from space album cover"
        />
      </Card>
      <Card className={styles.root} raised={true}>
        <div className={styles.details}>
          <CardContent className={styles.content}>
            <Typography component="h5" variant="h5">
            Introduction to Kingdomship part 5
            </Typography>
            <Button size="small" variant="contained" className={styles.button} onClick={() => props.openClassRoom(1)}>
              Start class
            </Button>
          </CardContent>
        </div>
        <CardMedia
          className={styles.cover}
          image="/images/toBeSaved.jpg"
          title="Live from space album cover"
        />
      </Card>
      <Card className={styles.root} raised={true}>
        <div className={styles.details}>
          <CardContent className={styles.content}>
            <Typography component="h5" variant="h5">
            Introduction to Kingdomship part 6
            </Typography>
            <Button size="small" variant="contained" className={styles.button} onClick={() => props.openClassRoom(1)}>
              Start class
            </Button>
          </CardContent>
        </div>
        <CardMedia
          className={styles.cover}
          image="/images/theSecondComing.jpg"
          title="Live from space album cover"
        />
      </Card>
    </div>
  )
}

export default advancedClasses
