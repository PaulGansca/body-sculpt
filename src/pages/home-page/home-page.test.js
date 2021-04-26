import { shallow } from 'enzyme';
import React from 'react'
import HomePage from './home-page';

let wrapper;

beforeEach(() => {
    wrapper = shallow(<HomePage />);
})

describe('<HomePage />', () => {
  it("expect to render home page", () => {
    expect(wrapper).toMatchSnapshot();
  });
});