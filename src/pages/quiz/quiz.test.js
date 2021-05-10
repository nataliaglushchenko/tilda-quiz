import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import "isomorphic-fetch";

import { Button } from 'reactstrap';
import Quiz from './quiz';
import QuizOption from '../../components/quizOption';

configure({ adapter: new Adapter() });

describe('<Quiz />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Quiz 
                onFetchQuestion={() => {}}
                question={{
                    id: '',
                    answer: '',
                    options: '',
                    text: ''
                }}
                quizName={""}
                isQuestionLoading={false}
                isQuestionLoaded={false}
                quizzes={[]}
                quizzesScores={[]}
                onUpdateQuizzesScores={() => {}}
                match={{ params: { quizId: '', quistionId: ''} }}
            />
        );
    });
    
    it('renders at least one QuizOption components when question loaded', () => {
        wrapper.setProps({ 
            isQuestionLoaded: true, 
            question: {
                id: 'some id',
                answer: 'some answer',
                options: 'some options',
                text: 'some text'
            }
        });
        expect(wrapper.find(QuizOption));
    })
    
    it('renders go back button', () => {
        expect(wrapper.find(Button)).toHaveLength(1);
    });
});
