import * as React from 'react';
import { Icon } from 'antd-mobile';
import { inject, observer } from 'mobx-react';
// import { bundles } from '../../route/route';
@inject('store')
@observer
class TestPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div>
        <b>a</b>
        d
        <Icon type="check" />
      </div>
    );
  }
}
export default TestPage;