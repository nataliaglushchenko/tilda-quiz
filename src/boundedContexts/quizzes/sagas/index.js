import { all } from 'redux-saga/effects';

import quizzesSaga from './quizzesSaga';
import questionSaga from './questionSaga';

export default function* quizzesSagaCombined() {
    yield all([
        quizzesSaga(),
        questionSaga()
    ]);
}
