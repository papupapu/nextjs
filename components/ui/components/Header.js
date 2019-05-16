import React from 'react';
import PropTypes from 'prop-types';

import Hamburger from './icons/Hamburger';

const propTypes = {
  toggleSiteHiddenComponents: PropTypes.func,
};

const defaultProps = {
  toggleSiteHiddenComponents: () => {},
};

const Header = ({ toggleSiteHiddenComponents }) => (
  <header id="header">
    <div className="sw">
      <button
        type="button"
        className="menu_handle"
        onClick={
          (e) => {
            toggleSiteHiddenComponents(e, {});
          }
        }
      >
        {Hamburger()}
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
