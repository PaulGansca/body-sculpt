import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import WorkoutPage from './workout-page';
import WorkoutPageContainer from './workout-page.container';

let wrapper;

describe('<WorkoutPage />', () => {
    it("container renders workout based on id", () => {
        const mockProps = {
            match: {params: {workoutId: 1}},
            isUserLoading: true,
            isWorkoutLoading: true,
            getState: jest.fn(),
            subscribe: jest.fn(),
            dispatch: jest.fn(),
            workouts: [{id: 1}],
        }
        wrapper = shallow(
                    <Provider store={mockProps}>
                        <WorkoutPageContainer {...mockProps} />
                    </Provider>)
        expect(wrapper).toMatchSnapshot();
    })
    it("expect to render workout page", () => {
        wrapper = shallow(<WorkoutPage />)
        expect(wrapper).toMatchSnapshot();
    })
});