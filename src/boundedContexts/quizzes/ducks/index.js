import { combineReducers } from 'redux';

import quizzes from './quizzes';
import quizzesScores from './quizzesScores';
import question from './question';

export default combineReducers({
    quizzes,
    quizzesScores,
    question
});
