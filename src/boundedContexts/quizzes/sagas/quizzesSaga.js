import { takeLatest, put, putResolve, call, all } from 'redux-saga/effects';
import { request, gql } from 'graphql-request';

import {
    quizzesFetchFailed,
    quizzesFetchStarted,
    quizzesFetchSucceeded,
    QUIZZES_FETCH_REQUESTED
} from '../ducks/quizzes';

import { quizzesScoresUpdated } from '../ducks/quizzesScores';

const query = gql`
  {
    quizzes {
        name
        id,
        questions {
            id
        }
    }
  }
`;

const fetchData = async () => {
    return request('https://tilda-quiz.hasura.app/v1/graphql', query)
        .then((data) => {
            return data;
        })
        .catch(e => {throw new Error(e);})
};

export function* quizzesFetchRequestedHandler() {    
    try {
        yield putResolve(quizzesFetchStarted());
        const { quizzes } = yield call(fetchData);

        const initialScores = quizzes.map(q => {
            return {
                id: q.id,
                score: 0
            };
        });

        yield putResolve(quizzesScoresUpdated(initialScores));

        yield putResolve(quizzesFetchSucceeded({
            quizzes
        }));   
        
    } catch (error) {
        console.log('error happened', error);
        yield put(quizzesFetchFailed({ error }));
    }
}

export default function* quizzesSaga() {
    yield all([
        takeLatest(QUIZZES_FETCH_REQUESTED, quizzesFetchRequestedHandler)
    ]);
}