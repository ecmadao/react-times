import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import PickerDragHandler from '../../src/components/Picker/PickerDragHandler';
import { JSDOM } from 'jsdom';
import '../_helpers/adapter';

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce((result, prop) => ({
      ...result,
      [prop]: Object.getOwnPropertyDescriptor(src, prop),
    }), {});
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);

describe('PickerDragHandler', () => {
  describe('PickerDragHandler Init', () => {
    const wrapper = mount(<PickerDragHandler />);
    it('should render component correctly', () => {
      expect(wrapper.find('.picker_handler').length).to.equal(1);
    });

    it('should render correct draging state', () => {
      expect(wrapper.state().draging).to.equal(false);
    });
  });
});
