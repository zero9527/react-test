import React, { Component } from 'react';
import styles from './md-toolbar.less';

// 快捷操作栏
export default class MdToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 点击事件
  toolHandler = item => {
    this.props.onToolbarClick(item);
  };

  render() {
    const toolbar = [
      {
        key: 'pic',
        value: '![图片加载失败显示的名称](图片地址)',
        label: '图片'
      },
      {
        key: 'link',
        value: '[链接名称](链接地址)',
        label: '链接'
      },
      {
        key: 'title1',
        value: '\n# ',
        label: '一级标题'
      },
      {
        key: 'title2',
        value: '\n## ',
        label: '二级标题'
      },
      {
        key: 'ul',
        value: '\n* ',
        label: '无序列表'
      },
      {
        key: 'ol',
        value: '\n1. ',
        label: '有序列表'
      },
      {
        key: 'precode',
        value: '\n```\n\n```\n',
        label: '代码块'
      },
      {
        key: 'code',
        value: '``',
        label: '代码段'
      }
    ];

    return (
      <div className={styles['md-toolbar']}>
        {toolbar.map(item => (
          <div
            key={item.key}
            className={styles['tool-item']}
            onClick={() => this.toolHandler(item)}
          >
            {item.label}
          </div>
        ))}
      </div>
    );
  }
}
