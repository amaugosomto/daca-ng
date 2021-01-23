import { makeStyles } from '@material-ui/core/styles';

const $primaryColor = '#6D0EB5';
const $lightGrey = '#636363';

export const useStyles = makeStyles((theme) => ({
  banner: {
    height: '70vh',
    marginTop: '4rem',
    background: $lightGrey,  /* fallback colour. Make sure this is just one solid colour. */
    background: '-webkit-linear-gradient(rgba(48, 48, 54, 0.8), rgba(44, 33, 36, 0.5)), url("/images/classes.jpg")',
    background: 'linear-gradient(rgba(48, 48, 54, 0.8), rgba(44, 33, 36, 0.6)), url("/images/classes.jpg")', 
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
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
    color: '#fff',

    '& h4': {
      fontSize: '3rem',
      marginBottom: '30px',
      fontWeight: '500',
      [theme.breakpoints.down('xs')]: {
        fontSize: '2rem'
      }
    },
    '& .spanCaption': {
      fontSize: '1.5rem',
      marginBottom: '30px',
      fontWeight: '400',
      display: 'block',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.3rem'
      }
    },
    '& button':{
      background: $primaryColor,
      transition: '0.4s all',
      color: '#fff',
      padding: '10px 30px',

      '&:hover': {
        background: '#fff',
        color: $primaryColor
      }
    }
  },
  classes: {
    marginTop: '4rem',
    marginBottom: '4rem',
    [theme.breakpoints.down('sm')]: {
      '& h4': {
        fontSize: '1rem'
      }
    }
  },
  content: {
    padding: 24,

    '& p': {
      fontSize: '.8rem',
      color: $lightGrey
    },

    '& *:not(.avartar)': {
      textAlign: 'left'
    }
  },
  icons: {
    margin: '.5rem',
    
    '& svg': {
      color: '#9b6917',
      fontSize: '1.5rem',
      cursor: 'pointer'
    }
  },
  gridContainer: {
    '& > div':{
      padding: '0 .6rem',
      marginBottom: '1.5rem'
    }
  },
  username: {
    textTransform: 'capitalize'
  }
}));

export default useStyles;

