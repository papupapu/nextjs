import React from 'react';
import App, { Container } from 'next/app';

import UIHandler from '../components/ui/UIHandler';

class MyApp extends App {
  render() {
    const { Component, ...pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default UIHandler(MyApp);
