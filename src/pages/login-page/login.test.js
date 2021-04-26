import { shallow } from 'enzyme';
import React from 'react'
import LoginPage from './login-page';

let wrapper;

beforeEach(() => {
    wrapper = shallow(<LoginPage />);
})

describe('<LoginPage />', () => {
  it("expect to render login page", () => {
    expect(wrapper).toMatchSnapshot();
  })
});