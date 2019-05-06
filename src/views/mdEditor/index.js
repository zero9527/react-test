import React, { Component } from 'react';
import MdPreview from '../../components/mdPreview';
import MdToolBar from '../../components/mdToolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './mdEditor.less';

// 编辑器
export default class mdEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mdtextRaw: '', // 原始的编辑数据
      mdtext: '', // 当前编辑数据
      cursorPos: null, // 光标位置
      cursorHandTop: null //输入光标距顶部的距离
    };
  }

  componentDidMount = () => {
    const localtext = localStorage.getItem('mdtext');
    if (localtext) {
      this.setState({
        mdtext: JSON.parse(localtext),
        mdtextRaw: JSON.parse(localtext)
      });
    } else {
      fetch('./_promise_This_is.md')
        .then(res => res.text())
        .then(res => {
          this.setState({
            mdtext: res
          });
        });
    }
  };

  // 输入框获得焦点
  textareaClick = e => {
    this.setState({
      cursorHandTop: e.clientY - 6
    });
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
    localStorage.setItem('mdtext', JSON.stringify(text));
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
    let cursorPosStart, cursorPosEnd; // 光标起始、结束位置
    let textarea = document.querySelector(`.${styles.textarea}`);
    if (
      toolItem.key === 'precode' ||
      toolItem.key === 'code' ||
      toolItem.key === 'bold'
    ) {
      // 代码
      cursorPosStart = cursorPosEnd =
        this.state.cursorPos + toolItem.value.length / 2;
    } else if (toolItem.key === 'link') {
      // 链接
      cursorPosStart = this.state.cursorPos + 7;
      cursorPosEnd = this.state.cursorPos + toolItem.value.length - 1;
    } else if (toolItem.key === 'pic') {
      // 图片
      cursorPosStart = this.state.cursorPos + 15;
      cursorPosEnd = this.state.cursorPos + toolItem.value.length - 1;
    } else {
      // 其他
      cursorPosStart = cursorPosEnd =
        this.state.cursorPos + toolItem.value.length;
    }
    setTimeout(() => {
      // 延迟 使得光标在当前 插入快捷方式之后 相应的位置或选中相应的文本
      textarea.setSelectionRange(cursorPosStart, cursorPosEnd);
      // 输入框获得焦点
      textarea.focus();
    }, 0);
  };

  // 恢复
  cancelEdit = () => {
    const confirm = window.confirm('确定取消吗？点击确定将不会保存！');
    if (!confirm) return;
    localStorage.setItem('mdtext', JSON.stringify(this.state.mdtextRaw));
    this.setState({
      mdtext: this.state.mdtextRaw
    });
  };

  render() {
    const { cursorHandTop } = this.state;
    return (
      <div className={`center-content ${styles.editor}`}>
        <h3 className={styles.title}>使用marked.js+highlight.js的编辑器</h3>
        <textarea
          rows="20"
          className={styles.textarea}
          placeholder="输入内容，支持markdown语法"
          value={this.state.mdtext || ''}
          onClick={e => this.textareaClick(e)}
          onChange={this.textareaChange}
          onBlur={this.textareaBlur}
        />
        {cursorHandTop !== null && (
          <FontAwesomeIcon
            icon={faFeatherAlt}
            className={styles.cursor}
            style={{ top: cursorHandTop }}
          />
        )}
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
