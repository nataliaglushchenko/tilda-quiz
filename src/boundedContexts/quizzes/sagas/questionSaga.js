import { takeLatest, put, putResolve, call, all} from 'redux-saga/effects';
import { request, gql } from 'graphql-request';

import {
    questionFetchFailed,
    questionFetchStarted,
    questionFetchSucceeded,
    QUESTION_FETCH_REQUESTED
} from '../ducks/question';

const query = gql`
    query MyQuery($id: uuid!) {
        questions_by_pk(id: $id) {
            answer
            id
            options
            text
            quiz {
                name
            }
        },
    }
`;

const fetchData = async (id) => {
    const variables = { "id": id };
    return request('https://tilda-quiz.hasura.app/v1/graphql', query, variables)
        .then((data) => {
            return data;
        })
        .catch(e => {throw new Error(e);})
};

export function* questionFetchRequestedHandler(action) {
    const id = action.payload;

    try {
        yield putResolve(questionFetchStarted());
        const { questions_by_pk } = yield call(fetchData, id);
        const { quiz } = questions_by_pk;
        const { name: quizName } = quiz;

        yield putResolve(questionFetchSucceeded({
            question: questions_by_pk,
            quizName: quizName
        }));
        
    } catch (error) {
        console.log('error happened', error);
        yield put(questionFetchFailed({ error }));
    }
}

export default function* questionSaga() {
    yield all([
        takeLatest(QUESTION_FETCH_REQUESTED, questionFetchRequestedHandler)
    ]);
}