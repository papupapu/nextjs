import React from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';

import '../style/test.css';

const propTypes = {
  userAgent: PropTypes.string,
  ui: PropTypes.instanceOf(Object),
};

const defaultProps = {
  userAgent: '',
  ui: {},
};

class Home extends React.Component {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    return { userAgent };
  }

  render() {
    const {
      userAgent,
      ui,
    } = this.props;
    const screensize = Object.keys(ui).length ? `screensize: ${ui.screenSize}` : null;
    return (
      <React.Fragment>
        <Header/>
        <div className="test">
          userAgent:
          {' '}
          {userAgent}
          <br />
          {screensize}
        </div>
        </React.Fragment>
    );
  }
}
Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
export default Home;
