import * as React from 'react';

export const setTitle = (title: string) => (Component: any) => {
  return class extends React.Component {
    componentDidMount() {
      document.title = title;
    }
    render() {
      return <Component {...this.props} />;
    }
  };
};