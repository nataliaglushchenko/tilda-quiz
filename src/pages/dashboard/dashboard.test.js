import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch';

import { Spinner } from 'reactstrap';
import QuizCard from '../../components/quizCard';
import Dashboard from './dashboard';

configure({ adapter: new Adapter() });

describe('<Dashboard />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Dashboard 
                onFetchQuizzes={() => {}}
                quizzes={[]}
                isQuizzesLoading={false}
                isQuizzesLoaded={false}
                quizzesScores={[]}
            />
        );
    });

    it('renders at least one <QuizCard /> element if quizzes loaded', () => {
        wrapper.setProps({ isQuizzesLoaded: true });
        expect(wrapper.find(QuizCard));
    });

    it('renders <Spinner /> element when quizzes loading', () => {
        wrapper.setProps({ isQuizzesLoading: true });
        expect(wrapper.contains(<Spinner />)).toEqual(true);
    });
});
