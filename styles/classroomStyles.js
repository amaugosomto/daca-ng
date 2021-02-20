import { makeStyles } from '@material-ui/core/styles';

const $primaryColor = '#6D0EB5';
const $lightGrey = '#636363';

export const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: '4rem',
    fontFamily: "'Open Sans', sans-serif"
  },
  headerContainer: {
    fontFamily: "'Yusei Magic', sans-serif !important",
    textAlign: 'center',
    paddingTop: '2rem',

    '& > h5': {
      fontFamily: "'Yusei Magic', sans-serif",
      marginBottom: '1rem',
      fontSize: '1.9rem'
    }
  },
  headerBody: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& > div': {
      marginLeft: '.5rem',

      '& > span': {
        color: "rgba(0, 0, 0, .4)"
      }
    },

    '& div div': {
      marginBottom: '.5rem'
    }
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
  classBody: {
    marginTop: '3rem',
    marginBottom: '3rem',
    fontFamily: "'Open Sans', sans-serif",

    '& p':{
      fontSize: '1rem',
      lineHeight: 2,
      textAlign: 'justify',
      wordBreak: 'break-all'
    },

    '& li':{
      fontSize: '1rem',
    },

    '& div':{
      margin: '3rem 0',

      '& button': {
        fontSize: '.9rem',
        color: '#fff',
        backgroundColor: $primaryColor,

        '&:hover': {
          color: '#fff',
          backgroundColor: $primaryColor
        }
      }
    },

    '& div:last-of-type': {
      marginBottom: 0
    }
  }
}));

export default useStyles; 
