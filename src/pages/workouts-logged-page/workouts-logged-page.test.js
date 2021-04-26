import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import WorkoutsLoggedPage from './workouts-logged-page';
import WorkoutsLoggedPageContainer from './workouts-logged-page.container';

let wrapper;

describe('<WorkoutsLoggedPage />', () => {
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
                        <WorkoutsLoggedPageContainer {...mockProps} />
                    </Provider>)
        expect(wrapper).toMatchSnapshot();
    })
    it("expect to render workout page", () => {
        const mockProps = {
            workouts: [{date: new Date(), id: 1}],
        }
        wrapper = shallow(<WorkoutsLoggedPage {...mockProps} />)
        expect(wrapper).toMatchSnapshot();
    })
});