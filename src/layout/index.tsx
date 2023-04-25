/* eslint-disable max-len */
import React from 'react';
import './index.less';
import { LayoutHeader } from './header';
import { LayoutMenu } from './menu';
import { LayoutContainer } from './container';

function PageLayout(props) {
  return (
    <div className="app">
      {/* <div className="dark-light">
        <svg
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      </div> */}
      <LayoutHeader />
      <div className="wrapper">
        {/* <LayoutMenu /> */}
        <LayoutContainer>{props.children}</LayoutContainer>
      </div>
    </div>
  );
}

export default PageLayout;
