import React from 'react';
import PropTypes from 'prop-types';

import { isValidVar, isValidString } from '../../helpers/jsHelpers';

import './Slider.css';

const propTypes = {
  deviceType: PropTypes.string,
};

const defaultProps = {
  deviceType: '',
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

class Slider extends React.Component {
  static getDerivedStateFromProps(props, state) {
    const updatedDeviceType = isValidString(props.deviceType)
      && props.deviceType !== state.deviceType ? props.deviceType : false;

    if (updatedDeviceType) {
      return {
        deviceType: props.deviceType,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      deviceType: props.deviceType,
      sliderCoords: 'translate(0, 0)',
      cur: 1,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      deviceType,
      sliderCoords,
    } = this.state;

    const updatedDeviceType = nextState.deviceType !== deviceType;
    const updatedSliderCoords = 'sliderCoords' in nextState
      && isValidVar(nextState.sliderCoords)
      && nextState.sliderCoords !== sliderCoords;
    if (
      updatedDeviceType
      || updatedSliderCoords
    ) {
      return true;
    }
    return false;
  }

  slide = () => {
    const {
      cur,
    } = this.state;
    this.setState({
      sliderCoords: `translate(${((cur * 100) / 3) * -1}%, 0)`,
      cur: cur + 1,
    });
  }

  render() {
    const {
      sliderCoords,
    } = this.state;
    return (
      <div
        className="slider"
        onClick={
          (e) => {
            this.slide();
          }
        }
      >
        <ul
          style={{ transform: sliderCoords }}
        >
          <li className="one">
            1
          </li>
          <li className="two">2</li>
          <li className="three">3</li>
        </ul>
      </div>
    );
  }
}
Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;
export default Slider;
