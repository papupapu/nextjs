import React from 'react';
import PropTypes from 'prop-types';

import Header from './components/Header';
import Sitenav from './components/Sitenav';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Overlayer from './components/Overlayer';

import './style/Page.css';

const propTypes = {
  children: PropTypes.instanceOf(Object),
  pageTemplate: PropTypes.string,
  modal: PropTypes.bool,
  modalType: PropTypes.string,
  modalData: PropTypes.instanceOf(Object),
  toggleSiteHiddenComponents: PropTypes.func,
};

const defaultProps = {
  children: null,
  pageTemplate: '',
  modal: false,
  modalType: '',
  modalData: {},
  toggleSiteHiddenComponents: () => {},
};

const Page = (
  {
    children,
    pageTemplate,
    modal,
    modalType,
    modalData,
    toggleSiteHiddenComponents,
  },
) => {
  if (pageTemplate === 'fullpage') {
    return (
      <React.Fragment>
        <div id="fullpage">
          {children}
        </div>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Header
        toggleSiteHiddenComponents={toggleSiteHiddenComponents}
      />
      <Sitenav />
      <div id="content">
        <div className="sw">
          {children}
        </div>
      </div>
      <Footer />
      {
        modal
        && (
          <Modal
            type={modalType}
            data={modalData}
            close={toggleSiteHiddenComponents}
          />
        )
      }
      {Overlayer({ action: toggleSiteHiddenComponents })}
    </React.Fragment>
  );
};
Page.propTypes = propTypes;
Page.defaultProps = defaultProps;
export default Page;
