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

const slides = [
  {
    cont: 'one',
  },
  {
    cont: 'two',
  },
  {
    cont: 'three',
  },
];

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
    const screenSize = 'screenSize' in ui ? `screenSize: ${ui.screenSize}` : null;
    const deviceType = 'deviceType' in ui ? `deviceType: ${ui.deviceType}` : null;
    const viewport = 'viewport' in ui ? `viewportWidth: ${ui.viewport.width}` : null;
    const viewportWidth = 'viewport' in ui ? ui.viewport.width : null;
    return (
      <Page
        pageTemplate="listing"
        modal={modal}
        modalType={modalType}
        modalData={modalData}
        toggleSiteHiddenComponents={toggleSiteHiddenComponents}
      >
        {
          slides
            && (
              <div className="splash">
                <Slider
                  slides={slides}
                  screenSize={ui.screenSize}
                  viewportWidth={viewportWidth}
                />
              </div>
            )
        }
        <div className="sw listing">
          <section className="main">
            <div>
              userAgent:
              {' '}
              {userAgent}
              <br />
              <h1>{screenSize}</h1>
              <h1>{deviceType}</h1>
              <h1>{viewport}</h1>
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
