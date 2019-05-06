import React, { Component } from 'react';
import MdPreview from '../../components/mdPreview';
import Export from '../../components/export';
import styles from './note-detail.less';

let mobileReg = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;

export default class NoteDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mdtext: null,
      isMobile: mobileReg.test(navigator.userAgent), // 是否移动端
      // 按钮距左右两侧的距离，768是内容最大宽度
      btnPCSpace: `calc(${100 / 2}% - ${768 / 2 - 10}px)`,
      isResize: false
    };
  }

  componentDidMount = () => {
    setTimeout(() => {
      window.addEventListener('resize', this.resize);
    }, 0);
    const localtext = localStorage.getItem('mdtext');
    if (localtext) {
      this.setState({
        mdtext: JSON.parse(localtext)
      });
    } else {
      // 默认显示为md文件
      // 这里文件名不能下划线'_'开头，不然本地可以获取到，但是github page上面会404
      fetch('./promise_This_is.md')
        .then(res => res.text())
        .then(res => {
          if (res.substring(0, 20).includes('<!DOCTYPE html>')) return;
          localStorage.setItem('mdtext', JSON.stringify(res));
          this.setState({
            mdtext: res
          });
        });
    }
  };

  componentDidUpdate = () => {};

  resize = () => {
    if (this.state.isResize) return;
    // PC端最大宽度768，小于768则取小的数
    let bodyWidth = Math.min(document.body.clientWidth, 768);
    this.setState(
      {
        isResize: true,
        isMobile: mobileReg.test(navigator.userAgent),
        btnPCSpace: `calc(${100 / 2}% - ${bodyWidth / 2 - 10}px)`
      },
      () => {
        this.setState({
          isResize: false
        });
      }
    );
  };

  render() {
    const { isMobile, btnPCSpace } = this.state;
    return (
      <div className={`center-content ${styles['note-detail']}`}>
        <h3 className={styles.title}>查看详情</h3>
        {this.state.mdtext && <MdPreview isDetail mdtext={this.state.mdtext} />}
        <button
          className={styles.edit}
          style={{ right: isMobile ? '10px' : btnPCSpace }}
          onClick={() => this.props.history.push('/mdEditor')}
        >
          编辑
        </button>
        {this.state.mdtext && (
          <Export btnPCSpace={btnPCSpace} isMobile={isMobile} />
        )}
      </div>
    );
  }
}
