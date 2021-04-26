import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import ProfilePage from './profile-page';
import ProfilePageContainer from './profile-page-container';

let wrapper;

beforeEach(() => {
    const mockProps = {
        currentUser: {id: "bla123bla", fitnessLevel: "intermediate"},
        loading: false,
        workouts: [{date: new Date()}],
    }
    wrapper = shallow(<ProfilePage {...mockProps} />);
})

describe('<ProfilePage />', () => {
    it("expect to render without crashing with no props", () => {
        const mockProps = {
            currentUser: "",
            userLoading: true,
            getState: jest.fn(),
            subscribe: jest.fn(),
            dispatch: jest.fn(),
            workouts: [{date: new Date()}],
        }
        wrapper = shallow(
                    <Provider store={mockProps}>
                        <ProfilePageContainer {...mockProps} />
                    </Provider>)
        expect(wrapper).toMatchSnapshot();
    })
    it("expect to render profile page with props", () => {
        expect(wrapper).toMatchSnapshot();
    })
});