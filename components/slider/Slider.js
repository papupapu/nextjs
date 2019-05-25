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
      buttonsCoords: null,
      sliderClassName: null,
      sliderWidth: null,
      sliderCoords: null,      
    };
    this.sliderClassName = null;
    this.sliderWidth = null;
    this.sliderCoords = null;

    this.dragStartX = 0;
    this.dragStartY = 0;
    this.dragDeltaX = 0;
    this.dragDeltaY = 0;
    this.dragDirection = '';
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      ready,
      screenSize,
      viewportWidth,
    } = this.state;
    const isSliderReady = nextState.ready !== ready;
    const updatedScreensize = nextState.screenSize !== screenSize;
    const updatedViewportWidth = nextState.viewportWidth !== viewportWidth;
    if (
      isSliderReady
      || updatedScreensize
      || updatedViewportWidth
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
      ready,
    } = this.state;
    const isWideScreen = currentScreenSize === 'xl' || currentScreenSize === 'xxl';
    const hasButtons = currentScreenSize === 'lg' || isWideScreen;
    const itemSize = this.computeItemSize(viewportWidth);
    const rightClonesForLoop = isWideScreen ? 4 : 2;
    const rightCur = this.computeCurrentSlideIndex(cur, clonesForLoop, rightClonesForLoop);
    const buttonsCoords = hasButtons ? this.computeButtonsCoords(viewportWidth, itemSize) : null;
    const coords = this.computeCoords(viewportWidth, itemSize, rightCur);
    if (!ready) {
      this.setState(
        {
          ready: true,
          cur: rightCur,
          itemSize,
          clonesForLoop: rightClonesForLoop,
          buttonsCoords,
          sliderClassName: 'noTransition',
          sliderWidth: `${itemSize * (slides.length + rightClonesForLoop)}px`,
          sliderCoords: `translate(${coords}px, 0)`,
        },
      );
    } else {
      this.slider.classList.add('noTransition');
      this.slider.style.width = `${itemSize * (slides.length + rightClonesForLoop)}px`;
      this.slider.tranform = `translate(${coords}px, 0)`;
      this.setState(
        {
          cur: rightCur,
          itemSize,
          clonesForLoop: rightClonesForLoop,
          buttonsCoords,
        },
      );
    }
  }

  goToSlide = (newCur = null) => {
    const {
      cur,
      viewportWidth,
    } = this.state;
    const rightCur = newCur || cur;
    const coords = this.computeCoords(viewportWidth, null, rightCur);
    if (newCur) {
      this.slider.classList.add('noTransition');
    } else if (this.slider.classList.contains('noTransition')) {
      this.slider.classList.remove('noTransition');
    }
    this.slider.style.transform = `translate(${coords}px, 0)`;
    this.setState(
      {
        cur: rightCur,
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
    if (this.slider.classList.contains('noTransition')) {
      this.slider.classList.remove('noTransition');
    }
    this.slider.style.transform = `translate(${coords}px, 0)`;
    this.setState(
      {
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
    this.dragStartX = touches.pageX;
    this.dragStartY = touches.pageY;
  }

  touchMove(event) {
    const {
      cur,
      viewportWidth,
    } = this.state;
    const touches = event.touches[0];
    const deltaY = touches.pageY - this.dragStartY;
    const deltaX = touches.pageX - this.dragStartX;
    if (Math.abs(deltaY) > 5 && Math.abs(deltaY) > Math.abs(deltaX) / 2) {
      this.dragDeltaX = 0;
    } else {
      // disableScroll();
      this.dragDirection = deltaX < 0 ? 'next' : 'prev';
      this.dragDeltaX = deltaX;
      const coords = deltaX + this.computeCoords(viewportWidth, null, cur);
      this.slider.classList.add('noTransition');
      this.slider.style.transform = `translate(${coords}px,0)`;
    }
  }

  touchEnd() {
    // enableScroll();
    this.slider.style.transform = '';
    if (Math.abs(this.dragDeltaX) > 100) {
      this.slide(this.dragDirection);
    } else {
      this.goToSlide();
    }
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.dragDeltaX = 0;
    this.dragDirection = '';
  }

  render() {
    const {
      slides,
    } = this.props;
    const {
      ready,
      clonesForLoop,
      buttonsCoords,
      sliderClassName,
      sliderWidth,
      sliderCoords,
    } = this.state;
    if (ready) {
      const items = this.createSlides(slides, clonesForLoop);
      return (
        <div
          className="slider"
          onTouchStart={
            (e) => {
              this.touchStart(e);
            }
          }
          onTouchMove={
            (e) => {
              this.touchMove(e);
            }
          }
          onTouchEnd={
            () => {
              this.touchEnd();
            }
          }
        >
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
            ref={(slider) => { this.slider = slider; }}
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
