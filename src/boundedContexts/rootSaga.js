import { all } from 'redux-saga/effects';

import quizzesSaga from './quizzes/sagas';

export default function* rootSaga() {
    yield all([
        quizzesSaga()
    ]);
}
