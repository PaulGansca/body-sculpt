import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import FinishWorkoutModall from './finish-workout-modal';

let wrapper;

beforeEach(() => {
    const mockProps = {
        getState: jest.fn(),
        subscribe: jest.fn(),
        dispatch: jest.fn(),
    }
    wrapper = shallow(
                <Provider store={mockProps}>
                    <FinishWorkoutModall />
                </Provider>
                );
})

describe('<FinishWorkoutModall />', () => {
  it("expect to render finish workout modal", () => {
    expect(wrapper).toMatchSnapshot();
  })
});