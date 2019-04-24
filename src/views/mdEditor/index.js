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
      mdtext: '' // 当前编辑数据
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

  // 输入框输入
  textareaChange = e => {
    let text = e.target.value;
    this.setState({
      mdtext: text
    });
    sessionStorage.setItem('mdtext', JSON.stringify(text));
  };

  // 点击快捷栏 某一功能
  onToolbarClick = value => {
    let data = this.state.mdtext + value;
    this.setState({
      mdtext: data,
      lastQuickAction: value
    });
    setTimeout(() => {
      // 延迟 使得输入框滚动条在最下面
      // 输入框获得焦点
      document.querySelector(`.${styles.textarea}`).focus();
    }, 100);
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
