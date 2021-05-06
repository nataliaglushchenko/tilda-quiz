import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useHistory } from 'react-router-dom';
import { Spinner, Button } from 'reactstrap';

import QuizOption from '../../components/quizOption';

const propTypes = {
    onFetchQuestion: PropTypes.func.isRequired,
    question: PropTypes.shape({
        id: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
        options: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired,
    quizName: PropTypes.string.isRequired,
    isQuestionLoading: PropTypes.bool.isRequired,
    isQuestionLoaded: PropTypes.bool.isRequired,
    quizzes: PropTypes.arrayOf(PropTypes.object).isRequired,
    quizzesScores: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired
    })).isRequired,
    onUpdateQuizzesScores: PropTypes.func.isRequired
};

const defaultProps = {
};

function Quiz(props) {
    const {
        onFetchQuestion,
        question: fetchedQuestion,
        quizName,
        isQuestionLoading,
        isQuestionLoaded,
        quizzes,
        quizzesScores,
        onUpdateQuizzesScores,
        match
    } = props;
    
    const history = useHistory();

    const { quizId, questionId } = match.params;

    const handleUpdateQuizScore = (newQuizScore) => {
        const index = quizzesScores.findIndex(({ id }) => {
            return id === quizId;
        });

        const newQuizzesScores = [...quizzesScores];
        newQuizzesScores[index] = newQuizScore;

        onUpdateQuizzesScores(newQuizzesScores);
    };

    const handleResetQuizScore = () => {
        const resetQuizScores = {
            id: quizId,
            score: 0
        };

        handleUpdateQuizScore(resetQuizScores);
    };

    useEffect(() => {
        handleResetQuizScore();
    }, []);

    useEffect(() => {
        (fetchedQuestion.id !== questionId) && onFetchQuestion(questionId);
    }, [questionId]);

    const handleNavigateToTheNextQuestion = () => {
        const currentQuizObj = quizzes.find(q => q.id === quizId);
        const { questions } = currentQuizObj;

        const currentQuestionIndex = questions.map(q => q.id).indexOf(questionId);
        const questionsLength = questions.length;

        if (currentQuestionIndex + 1 === questionsLength) {
            history.push('/dashboard');
        } else {
            const { id: nextQuestionId } = questions[currentQuestionIndex + 1];

            history.push(`/quiz/${quizId}/question/${nextQuestionId}`);
        }
    };

    const handleSelectOption = (option) => {
        const isCorrectAnswer = option === fetchedQuestion.answer;
        
        if (isCorrectAnswer) {
            const { score: currentScore } = quizzesScores.find(score => score.id === quizId);

            const newQuizScore = { 
                id: quizId, 
                score: currentScore + 1 
            };

            handleUpdateQuizScore(newQuizScore);
        }
    
        handleNavigateToTheNextQuestion();
    };

    const question = isQuestionLoading ? <Spinner className={cn('text-center')} /> : isQuestionLoaded && fetchedQuestion.id === questionId && fetchedQuestion.text;

    const options = isQuestionLoaded && fetchedQuestion.id === questionId && fetchedQuestion.options
        .split(',')
        .map(option => {
            return (
                <QuizOption onClick={() => handleSelectOption(option)}>{option}</QuizOption>
            );
        });

    return (
        <div>
            <div
                className={cn(
                    'mt-4',
                    'm-2',
                    'p-2',
                    'd-flex',
                    'flex-row'
                )}
                style={{ fontSize: "1.25rem" }}
            >
                <Button
                    size="sm"
                    onClick={() => history.push('/dashboard')}
                    outline
                >
                    go back
                </Button>
                <div
                    className={cn(
                        'flex-grow-1',
                        'text-center'
                    )}
                >
                    {quizName}
                </div>
            </div>
            <div
                className={cn(
                    'd-flex'
                )}
            >
                <div
                    className={cn(
                        'flex-grow-1'
                    )}
                ></div>
                <div
                    className={cn(
                        'col-md-8',
                        'col-12'
                    )}>
                    <div
                        className={cn(
                            'mt-4',
                            'm-2',
                            'p-2'
                        )}
                        style={{ fontSize: "1.15rem" }}
                    >
                        {question}
                    </div>
                    <div
                        className={cn(
                            'm-2',
                            'p-2',                                
                        )}
                        style={{ fontSize: "1.15rem"  }}
                    > 
                        {options}
                    </div>
                </div>
                <div
                    className={cn(
                        'flex-grow-1'
                    )}
                ></div>
            </div>
        </div>
    );
}

Quiz.propTypes = propTypes;
Quiz.defaultProps = defaultProps;

export default Quiz;