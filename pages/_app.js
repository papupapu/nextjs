import React from 'react';
import App, { Container } from 'next/app';

import { userDevice } from '../helpers/DOMHelpers';


const UIHandler = Comp => class extends React.Component {
  static async getInitialProps(args) {
    const userAgent = args.ctx.req ? args.ctx.req.headers['user-agent'] : navigator.userAgent;
    const componentPropsFromFetch = Comp.getInitialProps ? await Comp.getInitialProps(args) : null;
    return { userAgent, componentPropsFromFetch };
  }

  constructor(props) {
    super(props);
    this.state = {
      ui: {},
    };
  }

  componentDidMount() {
    this.setState({ ui: userDevice() });
    window.addEventListener('resize', this.computeUiInfos, false);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.computeUiInfos, false);
  }

  setUiInfos = (ui) => {
    this.setState({
      ui,
    });
  }

  computeUiInfos = () => {
    const updatedUi = userDevice();
    this.setUiInfos(updatedUi);
  }

  render() {
    const pageProps = Object.assign({}, this.props, this.state);
    return (
      <Comp {...pageProps} />
    );
  }
};


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
