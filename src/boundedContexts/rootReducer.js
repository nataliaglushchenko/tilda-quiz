import { combineReducers } from 'redux';

import quizzes from './quizzes/ducks';

const rootReducer = combineReducers({
    quizzes
});

export default rootReducer;
