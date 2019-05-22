import React from 'react';
import PropTypes from 'prop-types';

import { isValidVar, isValidString } from '../../helpers/jsHelpers';

import './Slider.css';

const propTypes = {
  deviceType: PropTypes.string,
  viewportWidth: PropTypes.number,
};

const defaultProps = {
  deviceType: '',
  viewportWidth: 0,
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

    const updatedViewportWidth = isValidVar(props.viewportWidth)
      && props.viewportWidth !== state.viewportWidth ? props.viewportWidth : false;

    if (
      updatedDeviceType
      || updatedViewportWidth
    ) {
      return {
        deviceType: props.deviceType,
        viewportWidth: props.viewportWidth,
      };
    }
    // Return null if the state hasn't changed
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      deviceType: props.deviceType,
      viewportWidth: props.viewportWidth,
      sliderWidth: null,
      sliderCoords: 'translate(0, 0)',
      cur: 1,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      deviceType,
      viewportWidth,
      sliderCoords,
    } = this.state;

    const updatedDeviceType = nextState.deviceType !== deviceType;
    const updatedViewportWidth = nextState.viewportWidth !== viewportWidth;
    const updatedSliderCoords = 'sliderCoords' in nextState
      && isValidVar(nextState.sliderCoords)
      && nextState.sliderCoords !== sliderCoords;
    if (
      updatedDeviceType
      || updatedViewportWidth
      || updatedSliderCoords
    ) {
      if (updatedViewportWidth) {
        this.setUp(nextState.viewportWidth);
      }
      return true;
    }
    return false;
  }

  computeCoords = (viewportWidth, newItemSize = null, newCur = null) => {
    const {
      cur,
      itemSize,
    } = this.state;
    const rightCur = newCur || cur;
    const rightItemSize = newItemSize || itemSize;
    return ((viewportWidth - rightItemSize) + ((viewportWidth - rightItemSize) / 2) * -1) - (rightItemSize * rightCur);
  }

  setUp = (viewportWidth) => {
    let itemWidth = 0;
    let itemMargins = 0;
    let contentPadding = 0;
    if (viewportWidth >= 950) {
      itemMargins = 40;
      contentPadding = 50;
    }
    if (viewportWidth >= 1024) {
      const maxWidth = viewportWidth - 50;
      itemWidth = maxWidth < 1024 ? maxWidth : 1024;
      contentPadding = 50;
    }
    if (viewportWidth >= 1200) {
      const maxWidth = viewportWidth - 176;
      itemWidth = maxWidth < 1200 ? maxWidth : 1200;
    }
    const itemSize = itemWidth !== 0
      ? itemWidth + itemMargins
      : (viewportWidth - contentPadding) + itemMargins;
    const coords = this.computeCoords(viewportWidth, itemSize, null);
    this.setState({
      itemSize,
      sliderWidth: `${itemSize * (slides.length + 2)}px`,
      sliderCoords: `translate(${coords}px, 0)`,
    });
  }

  slide = () => {
    const {
      cur,
      viewportWidth,
    } = this.state;
    const newCur = cur + 1;
    const coords = this.computeCoords(viewportWidth, null, newCur);
    this.setState({
      sliderCoords: `translate(${coords}px, 0)`,
      cur: newCur,
    });
  }

  slideTemplate = slide => (
    <li
      key={`slide_${Math.random()}`}
      className={slide.cont}
    >
      {slide.cont}
    </li>
  );

  createSlides = (items) => {
    const htmlSlides = items.map(slide => this.slideTemplate(slide));
    htmlSlides.unshift(this.slideTemplate(items[items.length - 1]));
    htmlSlides.push(this.slideTemplate(items[0]));
    return htmlSlides;
  }

  render() {
    const {
      sliderWidth,
      sliderCoords,
    } = this.state;
    const items = this.createSlides(slides);
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
          style={{ '--slides-count': items.length, width: sliderWidth, transform: sliderCoords }}
        >
          {items}
        </ul>
      </div>
    );
  }
}
Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;
export default Slider;
