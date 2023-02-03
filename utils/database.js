import { firebase } from '../Firebase/firebaseConfig'



export const createQuiz = (currentQuizId, title,subject, description, theory,) => {
  return firebase.firestore().collection('Quiz').doc(currentQuizId).set({
    title,
    subject,
    description,
    theory,
  });
};

// Create new question for current quiz
export const createQuestion = (currentQuizId, currentQuestionId, question) => {
  return firebase.firestore()
    .collection('Quiz')
    .doc(currentQuizId)
    .collection('QNA')
    .doc(currentQuestionId)
    .set(question);
};

// Get All Quizzes
export const getQuizzes = () => {
  return firebase.firestore().collection('Quiz').get();
};

// Get Quiz Details by id
export const getQuizById = currentQuizId => {
  return firebase.firestore().collection('Quiz').doc(currentQuizId).get();
};

// Get Questions by currentQuizId
export const getQuestionsByQuizId = currentQuizId => {
  return firebase.firestore()
    .collection('Quiz')
    .doc(currentQuizId)
    .collection('QNA')
    .get();
};