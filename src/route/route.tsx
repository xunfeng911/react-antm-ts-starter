import * as React from 'react';
import Bundle from './bundle';

export const TestPage = (props: any) => (
  <Bundle load={() => import('../pages/test/test')}>
    {(Test: any) => <Test {...props} />}
  </Bundle>
);

// export const bundles = (Component: any) => {
//   console.log(Component);
//   return class extends React.Component {
//     constructor(props: any) {
//       super(props);
//     }
//     render() {
//       return (
//         <Bundle load={Component}>
//           {(Page: any) => <Page {...this.props} />}
//         </Bundle>
//       );
//     }
//   };
// };

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