import React from 'react';
import { mount } from 'enzyme';

import { Accordion, AccordionContent } from '../../index';

const isFixed = true;

const testAccordion = props => (
  <Accordion height={200} accordionId="test" expandedKey="1">
    <AccordionContent title="Panel 1" eventKey="1" fixed={isFixed}>
      <div>test blahs</div>
    </AccordionContent>
  </Accordion>
);
test('accordion renders', () => {
  const component = mount(testAccordion());
  expect(component.render()).toMatchSnapshot();
});
test('testing first panel being open', () => {
  const component = mount(
    <Accordion height={200} accordionId="test" expandedKey="1">
      <AccordionContent title="Panel 1" eventKey="1" fixed={isFixed}>
        <div>Test content</div>
      </AccordionContent>
    </Accordion>
  );
  expect(component.find('div#test-body-1').prop('aria-expanded')).toEqual(true);
});
test('testing properties get added to panel body after click', () => {
  const component = mount(
    <Accordion height={200} accordionId="test">
      <AccordionContent title="Panel 1" eventKey="1" fixed={isFixed}>
        <div>Test content</div>
      </AccordionContent>
    </Accordion>
  );
  component.find('a').simulate('click');
  component.update();
  component.render();
  const bodyEl = component.find('.panel-body');
  expect(bodyEl.html()).toMatchSnapshot();
});