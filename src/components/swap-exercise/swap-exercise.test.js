import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import SwapExercise from './swap-exercise';

let wrapper;

beforeEach(() => {
    const mockProps = {
        getState: jest.fn(),
        subscribe: jest.fn(),
        dispatch: jest.fn(),
    }
    wrapper = shallow(
                <Provider store={mockProps}>
                    <SwapExercise />
                </Provider>
                );
})

describe('<SwapExercise />', () => {
  it("expect to render swap exercise modal", () => {
    expect(wrapper).toMatchSnapshot();
  })
});