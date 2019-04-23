import React, { Component } from 'react';
import styles from './loading.less';

/**
 * 路由跳转 Loading组件
 */
class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingDot: ''
    };

    this.loading.bind(this);
  }

  componentDidMount() {
    this.loading();
  }

  loading() {
    this.setState({
      loadingDot: this.state.loadingDot + '.'
    });

    this.timer = setInterval(() => {
      this.setState({
        loadingDot:
          this.state.loadingDot.length >= 3 ? '' : this.state.loadingDot + '.'
      });
    }, 600);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className={styles['loading-wrapper']}>
        <div className={styles['loading-content']}>
          {this.props.children ? (
            <div>{this.props.children}</div>
          ) : (
            <p>
              loading
              <span>{this.state.loadingDot}</span>
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default Loading;
