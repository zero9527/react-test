import React, { Component } from 'react';
import MdPreview from '../../components/mdPreview';
import MdToolBar from '../../components/mdToolbar';
import styles from './mdEditor.less';

// 编辑器
export default class mdEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mdtext: null
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

  back = () => {
    this.props.history.push('/t1');
  };

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
      mdtext: data
    });
    setTimeout(() => {
      // 延迟 使得输入框滚动条在最下面
      // 输入框获得焦点
      document.querySelector(`.${styles.textarea}`).focus();
    }, 100);
  };

  // 撤销功能（只一步）
  unDo = () => {
    console.log('撤销成功！');
  };

  render() {
    return (
      <div className={styles.editor}>
        <h3>使用marked.js+highlight.js的编辑器</h3>
        <textarea
          rows="20"
          className={styles.textarea}
          placeholder="输入内容，支持markdown语法"
          value={this.state.mdtext || ''}
          onChange={this.textareaChange}
        />
        <button className={styles.undo} onClick={this.unDo}>
          撤销
        </button>
        {this.state.mdtext && <MdPreview isEdit mdtext={this.state.mdtext} />}
        <MdToolBar onToolbarClick={this.onToolbarClick} />
      </div>
    );
  }
}
