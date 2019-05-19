// check if localStorage is available
const localStorageAvailable = () => {
  const mod = 'test';
  try {
    localStorage.setItem(mod, mod);
    localStorage.removeItem(mod);
    return true;
  } catch (e) {
    return false;
  }
};

// User device specs detection
const userDevice = () => {
  const viewport = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  };
  const touchscreen = ('ontouchstart' in window || navigator.msMaxTouchPoints > 0) && viewport.width < 951;
  let screenSize = 'xxl';
  if (viewport.width < 375) {
    screenSize = 'xs';
  } else if (viewport.width < 568) {
    screenSize = 'sm';
  } else if (viewport.width < 950) {
    screenSize = 'md';
  } else if (viewport.width < 1025) {
    screenSize = 'lg';
  } else if (viewport.width < 1200) {
    screenSize = 'xl';
  }
  let deviceType = 'large';
  if (viewport.width < 568) {
    deviceType = 'small';
  } else if (viewport.width < 950) {
    deviceType = 'medium';
  }
  const isLocalStorageAvailable = localStorageAvailable();
  return {
    viewport,
    screenSize,
    deviceType,
    touchscreen,
    isLocalStorageAvailable,
  };
};

export default userDevice;
