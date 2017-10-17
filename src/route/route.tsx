import * as React from 'react';
import Bundle from './bundle';

export const TestPage = (props: any) => (
  <Bundle load={() => import('../pages/test/test')}>
    {(Test: any) => <Test {...props} />}
  </Bundle>
);