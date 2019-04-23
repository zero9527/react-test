import React, { Component } from 'react';
import MdPreview from '../../components/mdPreview';
import styles from './note-detail.less';

export default class NoteDetail extends Component {
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

  render() {
    return (
      <div className={styles['note-detail']}>
        <h3>详情</h3>
        {this.state.mdtext && <MdPreview isDetail mdtext={this.state.mdtext} />}
        <button
          className={styles.edit}
          onClick={() => this.props.history.push('/mdEditor')}
        >
          编辑
        </button>
      </div>
    );
  }
}
