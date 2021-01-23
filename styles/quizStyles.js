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
  quizBody: {
    marginBottom: '3rem',
    marginTop: '2rem',
    paddingTop: '1rem'
  },
  legend: {
    fontSize: '1.3rem'
  },
  radioGroup: {
    marginLeft: '1rem',
    marginTop: '1rem'
  },
  card: {
    margin: '1rem 0'
  },
  cardContent: {
    paddingTop: '3rem',
    paddingLeft: '3rem'
  },
  quiz: {
    marginBottom: '2rem'
  },
  radioAcive: {
    color: 'green'
  },
  helperText:{
    marginLeft: '1rem',
  },
  cardActions: {
    padding: '1rem 3rem 0',
    marginBottom: '3rem',
    display: 'flex',
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
}));

export default useStyles; 
