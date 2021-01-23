import React from 'react';
import useStyles from '../../styles/classesStyles';
import {Container, Typography, Button, Grid, Tooltip} from '@material-ui/core';
import cx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { useWideCardMediaStyles } from '@mui-treasury/styles/cardMedia/wide';
import { useN01TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n01';
import { useBouncyShadowStyles } from '@mui-treasury/styles/shadow/bouncy';
import IconButton from '@material-ui/core/IconButton';
import { ChevronRightRounded, CloudDownload, Description, MusicNote, Videocam } from '@material-ui/icons';
import TextInfoContent from '@mui-treasury/components/content/textInfo/TextInfoContent';
import HomeLayout from '../../components/home/HomeLayout';

import { connect } from 'react-redux';

export const part1 = (props) => {
  return (
    <div>
      <Grid container className={styles.gridContainer}>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={cx(styles.root, shadowStyles.root)}>
                <CardMedia
                  classes={mediaStyles}
                  image={
                    '/images/DACA-1.jpg'
                  }
                />
                <CardContent className={styles.content}>
                  <Typography variant='h6'>
                    Lesson 1
                  </Typography>
                  <TextInfoContent
                    classes={textCardContentStyles}
                    heading={'Introduction to Christianity'}
                    body={
                      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
                    }
                  />
                  <div className={styles.icons}>
                    <Tooltip title="Video">
                      <IconButton aria-label="Video">
                        <Videocam />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Document">
                      <IconButton aria-label="Document">
                        <Description />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Audio">
                      <IconButton aria-label="Audio">
                        <MusicNote />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                      <IconButton aria-label="Download">
                        <CloudDownload />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <Button color={'primary'} fullWidth className={styles.cta}>
                    Start Lesson <ChevronRightRounded />
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={cx(styles.root, shadowStyles.root)}>
                <CardMedia
                  classes={mediaStyles}
                  image={
                    '/images/DACA-2.jpg'
                  }
                />
                <CardContent className={styles.content}>
                  <Typography variant='h6'>
                    Lesson 2
                  </Typography>
                  <TextInfoContent
                    classes={textCardContentStyles}
                    heading={'Introduction to Christianity Part 2'}
                    body={
                      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
                    }
                  />
                  <div className={styles.icons}>
                    <Tooltip title="Document">
                      <IconButton aria-label="Document">
                        <Description />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Audio">
                      <IconButton aria-label="Audio">
                        <MusicNote />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                      <IconButton aria-label="Download">
                        <CloudDownload />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <Button color={'primary'} fullWidth className={styles.cta}>
                    Start Lesson <ChevronRightRounded />
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={cx(styles.root, shadowStyles.root)}>
                <CardMedia
                  classes={mediaStyles}
                  image={
                    '/images/DACA-3.jpg'
                  }
                />
                <CardContent className={styles.content}>
                  <Typography variant='h6'>
                    Lesson 3
                  </Typography>
                  <TextInfoContent
                    classes={textCardContentStyles}
                    heading={'Introduction to Christianity Part 3'}
                    body={
                      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
                    }
                  />
                <div className={styles.icons}>
                    <Tooltip title="Document">
                      <IconButton aria-label="Document">
                        <Description />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                      <IconButton aria-label="Download">
                        <CloudDownload />
                      </IconButton>
                    </Tooltip>
                </div>
                  <Button color={'primary'} fullWidth className={styles.cta}>
                    Start Lesson <ChevronRightRounded />
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={cx(styles.root, shadowStyles.root)}>
                <CardMedia
                  classes={mediaStyles}
                  image={
                    '/images/DACA-4.jpg'
                  }
                />
                <CardContent className={styles.content}>
                  <Typography variant='h6'>
                    Lesson 4
                  </Typography>
                  <TextInfoContent
                    classes={textCardContentStyles}
                    heading={'Introduction to Christianity Part 4'}
                    body={
                      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
                    }
                  />
                <div className={styles.icons}>
                  <Tooltip title="Video">
                      <IconButton aria-label="Video">
                        <Videocam />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Document">
                      <IconButton aria-label="Document">
                        <Description />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                      <IconButton aria-label="Download">
                        <CloudDownload />
                      </IconButton>
                    </Tooltip>
                </div>
                  <Button color={'primary'} fullWidth className={styles.cta}>
                    Start Lesson <ChevronRightRounded />
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={cx(styles.root, shadowStyles.root)}>
                <CardMedia
                  classes={mediaStyles}
                  image={
                    '/images/DACA-5.jpg'
                  }
                />
                <CardContent className={styles.content}>
                  <Typography variant='h6'>
                    Lesson 5
                  </Typography>
                  <TextInfoContent
                    classes={textCardContentStyles}
                    heading={'Introduction to Christianity Part 5'}
                    body={
                      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
                    }
                  />
                <div className={styles.icons}>
                  <Tooltip title="Video">
                      <IconButton aria-label="Video">
                        <Videocam />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Audio">
                      <IconButton aria-label="Audio">
                        <MusicNote />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                      <IconButton aria-label="Download">
                        <CloudDownload />
                      </IconButton>
                    </Tooltip>
                </div>
                  <Button color={'primary'} fullWidth className={styles.cta}>
                    Start Lesson <ChevronRightRounded />
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={cx(styles.root, shadowStyles.root)}>
                <CardMedia
                  classes={mediaStyles}
                  image={
                    '/images/DACA-6.jpg'
                  }
                />
                <CardContent className={styles.content}>
                  <Typography variant='h6'>
                    Lesson 6
                  </Typography>
                  <TextInfoContent
                    classes={textCardContentStyles}
                    heading={'Introduction to Christianity Part 6'}
                    body={
                      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
                    }
                  />
                <div className={styles.icons}>
                    <Tooltip title="Video">
                      <IconButton aria-label="Video">
                        <Videocam />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Document">
                      <IconButton aria-label="Document">
                        <Description />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Audio">
                      <IconButton aria-label="Audio">
                        <MusicNote />
                      </IconButton>
                    </Tooltip>
                </div>
                  <Button color={'primary'} fullWidth className={styles.cta}>
                    Start Lesson <ChevronRightRounded />
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={cx(styles.root, shadowStyles.root)}>
                <CardMedia
                  classes={mediaStyles}
                  image={
                    '/images/events1.jpg'
                  }
                />
                <CardContent className={styles.content}>
                <Typography variant='h6'>
                    Lesson 7
                  </Typography>
                  <TextInfoContent
                    classes={textCardContentStyles}
                    heading={'Introduction to Christianity Part 7'}
                    body={
                      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
                    }
                  />
                <div className={styles.icons}>
                < Tooltip title="Video">
                      <IconButton aria-label="Video">
                        <Videocam />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Document">
                      <IconButton aria-label="Document">
                        <Description />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Audio">
                      <IconButton aria-label="Audio">
                        <MusicNote />
                      </IconButton>
                    </Tooltip>
                </div>
                  <Button color={'primary'} fullWidth className={styles.cta}>
                    Start Lesson <ChevronRightRounded />
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card className={cx(styles.root, shadowStyles.root)}>
                <CardMedia
                  classes={mediaStyles}
                  image={
                    '/images/events2.jpg'
                  }
                />
                <CardContent className={styles.content}>
                <Typography variant='h6'>
                    Lesson 8
                  </Typography>
                  <TextInfoContent
                    classes={textCardContentStyles}
                    heading={'Introduction to Christianity Part 8'}
                    body={
                      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.'
                    }
                  />
                <div className={styles.icons}>
                  <Tooltip title="Video">
                      <IconButton aria-label="Video">
                        <Videocam />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Document">
                      <IconButton aria-label="Document">
                        <Description />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Audio">
                      <IconButton aria-label="Audio">
                        <MusicNote />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                      <IconButton aria-label="Download">
                        <CloudDownload />
                      </IconButton>
                    </Tooltip>
                </div>
                  <Button color={'primary'} fullWidth className={styles.cta}>
                    Start Lesson <ChevronRightRounded />
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(part1)
