import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import ExercisePage from './exercise-page';
import ExercisePageContainer from './exercise-page-container';

let wrapper;

describe('<ExercisePage />', () => {
    it("container renders exercise based on id", () => {
        const mockProps = {
            match: {params: {exerciseId: 1}},
            getState: jest.fn(),
            subscribe: jest.fn(),
            dispatch: jest.fn(),
            exercises: [{db_id: 1}],
        }
        wrapper = shallow(
                    <Provider store={mockProps}>
                        <ExercisePageContainer {...mockProps} />
                    </Provider>)
        expect(wrapper).toMatchSnapshot();
    })
    it("expect to render exercise page with props", () => {
        const mockProps = {
            exercise: {name: "Bench Press"},
        }
        wrapper = shallow(<ExercisePage {...mockProps} />)
        expect(wrapper).toMatchSnapshot();
    })
});