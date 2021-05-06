import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Button } from 'reactstrap';

import './quizCard.css';

const propTypes = {
    title: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
    btnText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

const defaultProps = {
};

function QuizCard(props) {
    const {
        title,
        score,
        btnText,
        onClick
    } = props; 

    return (
        <div
            className={cn(
                'border',
                'd-flex',
                'flex-column',
                'm-2'
            )}
            style={{ minWidth: "300px" }}
        >              
            <div
                className={cn(
                    'p-1',
                    'm-2',
                )}
                style={{ fontSize: '1.15rem', fontWeight: 'bold' }}
            >
                {title}
            </div>
            <div
                className={cn(
                    'quizCard__score',
                    'm-2',
                    'p-1',
                )}
            >
                Score {score}
            </div>
            <div
                className={cn(
                    'text-right',
                    'm-2'
                )}
            >
                <Button
                    onClick={onClick}
                >
                    {btnText}
                </Button>
            </div>         
        </div>
    );
}

QuizCard.propTypes = propTypes;
QuizCard.defaultProps = defaultProps;

export default QuizCard;
