import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import styles from './export.less';

// 导出md文件、生成图片(html2canvas)
export default function Export() {
  const [offsetW, setOffsetW] = useState(0);
  const [offsetH, setOffsetH] = useState(0);
  const [pngUrl, setPngUrl] = useState('');
  const [mdUrl, setMdUrl] = useState('');
  const [exportName, setExportName] = useState('');
  let preview, maxCodeWidth;

  useEffect(() => {
    // 显示的内容
    preview = document.querySelector('[class^=md-content]');
    // 获取 code 部分的最大宽度，防止导出图片时，横向滚动条的部分截断
    let codeContent = preview.querySelectorAll('pre>code');
    let codeWidth = Array.from(codeContent).map(codeTag => codeTag.offsetWidth);
    maxCodeWidth = Math.max(...codeWidth);
    setOffsetW(maxCodeWidth);
    setOffsetH(preview.offsetHeight);

    exportfn('png');
    exportfn('md');

    // 回调的函数会在 unmount 时执行
    return () => console.log('Export unmount');

    // 传入第二个参数， 防止 update 时执行
  }, []);

  // 导出处理
  const exportfn = type => {
    // type: 'md'/'png'
    // 设置文件名称
    setExportName(preview.textContent.substr(0, 16).replace(' ', '_'));

    // 导出图片
    if (type === 'png') {
      html2canvas(preview, {
        scale: 1, // window.devicePixelRatio
        // 截取的window宽度，使得横向滚动条不出现，避免截取丢失滚动条之外的内容
        windowWidth: maxCodeWidth + 80,
        useCORS: true // 图片跨域
      }).then(function(canvas) {
        let temppng = canvas.toDataURL('image/png');
        setPngUrl(temppng);
      });
    }
    // 导出 md文件
    else if (type === 'md') {
      let URL = window.URL || window.webkitURL || window.mozURL;
      let md = localStorage.getItem('mdtext');
      let tempmd = new Blob([JSON.parse(md)], {
        type: 'application/markdown'
      });
      setMdUrl(URL.createObjectURL(tempmd));
    }
  };

  return (
    <div className={styles.export}>
      <canvas
        className={styles['export-canvas']}
        width={offsetW}
        height={offsetH}
      />
      {mdUrl && exportName && (
        <a
          className={styles['export-btn']}
          href={mdUrl}
          download={exportName + '.md'}
        >
          <button>导出md文件</button>
        </a>
      )}
      {pngUrl && exportName && (
        <a
          className={styles['export-btn']}
          href={pngUrl}
          download={exportName + '.png'}
        >
          <button>导出图片</button>
        </a>
      )}
    </div>
  );
}
