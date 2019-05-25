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
      sliderClassName: null,
      sliderWidth: null,
      sliderCoords: null,
      buttonsCoords: null,
    };
    this.startX = 0;
    this.startY = 0;
    this.deltaX = 0;
    this.deltaY = 0;
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

  computeItemSize = (viewportWidth) => {
    let itemWidth = 0;
    let itemMargins = 0;
    let contentPadding = 0;
    if (viewportWidth >= 950) {
      itemMargins = 40;
      contentPadding = 50;
    }
    if (viewportWidth >= 1024) {
      const maxWidth = viewportWidth - contentPadding;
      itemWidth = maxWidth < 1024 ? maxWidth : 1024;
    }
    if (viewportWidth >= 1200) {
      contentPadding = 176;
      const maxWidth = viewportWidth - contentPadding;
      itemWidth = maxWidth < 1200 ? maxWidth : 1200;
    }
    return itemWidth !== 0
      ? itemWidth + itemMargins
      : (viewportWidth - contentPadding) + itemMargins;
  }

  computeCurrentSlideIndex = (cur, clonesForLoop, rightClonesForLoop) => {
    let rightCur = cur;
    if (clonesForLoop !== rightClonesForLoop) {
      rightCur = rightClonesForLoop > clonesForLoop ? rightCur + 1 : rightCur - 1;
    }
    return rightCur;
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

  computeButtonsCoords = (viewportWidth, itemSize) => {
    const coords = {};
    const center = (viewportWidth / 2) - 30;
    coords.prevButton = center - (itemSize / 2) + 20;
    coords.nextButton = center + (itemSize / 2) - 20;
    return coords;
  }

  setUp = (viewportWidth, currentScreenSize) => {
    const {
      slides,
    } = this.props;
    const {
      cur,
      clonesForLoop,
    } = this.state;
    const isWideScreen = currentScreenSize === 'xl' || currentScreenSize === 'xxl';
    const hasButtons = currentScreenSize === 'lg' || isWideScreen;
    const itemSize = this.computeItemSize(viewportWidth);
    const rightClonesForLoop = isWideScreen ? 4 : 2;
    const rightCur = this.computeCurrentSlideIndex(cur, clonesForLoop, rightClonesForLoop);
    const buttonsCoords = hasButtons ? this.computeButtonsCoords(viewportWidth, itemSize) : null;
    const coords = this.computeCoords(viewportWidth, itemSize, rightCur);
    this.setState({
      ready: true,
      cur: rightCur,
      itemSize,
      clonesForLoop: rightClonesForLoop,
      sliderClassName: 'noTransition',
      sliderWidth: `${itemSize * (slides.length + rightClonesForLoop)}px`,
      sliderCoords: `translate(${coords}px, 0)`,
      buttonsCoords,
    });
  }

  goToSlide = (cur) => {
    const {
      viewportWidth,
    } = this.state;
    const coords = this.computeCoords(viewportWidth, null, cur);
    this.setState(
      {
        sliderClassName: 'noTransition',
        sliderCoords: `translate(${coords}px, 0)`,
        cur,
      },
    );
  }

  slide = (dir) => {
    const {
      slides,
    } = this.props;
    const {
      cur,
      clonesForLoop,
      viewportWidth,
    } = this.state;
    const newCur = dir === 'next' ? cur + 1 : cur - 1;
    const coords = this.computeCoords(viewportWidth, null, newCur);
    const adjustToLoopClones = clonesForLoop === 4 ? 1 : 0;
    const shouldGoToFirstSlide = newCur === ((slides.length - 1) + clonesForLoop) - adjustToLoopClones;
    const shouldGoToLastSlide = newCur === adjustToLoopClones;
    this.setState(
      {
        sliderClassName: null,
        sliderCoords: `translate(${coords}px, 0)`,
        cur: newCur,
      },
      () => {
        if (shouldGoToFirstSlide) {
          const firstSlide = clonesForLoop === 4 ? 2 : 1;
          setTimeout(
            () => {
              this.goToSlide(firstSlide);
            },
            301,
          );
        } else if (shouldGoToLastSlide) {
          const lastSlide = clonesForLoop === 4 ? slides.length + 1 : slides.length;
          setTimeout(
            () => {
              this.goToSlide(lastSlide);
            },
            301,
          );
        }
      },
    );
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

  touchStart(event) {
    const touches = event.touches[0];
    this.startX = touches.pageX;
    this.startY = touches.pageY;
  }

  touchMove(event) {
    const touches = event.touches[0];
    const deltaY = touches.pageY - this.startY;
    const deltaX = touches.pageX - this.startX;
    if (Math.abs(deltaY) > 5 && Math.abs(deltaY) > Math.abs(deltaX) / 2) {
      this.deltaX = 0;
    } else {
      // disableScroll();
      this.dir = deltaX < 0 ? 'next' : 'prev';
      if ((this.dir === 'next' && this.cur < this.tot - 1) || (this.dir === 'prev' && this.cur > 0)) {
        this.deltaX = deltaX;
        const coords = deltaX + ((this.state.sizes[0] * this.cur) * -1);
        this.slider.style.transform = `translate(${coords}px,0)`;
      }
    }
  }

  touchEnd() {
    // enableScroll();
    if (Math.abs(this.deltaX) > this.state.sizes[0] / 4) {
      this.handleClick(this.dir);
    } else {
      this.sliderGoToCoords();
    }
    this.startX = 0;
    this.startY = 0;
    this.deltaX = 0;
  }

  render() {
    const {
      slides,
    } = this.props;
    const {
      ready,
      sliderClassName,
      sliderWidth,
      sliderCoords,
      clonesForLoop,
      buttonsCoords,
    } = this.state;
    if (ready) {
      const items = this.createSlides(slides, clonesForLoop);
      return (
        <div className="slider">
          {
            buttonsCoords
              && (
                <button
                  type="button"
                  style={{ left: buttonsCoords.prevButton }}
                  onClick={
                    () => {
                      this.slide('prev');
                    }
                  }
                >
                  aaa
                </button>
              )
          }
          <ul
            className={sliderClassName}
            style={{ width: sliderWidth, transform: sliderCoords }}
          >
            {items}
          </ul>
          {
            buttonsCoords
              && (
                <button
                  type="button"
                  style={{ left: buttonsCoords.nextButton }}
                  onClick={
                    () => {
                      this.slide('next');
                    }
                  }
                >
                  aaa
                </button>
              )
          }
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
