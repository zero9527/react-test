import React, { Component } from 'react';
import styles from './md-toolbar.less';

// 快捷操作栏
export default class MdToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toolHandler = value => {
    console.log('value: ', value);
    this.props.onToolbarClick(value);
  };

  render() {
    const toolbar = {
      pic: {
        value: '![图片加载失败显示的名称](图片地址)',
        label: '图片'
      },
      link: {
        value: '[链接名称](链接地址)',
        label: '链接'
      },
      title1: {
        value: '\n# ',
        label: '一级标题'
      },
      title2: {
        value: '\n## ',
        label: '二级标题'
      },
      ul: {
        value: '\n* ',
        label: '无序列表'
      },
      ol: {
        value: '\n1. ',
        label: '有序列表'
      },
      precode: {
        value: '\n``` \n```',
        label: '代码块'
      },
      code: {
        value: '``',
        label: '代码段'
      }
    };

    return (
      <div className={styles['md-toolbar']}>
        {Object.keys(toolbar).map(key => (
          <div
            key={key}
            className={styles['tool-item']}
            onClick={() => this.toolHandler(toolbar[key].value)}
          >
            {toolbar[key].label}
          </div>
        ))}
      </div>
    );
  }
}
