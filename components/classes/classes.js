import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Button, CardContent, CardMedia, Typography } from '@material-ui/core';
import Skeleton from 'react-loading-skeleton';

import api from '../../middlewares/axiosConfig';

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
  
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClassesByTypeId();
  }, [props.classType]);

  const getClassesByTypeId = async () => {
    let classesResponse = await api.get("/classes/getAllClassByTypeId/" + props.classType)
      .then(res => res)    
      .catch(() => props.handleClose);

    let classes = classesResponse.data.data;
    setClasses(classes);
    setLoading(false);
  }

  return (
    <div>
      {loading ? 
        <Skeleton count={5} height={60} />
        :
        classes.length > 0 ? 
          classes.map(Class => {
            return(
            <Card className={styles.root} raised={true}>
              <div className={styles.details}>
                <CardContent className={styles.content}>
                  <Typography component="h5" variant="h5">
                    {Class.classTitle}
                  </Typography>
                  <Button size="small" variant="contained" className={styles.button} onClick={() => props.openClassRoom(Class.id)}>
                    Start class
                  </Button>
                </CardContent>
              </div>
              <CardMedia
                className={styles.cover}
                image="/images/events2.jpg"
                title="Live from space album cover"
              />
            </Card>)
          })
          :
          <Card className={styles.root} raised={true}>
            <div className={styles.details}>
              <CardContent className={styles.content}>
                <Typography component="h5" variant="h5">
                  No classes
                </Typography>
              </CardContent>
            </div>
          </Card>
      }
    </div>
  )
}

export default advancedClasses
