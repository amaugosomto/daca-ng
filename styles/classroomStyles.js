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
    fontFamily: "'Open Sans', sans-serif",

    '& > span':{
      fontSize: '1.3rem',
      lineHeight: 2,
      textAlign: 'justify'
    },

    '& div':{
      display: 'flex',
      margin: '3rem 0',
      justifyContent: 'space-between',

      '& button': {
        fontSize: '.9rem',
        color: '#fff',
        backgroundColor: $primaryColor,

        '&:hover': {
          color: '#fff',
          backgroundColor: $primaryColor
        }
      }
    }
  }
}));

export default useStyles; 
