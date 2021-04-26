import { mount } from 'enzyme';
import React from 'react'
import App from './App';
import { BrowserRouter } from 'react-router-dom';

describe('<App />', () => {
  it("expect to render homepage on root path without user", () => {
    const wrapper = (<BrowserRouter path={"/"}>
                      <App />
                    </BrowserRouter>)
    expect(mount(wrapper).find('.homepage-container')).toHaveLength(1);
  })
});