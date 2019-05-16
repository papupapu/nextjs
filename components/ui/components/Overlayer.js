import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  action: PropTypes.func,
};

const defaultProps = {
  action: () => {},
};

const Overlayer = ({ action }) => (
  <div className="overlayer">
    <button
      type="button"
      href={null}
      alt=""
      onClick={(e) => { e.preventDefault(); action(e); }}
    />
  </div>
);

Overlayer.propTypes = propTypes;
Overlayer.defaultProps = defaultProps;
export default Overlayer;
