import React, { Component } from 'react';

export default function lazyLoader (importComponent: any) {
  class AsyncComponent extends Component {
    state: any = { Component: null };

    async componentDidMount () {
      const { default: Component } = await importComponent();

      this.setState({
        Component: Component
      });
    }

    render () {
      const Component = this.state.Component;

      return Component
        ? <Component {...this.props} />
        : null;
    }
  }

  return AsyncComponent;
}