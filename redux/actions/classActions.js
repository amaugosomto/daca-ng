import { CLASS_CONSTANTS } from "./types";
import api from '../../middlewares/axiosConfig';

export const getQuizzes = () => ({
  type: CLASS_CONSTANTS.QUIZ_QUESTIONS
});

export const resetisWrongClass = () => ({
  type: CLASS_CONSTANTS.ISWRONG_CLASS
});

export const getUserCurrentClass = (classId) => async (dispatch) => {
  let classResponse = await api.get('/classes/getStudentCLass')
    .then(res => res)
    .catch(err => err);

  let newClassId = 0;
  let firstClass = true;
  let isWrongClass = false;

  if (classResponse.status != 204) {
    if (classResponse.data.data.classId < classId) {
      newClassId = classResponse.data.data.classId;
      isWrongClass = true;
    } else {
      newClassId = classId;
      isWrongClass = false;
    }
    
    firstClass = classResponse.data.data.firstClass
  }

  dispatch({
    type: CLASS_CONSTANTS.USER_CURRENT_CLASS,
    payload: {
      newClassId,
      firstClass,
      isWrongClass
    }
  });
};

export const setPreviousClass = (previousClass) => async (dispatch) => {
  dispatch({
    type: CLASS_CONSTANTS.SET_PREVIOUS_CLASS,
    payload: {
      previousClass
    }
  });
};
