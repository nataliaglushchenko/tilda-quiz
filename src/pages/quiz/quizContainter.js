import { connect } from 'react-redux';

import Quiz from './quiz';

import {
    quizzesSelector, 
    isQuizzesLoadedSelector, 
    isQuizzesLoadingSelector 
} from '../../boundedContexts/quizzes/ducks/quizzes';

import { 
    isQuestionLoadedSelector, 
    isQuestionLoadingSelector, 
    questionFetchRequested, 
    questionSelector, 
    quizNameSelector 
} from '../../boundedContexts/quizzes/ducks/question';

import { 
    quizzesScoresSelector, 
    quizzesScoresUpdated 
} from '../../boundedContexts/quizzes/ducks/quizzesScores';

const mapStateToProps = state => {
    return {
        question: questionSelector(state),
        isQuestionLoading: isQuestionLoadingSelector(state),
        isQuestionLoaded: isQuestionLoadedSelector(state),
        quizName: quizNameSelector(state),
        quizzes: quizzesSelector(state),
        quizzesScores: quizzesScoresSelector(state),
        isQuizzesLoading: isQuizzesLoadingSelector(state),
        isQuizzesLoaded: isQuizzesLoadedSelector(state)
    };
};

const mapDispatchToProps = {
    onFetchQuestion: questionFetchRequested,
    onUpdateQuizzesScores: quizzesScoresUpdated
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
