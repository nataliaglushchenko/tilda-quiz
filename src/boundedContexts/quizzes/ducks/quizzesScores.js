// -----------------------------------------------------------------
// Constants
// -----------------------------------------------------------------

export const UPDATE_QUIZZES_SCORES = 'UPDATE_QUIZZES_SCORES';

const initialState = {
    quizzesScores: [{
        id: '',
        score: 0
    }]
};

// -----------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_QUIZZES_SCORES:
            return {
                ...state,
                quizzesScores: action.payload.quizzesScores
            };

        default:
            return state;
    }
}

// -----------------------------------------------------------------
// Action Creators
// -----------------------------------------------------------------


export const quizzesScoresUpdated = (quizzesScores) => {
    return {
        type: UPDATE_QUIZZES_SCORES,
        payload: { quizzesScores }
    };
};

// -----------------------------------------------------------------
// Selectors
// -----------------------------------------------------------------

const rootSelector = state => state.quizzes.quizzesScores;

export const quizzesScoresSelector = state => rootSelector(state).quizzesScores;
