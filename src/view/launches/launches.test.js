import React, { useState as useStateMock } from "react";
import { shallow, render, mount } from "enzyme";
import Launches from "./launches";

describe('Launch', () => {

  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = shallow(<Launches />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    shallow(<Launches />);
  });


  it('if the Launches title is rendering', () => {
    expect('LAUNCHES').toBe(wrapper.find('.launch-title').text())
  });

});