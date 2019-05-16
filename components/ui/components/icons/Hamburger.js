import React from 'react';

const Hamburger = () => (
  <svg className="hamburger" height="15" viewBox="0 0 15 15" width="15" xmlns="http://www.w3.org/2000/svg">
    <g fill="none" fillRule="evenodd">
      <path className="a" d="m0 3h15v1.5h-15z" fillRule="evenodd" />
      <path className="b" d="m0 7h15v1.5h-15z" fillRule="evenodd" />
      <path className="c" d="m0 11h15v1.5h-15z" fillRule="evenodd" />
      <path className="white" d="m0 .5h15v2.5h-15z" fill="#fff" />
      <path className="white" d="m0 12.5h15v2.5h-15z" fill="#fff" />
    </g>
  </svg>
);

export default Hamburger;
