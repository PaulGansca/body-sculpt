import { shallow } from 'enzyme';
import React from 'react'
import SignupPage from './signup-page';

let wrapper;

beforeEach(() => {
    wrapper = shallow(<SignupPage />);
})

describe('<SignupPage />', () => {
  it("expect to render signup page", () => {
    expect(wrapper).toMatchSnapshot();
  })
});