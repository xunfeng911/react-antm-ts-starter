import * as React from 'react';
import { Button } from 'antd-mobile';
// import * as Button from 'antd-mobile/lib/button';
// import 'antd-mobile/lib/button/style/css';
import './App.css';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Button type="primary">primary</Button>
      </div>
    );
  }
}
