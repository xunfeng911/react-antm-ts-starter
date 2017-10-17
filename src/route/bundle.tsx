import { Component } from 'react';

/**
 *  路由懒加载
 * 
 * @export
 * @class Bundle
 * @extends {Component}
 */
export default class Bundle extends Component<any, any> {
  state: any;
  constructor(props: any) {
      super(props);
      this.state = {
          mod: null
      };
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps: any) {
      if (nextProps.load !== this.props.load) {
        this.load(nextProps);
      }
  }

  load(props: any) {
      this.setState({
          mod: null
      });
      // 注意这里，使用Promise对象; mod.default导出默认
      props.load().then((mod: any) => {
          this.setState({
              mod: mod.default ? mod.default : mod
          });
      });
  }

  render() {
      return this.state.mod ? this.props.children(this.state.mod) : null;
  }
}