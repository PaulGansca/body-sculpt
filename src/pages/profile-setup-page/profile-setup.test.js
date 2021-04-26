import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react'
import ProfileSetupPage from './profile-setup-page';
import ProfileSetupPageContainer from './profile-setup-page.container';

let wrapper;

beforeEach(() => {
    const mockProps = {
        currentUser: {id: "bla123bla", goalSet: true, birthday: new Date()},
        loading: false,
        isMusclePrioritized: "true",
        changedValues: {isMusclePrioritized: "true"},
        setFormQuestionsList: jest.fn(),
    }
    wrapper = shallow(<ProfileSetupPage {...mockProps} />);
})

describe('<ProfileSetupPage />', () => {
  it("expect to render container without crashing with no props", () => {
    const mockProps = {
        currentUser: {},
        loading: true,
        getState: jest.fn(),
        subscribe: jest.fn(),
        dispatch: jest.fn(),
    }
    wrapper = shallow(
                <Provider store={mockProps}>
                    <ProfileSetupPageContainer {...mockProps} />
                </Provider>)
    expect(wrapper).toMatchSnapshot();
  })
  it("expect to render setup page on signup", () => {
    expect(wrapper).toMatchSnapshot();
  })
});