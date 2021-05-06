import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import './quizOption.css';

const propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

const defaultProps = {
};

function QuizOption(props) {
    const {
        children,
        onClick
    } = props; 

    return (
        <div 
            className={cn(
                'quizOption',
                'border',
                'border-dark',
                'py-1',
                'px-2',
                'my-2'
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

QuizOption.propTypes = propTypes;
QuizOption.defaultProps = defaultProps;

export default QuizOption;
