import React from 'react';

import { userDevice } from '../../helpers/DOMHelpers';

const UIHandler = Comp => class UIHandlerComponent extends React.Component {
  static async getInitialProps(args) {
    const userAgent = args.ctx.req ? args.ctx.req.headers['user-agent'] : navigator.userAgent;
    const componentPropsFromFetch = Comp.getInitialProps ? await Comp.getInitialProps(args) : null;
    return { userAgent, componentPropsFromFetch };
  }

  constructor(props) {
    super(props);
    this.state = {
      ui: {},
      menu: false,
      modal: false,
      modalType: '',
      modalData: {},
    };
    this.uiHiddenComponents = ['menu', 'modal'];
  }

  componentDidMount() {
    this.setState({ ui: userDevice() });
    window.addEventListener('resize', this.computeUiInfos, false);
    this.doc = document.body;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.computeUiInfos, false);
  }

  setUiInfos = (ui) => {
    this.setState({
      ui,
    });
  }

  computeUiInfos = () => {
    const {
      menu,
    } = this.state;
    const updatedUi = userDevice();
    if (
      (
        updatedUi.screenSize === 'lg'
        || updatedUi.screenSize === 'xl'
      )
      && menu
    ) {
      this.toggleSiteHiddenComponents({ target: { className: 'menu_handle' } }, null);
    }
    this.setUiInfos(updatedUi);
  }

  toggleSiteHiddenComponents = (evt, obj) => {
    if (this.doc !== null) {
      const {
        menu,
        modal,
      } = this.state;
      const docClass = this.doc.classList;
      let action;
      if (evt.target.classList && evt.target.classList.length > 1) {
        evt.target.classList.forEach(
          (el) => {
            if (el.indexOf('_handle') > -1) {
              action = el;
            }
          },
        );
      } else {
        action = evt.target.className;
      }
      let updateModalState = false;
      let isMenu = false;
      if (action.indexOf('_handle') > -1) {
        action = action.replace('_handle', '_open');
        updateModalState = action === 'modal_open';
        isMenu = action === 'menu_open';
        if (docClass.contains(action)) {
          docClass.remove(action);
          docClass.add(isMenu ? 'menu_closing' : 'closing');
          if (isMenu) {
            setTimeout(() => { docClass.remove('menu_closing'); }, 705);
          } else {
            setTimeout(() => { docClass.remove('closing'); }, 305);
          }
          // enableScroll();
        } else {
          this.uiHiddenComponents.forEach(
            (component) => {
              const oldaction = `${component}_open`;
              if (docClass.contains(oldaction) && oldaction !== action) {
                docClass.remove(oldaction);
                updateModalState = oldaction === 'modal_open';
              }
            },
          );
          docClass.add(action);
          // disableScroll();
        }
        if (updateModalState) {
          this.setState({
            modal: !modal,
            modalType: !modal ? evt.target.getAttribute('data-action') : '',
            modalData: !modal && obj !== null ? obj : {},
          });
        }
        if (isMenu) {
          this.setState({
            menu: !menu,
          });
        }
      } else { // overlayer
        this.uiHiddenComponents.forEach(
          (component) => {
            const oldaction = `${component}_open`;
            if (docClass.contains(oldaction)) {
              docClass.remove(oldaction);
              docClass.add('closing');
              setTimeout(() => { docClass.remove('closing'); }, 305);
              // enableScroll();
            }
          },
        );
        if (modal) {
          this.setState({
            modal: false,
            modalType: '',
            modalData: {},
          });
        }
        if (menu) {
          this.setState({
            menu: false,
          });
        }
      }
    }
  }

  render() {
    const pageProps = Object.assign(
      {},
      this.props,
      this.state,
      {
        toggleSiteHiddenComponents: this.toggleSiteHiddenComponents,
      },
    );
    return (
      <Comp {...pageProps} />
    );
  }
};
export default UIHandler;
