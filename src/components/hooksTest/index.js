import React, { useState } from 'react';

// 函数式组件 使用 hooks: useState
export default function HooksTest() {
  const [name, setName] = useState('haha');

  const nameChange = e => setName(e.target.value);

  return (
    <div>
      <h3>hooks test</h3>
      <p>{name}</p>
      <input value={name} onChange={nameChange} />
    </div>
  );
}
