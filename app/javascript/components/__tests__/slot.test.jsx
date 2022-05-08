import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Slot from '../Slot';

test('Slot should open a pop-up after clicking', () => {
  const slot = shallow(
    <Slot
        // key={id}
        // id={id}
        // start_datetime={start_datetime.format('HH:mm')}
        // end_datetime={end_datetime.format('HH:mm')}
        book={() => this.handleBooking(id)}
      />
  )
  slot.find('input').simulate('change');
})
