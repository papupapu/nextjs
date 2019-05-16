import React from 'react';
import PropTypes from 'prop-types';

import Page from '../components/ui/Page';

const propTypes = {
  userAgent: PropTypes.string,
  ui: PropTypes.instanceOf(Object),
  modal: PropTypes.bool,
  modalType: PropTypes.string,
  modalData: PropTypes.instanceOf(Object),
  toggleSiteHiddenComponents: PropTypes.func,
};

const defaultProps = {
  userAgent: '',
  ui: {},
  modal: false,
  modalType: '',
  modalData: {},
  toggleSiteHiddenComponents: () => {},
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
      modal,
      modalType,
      modalData,
      toggleSiteHiddenComponents,
    } = this.props;
    const screensize = Object.keys(ui).length ? `screensize: ${ui.screenSize}` : null;
    return (
      <Page
        pageTemplate="listing"
        modal={modal}
        modalType={modalType}
        modalData={modalData}
        toggleSiteHiddenComponents={toggleSiteHiddenComponents}
      >
        <p>
          userAgent:
          {' '}
          {userAgent}
          <br />
          {screensize}
        </p>
      </Page>
    );
  }
}
Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
export default Home;
