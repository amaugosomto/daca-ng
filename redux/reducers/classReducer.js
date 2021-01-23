import { CLASS_CONSTANTS } from "../actions/types";

const initialState = [
  {
    question: "What does it mean to be a Christain ? ",
    quizType: 1,
    quizId: 1,
    answers: {
      a: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      b: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      c: "Lorem ipsum dolor sit amet consectetur.",
      d: "Lorem ipsum dolor sit amet consectetur inido."
    },
    correctAnswer: "c"
  },
  {
    question: "What are the characteristics of a Christan ? ",
    quizType: 2,
    quizId: 2,
    answers: {
      a: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      b: "Lorem ipsum dolor sit amet consectetur adipisicing",
      c: "Lorem ipsum dolor sit amet consectetur taking lssons",
      d: "Lorem ipsum dolor sit amet consectetur taking lssons"
    },
    correctAnswer: "c"
  },
  {
    question: "What does it mean to be a Christain ? ",
    quizType: 1,
    quizId: 3,
    answers: {
      a: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      b: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      c: "Lorem ipsum dolor sit amet consectetur.",
      d: "Lorem ipsum dolor sit amet consectetur inido."
    },
    correctAnswer: "a"
  },
  {
    question: "What does it mean to be a Christain ? ",
    quizType: 1,
    quizId: 4,
    answers: {
      a: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      b: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      c: "Lorem ipsum dolor sit amet consectetur.",
      d: "Lorem ipsum dolor sit amet consectetur inido."
    },
    correctAnswer: "b"
  },
  {
    question: "What does it mean to be a Christain ? ",
    quizType: 1,
    quizId: 5,
    answers: {
      a: "Lorem ipsum dolor sit amet consectetur adipisicing.",
      b: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      c: "Lorem ipsum dolor sit amet consectetur.",
      d: "Lorem ipsum dolor sit amet consectetur inido."
    },
    correctAnswer: "d"
  },
];

const classReducer = (state = [...initialState], action) => {
  switch (action.type) {
    case CLASS_CONSTANTS.QUIZ_QUESTIONS:
      return state;
  
    default:
      return state;
  }
}

export default classReducer;
