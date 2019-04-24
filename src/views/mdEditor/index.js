import React, { Component } from 'react';
import MdPreview from '../../components/mdPreview';
import MdToolBar from '../../components/mdToolbar';
import styles from './mdEditor.less';

// 编辑器
export default class mdEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mdtextRaw: '', // 原始的编辑数据
      mdtext: '', // 当前编辑数据
      cursorPos: null // 光标位置
    };
  }

  componentDidMount = () => {
    const localtext = sessionStorage.getItem('mdtext');
    if (localtext) {
      this.setState({
        mdtext: JSON.parse(localtext)
      });
    }
  };

  // 输入框失去焦点
  textareaBlur = e => {
    this.setState({
      cursorPos: e.target.selectionStart // 光标位置
    });
  };

  // 输入框输入
  textareaChange = e => {
    let text = e.target.value;
    this.setState({
      mdtext: text
    });
    sessionStorage.setItem('mdtext', JSON.stringify(text));
  };

  // 点击快捷栏 某一功能
  onToolbarClick = toolItem => {
    let { mdtext, cursorPos } = this.state;
    // 在当前光标位置插入快捷操作符
    mdtext =
      mdtext.substring(0, cursorPos) +
      toolItem.value +
      mdtext.substring(cursorPos, mdtext.length);
    this.setState({
      mdtext
    });
    let pos;
    if (toolItem.key === 'precode' || toolItem.key === 'code') {
      pos = this.state.cursorPos + toolItem.value.length / 2;
    } else {
      pos = this.state.cursorPos + toolItem.value.length;
    }
    let textarea = document.querySelector(`.${styles.textarea}`);
    // 输入框获得焦点
    textarea.focus();
    setTimeout(() => {
      // 延迟 使得光标在当前 插入快捷方式之后 相应的位置
      textarea.setSelectionRange(pos, pos);
    }, 0);
  };

  // 恢复
  cancelEdit = () => {
    const confirm = window.confirm('确定取消吗？点击确定将不会保存！');
    if (!confirm) return;
    this.setState({
      mdtext: this.state.mdtextRaw,
      lastQuickAction: null // 清楚记录
    });
  };

  render() {
    return (
      <div className={styles.editor}>
        <h3>&nbsp;使用marked.js+highlight.js的编辑器</h3>
        <textarea
          rows="20"
          className={styles.textarea}
          placeholder="输入内容，支持markdown语法"
          value={this.state.mdtext || ''}
          onChange={this.textareaChange}
          onBlur={this.textareaBlur}
        />
        {this.state.mdtext !== this.state.mdtextRaw && (
          <button className={styles['cancel-edit']} onClick={this.cancelEdit}>
            退出编辑
          </button>
        )}
        {this.state.mdtext && <MdPreview isEdit mdtext={this.state.mdtext} />}
        <MdToolBar onToolbarClick={this.onToolbarClick} />
      </div>
    );
  }
}
