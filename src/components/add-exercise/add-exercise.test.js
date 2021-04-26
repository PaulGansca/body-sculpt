import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import AddExercise from './add-exercise';

let wrapper;

beforeEach(() => {
    const mockProps = {
        getState: jest.fn(),
        subscribe: jest.fn(),
        dispatch: jest.fn(),
    }
    wrapper = shallow(
                <Provider store={mockProps}>
                    <AddExercise />
                </Provider>
                );
})

describe('<AddExercise />', () => {
  it("expect to render add exercise modal", () => {
    expect(wrapper).toMatchSnapshot();
  })
});