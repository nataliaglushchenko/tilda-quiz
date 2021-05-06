import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Spinner } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import QuizCard from '../../components/quizCard';

const propTypes = {
    onFetchQuizzes: PropTypes.func.isRequired,
    quizzes: PropTypes.arrayOf(PropTypes.object).isRequired,
    isQuizzesLoading: PropTypes.bool.isRequired,
    isQuizzesLoaded: PropTypes.bool.isRequired,
    quizzesScores: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired
    })).isRequired
};

const defaultProps = {
};

function Dashboard(props) {
    const {
        onFetchQuizzes,
        quizzes: fetchedQuizzes,
        isQuizzesLoading,
        isQuizzesLoaded,
        quizzesScores
    } = props;

    const history = useHistory();

    useEffect(() => {
        if(!isQuizzesLoaded) onFetchQuizzes();
    }, []);

    const handleSelectQuiz = (quiz) => {
        history.push(`/quiz/${quiz.id}/question/${quiz.questions[0].id}`);
    };

    const quizzes = isQuizzesLoading ? <Spinner /> : isQuizzesLoaded && fetchedQuizzes.map(quiz => {
        const { score: quizScore } = quizzesScores && quizzesScores.find(s => s.id === quiz.id);
        const numberOfQuestions = quiz.questions.length;

        return (
            <QuizCard
                key={quiz.id}
                title={quiz.name}
                score={`${quizScore}/${numberOfQuestions}`}
                btnText={quizScore !== 0 ? "Redo" : "Start"}
                onClick={() => handleSelectQuiz(quiz)}
            />
        );
    });

    return (
        <div>
            <div
                className={cn(
                    'mt-4',
                    'm-2',
                    'p-2',
                    'text-center'
                )}
                style={{ fontSize: "1.25rem" }}
            >
                Tilda Quizz
            </div>
            <div
                className={cn(
                    'd-flex',
                    'flex-row',
                    'flex-wrap',
                    'my-4',
                    'justify-content-center'
                )}
            >
                {quizzes}
            </div>
        </div>
    );
}

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;

export default Dashboard;
