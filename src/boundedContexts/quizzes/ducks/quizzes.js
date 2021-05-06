// -----------------------------------------------------------------
// Constants
// -----------------------------------------------------------------

export const QUIZZES_FETCH_REQUESTED = 'QUIZZES_FETCH_REQUESTED';
export const QUIZZES_FETCH_STARTED = 'QUIZZES_FETCH_STARTED';
export const QUIZZES_FETCH_SUCCEEDED = 'QUIZZES_FETCH_SUCCEEDED';
export const QUIZZES_FETCH_FAILED = 'QUIZZES_FETCH_FAILED';

const initialState = {
    quizzes: [],
    isQuizzesLoading: false,
    isQuizzesLoaded: false
};

// -----------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case QUIZZES_FETCH_STARTED:
            return {
                ...state,
                isQuizzesLoaded: false,
                isQuizzesLoading: true
            };

        case QUIZZES_FETCH_SUCCEEDED:
            return {
                ...state,
                quizzes: action.payload.quizzes,
                isQuizzesLoaded: true,
                isQuizzesLoading: false
            };

        case QUIZZES_FETCH_FAILED:
            return {
                ...state,
                isQuizzesLoaded: false,
                isQuizzesLoading: false
            };

        default:
            return state;
    }
}

// -----------------------------------------------------------------
// Action Creators
// -----------------------------------------------------------------


export const quizzesFetchRequested = () => {
    return {
        type: QUIZZES_FETCH_REQUESTED
    };
};

export const quizzesFetchStarted = () => {
    return {
        type: QUIZZES_FETCH_STARTED
    };
};

export const quizzesFetchSucceeded = ({ quizzes }) => {
    return {
        type: QUIZZES_FETCH_SUCCEEDED,
        payload: { quizzes }
    };
};

export const quizzesFetchFailed = () => {
    return {
        type: QUIZZES_FETCH_FAILED
    };
};

// -----------------------------------------------------------------
// Selectors
// -----------------------------------------------------------------

const rootSelector = state => state.quizzes.quizzes;

export const quizzesSelector = state => rootSelector(state).quizzes;
export const isQuizzesLoadingSelector = state => rootSelector(state).isQuizzesLoading;
export const isQuizzesLoadedSelector = state => rootSelector(state).isQuizzesLoaded;
