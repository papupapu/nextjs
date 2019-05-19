import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  toggleSiteHiddenComponents: PropTypes.func,
};

const defaultProps = {
  toggleSiteHiddenComponents: () => {},
};

const Header = ({ toggleSiteHiddenComponents }) => (
  <header id="header">
    <div className="sw">
      <div className="logo" />
      <button
        type="button"
        className="hamburger menu_handle"
        onClick={
          (e) => {
            toggleSiteHiddenComponents(e, {});
          }
        }
      >
        <span className="hamburger-box">
          <span className="hamburger-inner" />
        </span>
      </button>
      <button
        type="button"
        id="login"
        className="modal_handle"
        onClick={
          (e) => {
            toggleSiteHiddenComponents(e, {});
          }
        }
      >
        login
      </button>
    </div>
  </header>
);
Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
export default Header;
