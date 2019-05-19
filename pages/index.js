import React from 'react';
import PropTypes from 'prop-types';

import Page from '../components/ui/Page';
import Slider from '../components/slider/Slider';

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
    const deviceType = screensize ? `deviceType: ${ui.deviceType}` : null;
    return (
      <Page
        pageTemplate="listing"
        modal={modal}
        modalType={modalType}
        modalData={modalData}
        toggleSiteHiddenComponents={toggleSiteHiddenComponents}
      >
        <div className="splash">
          <Slider
            deviceType={ui.deviceType}
          />
        </div>
        <div className="sw listing">
          <section className="main">
            <div>
              userAgent:
              {' '}
              {userAgent}
              <br />
              <h1>{screensize}</h1>
              <h2>{deviceType}</h2>
            </div>
          </section>
          <aside className="aside">
            aside
          </aside>
        </div>
      </Page>
    );
  }
}
Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
export default Home;
