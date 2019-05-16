import React from 'react';

function Close() {
  const d = 'm352.546104 44.5461039h8.181818v-1.6363637h-8.181818v-8.1818181h-1.636364v8.1818181h-8.181818v1.6363637h8.181818v8.1818182h1.636364z';
  const transform = 'matrix(.707106781187 .707106781187 -.707106781187 .707106781187 -210.060966605457 -271.901586952249)';
  return (
    <svg width="15" height="15" viewBox="0 0 15 15">
      <path
        d={d}
        fillRule="evenodd"
        transform={transform}
      />
    </svg>
  );
}

export default Close;
