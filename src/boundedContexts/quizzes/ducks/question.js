// -----------------------------------------------------------------
// Constants
// -----------------------------------------------------------------

export const QUESTION_FETCH_REQUESTED = 'QUESTION_FETCH_REQUESTED';
export const QUESTION_FETCH_STARTED = 'QUESTION_FETCH_STARTED';
export const QUESTION_FETCH_SUCCEEDED = 'QUESTION_FETCH_SUCCEEDED';
export const QUESTION_FETCH_FAILED = 'QUESTION_FETCH_FAILED';

const initialState = {
    question: {
        id: "",
        answer: "",
        options: "",
        text: ""
    },
    quizName: "",
    isQuestionLoading: false,
    isQuestionLoaded: false
};

// -----------------------------------------------------------------
// Reducer
// -----------------------------------------------------------------

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case QUESTION_FETCH_STARTED:
            return {
                ...state,
                isQuestionLoaded: false,
                isQuestionLoading: true
            };

        case QUESTION_FETCH_SUCCEEDED:
            return {
                ...state,
                question: action.payload.question,
                quizName: action.payload.quizName,
                isQuestionLoaded: true,
                isQuestionLoading: false
            };

        case QUESTION_FETCH_FAILED:
            return {
                ...state,
                isQuestionLoaded: false,
                isQuestionLoading: false
            };

        default:
            return state;
    }
}

// -----------------------------------------------------------------
// Action Creators
// -----------------------------------------------------------------


export const questionFetchRequested = (questionId) => {
    return {
        type: QUESTION_FETCH_REQUESTED,
        payload: questionId
    };
};

export const questionFetchStarted = () => {
    return {
        type: QUESTION_FETCH_STARTED
    };
};

export const questionFetchSucceeded = ({ question, quizName }) => {
    return {
        type: QUESTION_FETCH_SUCCEEDED,
        payload: { question, quizName }
    };
};

export const questionFetchFailed = () => {
    return {
        type: QUESTION_FETCH_FAILED
    };
};

// -----------------------------------------------------------------
// Selectors
// -----------------------------------------------------------------

const rootSelector = state => state.quizzes.question;

export const questionSelector = state => rootSelector(state).question;
export const quizNameSelector = state => rootSelector(state).quizName;
export const isQuestionLoadingSelector = state => rootSelector(state).isQuestionLoading;
export const isQuestionLoadedSelector = state => rootSelector(state).isQuestionLoaded;
