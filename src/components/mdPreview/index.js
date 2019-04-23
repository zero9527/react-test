import React, { Component } from 'react';

import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
// import 'highlight.js/styles/googlecode.css';
// import 'highlight.js/styles/darcula.css';
// import 'highlight.js/styles/github.css';
import 'highlight.js/styles/atom-one-light.css';
import styles from './md-preview.less';

const marked = require('marked');

// 使用marked.js+highlight.js的编辑器
export default class MdPreview extends Component {
  constructor(props) {
    super(props);
    this.markedInit();
    this.state = {
      previewVisible: false
    };
  }

  componentDidMount = () => {};

  // marked初始化
  markedInit = () => {
    hljs.registerLanguage('javascript', javascript);
    // Set options
    // `highlight` example uses `highlight.js`
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });
  };

  // 显示、关闭预览
  previewHandler = () => {
    this.setState({
      previewVisible: !this.state.previewVisible
    });
  };

  render() {
    // props.isEdit：是否编辑
    // prop.isDetail：是否浏览详情
    return (
      <div
        className={`${styles['md-container']} ${
          this.props.isEdit ? styles['md-preview'] : styles['md-detail']
        }`}
      >
        {(this.props.isDetail || this.state.previewVisible) && (
          <section
            text="注意：实际显示效果可能会有出入！"
            className={styles['md-content']}
            dangerouslySetInnerHTML={{
              __html: marked(this.props.mdtext)
            }}
          />
        )}
        {this.props.isEdit && (
          <button
            className={styles['handle-btn']}
            onClick={this.previewHandler}
          >
            {this.state.previewVisible ? '关闭预览' : '显示预览'}
          </button>
        )}
      </div>
    );
  }
}
