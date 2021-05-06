import { connect } from 'react-redux';

import Dashboard from './dashboard';

import { 
    quizzesFetchRequested, 
    quizzesSelector, 
    isQuizzesLoadedSelector, 
    isQuizzesLoadingSelector 
} from '../../boundedContexts/quizzes/ducks/quizzes';

import { 
    quizzesScoresSelector
} from '../../boundedContexts/quizzes/ducks/quizzesScores';

const mapStateToProps = state => {
    return {
        quizzes: quizzesSelector(state),
        isQuizzesLoading: isQuizzesLoadingSelector(state),
        isQuizzesLoaded: isQuizzesLoadedSelector(state),
        quizzesScores: quizzesScoresSelector(state)
    };
};

const mapDispatchToProps = {
    onFetchQuizzes: quizzesFetchRequested
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
