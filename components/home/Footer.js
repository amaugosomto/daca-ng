import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button, Container, FormControl, Icon, InputAdornment, InputLabel, 
  Link, OutlinedInput, withStyles } from "@material-ui/core";
import styles from '../../styles/Home.module.scss'
import { Email, Instagram, LocationOn, PhoneAndroid, Twitter, YouTube, Facebook } 
  from "@material-ui/icons";
const $lightGrey = '#636363';
const $secondaryColor = '#9B6917';

const CssTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: $lightGrey
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: $lightGrey,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: $secondaryColor,
    }
  },
})(OutlinedInput);

const Footer = () => (
  <div className={styles.footer}>
    <Container maxWidth="lg" className={styles.topFooter}>
      <Grid container>
        <Grid item xs={12} sm={6} className={styles.footerGrid}>
          <img src="/images/daca-logo.png" alt="daca logo" srcset="" className={styles.footerImage} />
          <Typography variant="caption">
            Our Core values are: To model the nature of God (love) and a culture of excellence while delivering selfless service.
          </Typography>
          <Typography variant="caption">
            <Icon>
              <LocationOn />
            </Icon>
            210 Okigwe Road, Opp Glass House, Owerri
          </Typography>
          <Typography variant="caption">
            <Icon>
              <PhoneAndroid />
            </Icon>
            Phone: +234 903 2253 981
          </Typography>
          <Typography variant="caption">
            <Icon>
              <Email />
            </Icon>
            Email: divineambassadorsng@gmail.com
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} className={styles.subscribeGrid}>
          <Typography variant="h6">
            Subscribe
          </Typography>
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" style={{color:$lightGrey}}>Email</InputLabel>
            <CssTextField
              label="Email"
              size="small"
              endAdornment={
                <InputAdornment position="end">
                  <Icon
                    edge="end"
                  >
                    <Email />
                  </Icon>
                </InputAdornment>
              }
              labelWidth={70}
            />
          </FormControl>

          <Button variant="contained">
              subscribe
          </Button>
        </Grid>
      </Grid>
      
    </Container>

    <div className={styles.bottomFooter}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} md={6}>
            <Icon>
              <Twitter />
            </Icon>
            <Icon>
              <Facebook />
            </Icon>
            <Icon>
              <Instagram />
            </Icon>
            <Icon>
              <YouTube />
            </Icon>
          </Grid>
          <Grid item xs={12} md={6}>
            &copy; {new Date().getFullYear()} All Rights Reserved - Divine Ambassadors Christian Assembly - 
            <Link href="/">
              <a>DACA</a>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </div>
    
  </div>
);

export default Footer;