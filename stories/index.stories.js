import React from 'react'; 

import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

import Bookings from '../src/features/bookings/Bookings';

storiesOf('General|Typography', module).add('Title', () => (
  <div>
    <h1>Headline used for these uses (use example)</h1>
    <h2>Headline used for these</h2>
  </div>
));

storiesOf('General|Colors', module).add('MATCHi', () => (
  <div>
    <h2>Add explaination to when to use which colors besides just looking good</h2>
    <span style={{ backgroundColor: '#6BC945' }}>#6BC945</span>
    <br />
    <br />
    <span style={{ backgroundColor: '#22AD5C' }}>#22AD5C</span>
    <br />
    <br />
    <span style={{ backgroundColor: '#41B99C' }}>#41B99C</span>
    <br />
    <br />
    <span style={{ backgroundColor: '#1C91DD' }}>#1C91DD</span>
    <br />
    <br />
    <span style={{ backgroundColor: '#3868CC' }}>#3868CC</span>
  </div>
));

storiesOf('General|Colors', module).add('Dark', () => (
  <div>
    <span style={{ backgroundColor: '#59595C' }}>#59595C</span>
    <br />
    <br />
    <span style={{ backgroundColor: '#404041' }}>#404041</span>
  </div>
));

storiesOf('Components|Booking', module).add('Calendar', () => <Bookings />);
