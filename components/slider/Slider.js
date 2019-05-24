import React from 'react';
import PropTypes from 'prop-types';

import { isValidVar, isValidString } from '../../helpers/jsHelpers';

import './Slider.css';

const propTypes = {
  slides: PropTypes.instanceOf(Array),
  screenSize: PropTypes.string,
  viewportWidth: PropTypes.number,
};

const defaultProps = {
  slides: [],
  screenSize: '',
  viewportWidth: 0,
};

class Slider extends React.Component {
  static getDerivedStateFromProps(props, state) {
    const updatedScreensize = isValidString(props.screenSize)
      && props.screenSize !== state.screenSize ? props.screenSize : false;

    const updatedViewportWidth = isValidVar(props.viewportWidth)
      && props.viewportWidth !== state.viewportWidth ? props.viewportWidth : false;

    if (
      updatedScreensize
      || updatedViewportWidth
    ) {
      return {
        screenSize: props.screenSize,
        viewportWidth: props.viewportWidth,
      };
    }
    // Return null if the state hasn't changed
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      screenSize: props.screenSize,
      viewportWidth: props.viewportWidth,
      cur: 1,
      clonesForLoop: 2,
      ready: false,
      sliderWidth: null,
      sliderCoords: null,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      screenSize,
      viewportWidth,
      sliderCoords,
    } = this.state;
    const updatedScreensize = nextState.screenSize !== screenSize;
    const updatedViewportWidth = nextState.viewportWidth !== viewportWidth;
    const updatedSliderCoords = 'sliderCoords' in nextState
      && isValidVar(nextState.sliderCoords)
      && nextState.sliderCoords !== sliderCoords;
    if (
      updatedScreensize
      || updatedViewportWidth
      || updatedSliderCoords
    ) {
      if (updatedViewportWidth) {
        this.setUp(nextState.viewportWidth, nextState.screenSize);
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
    return (
      (viewportWidth - rightItemSize)
      + ((viewportWidth - rightItemSize) / 2)
      * -1
    )
    - (rightItemSize * rightCur);
  }

  setUp = (viewportWidth, screenSize) => {
    const {
      slides,
    } = this.props;
    const {
      cur,
      ready,
      clonesForLoop,
    } = this.state;
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
    const clonesForLoopCheck = screenSize === 'xl' || screenSize === 'xxl'
      ? 4
      : 2;
    const coords = this.computeCoords(viewportWidth, itemSize, null);
    this.setState({
      ready: true,
      itemSize,
      clonesForLoop: clonesForLoopCheck,
      sliderWidth: `${itemSize * (slides.length + clonesForLoopCheck)}px`,
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

  createSlides = (items, clonesForLoop) => {
    const htmlSlides = items.map(slide => this.slideTemplate(slide));
    htmlSlides.unshift(this.slideTemplate(items[items.length - 1]));
    htmlSlides.push(this.slideTemplate(items[0]));
    if (clonesForLoop === 4) {
      htmlSlides.unshift(this.slideTemplate(items[items.length - 2]));
      htmlSlides.push(this.slideTemplate(items[1]));
    }
    return htmlSlides;
  }

  render() {
    const {
      slides,
    } = this.props;
    const {
      ready,
      sliderWidth,
      sliderCoords,
      clonesForLoop,
    } = this.state;
    const items = this.createSlides(slides, clonesForLoop);
    if (ready) {
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
    return (
      <section>
        <article>one</article>
        <article>one</article>
        <article>one</article>
      </section>
    );
  }
}
Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;
export default Slider;
