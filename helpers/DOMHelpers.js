// check if localStorage is available
function localStorageAvailable() {
  const mod = 'test';
  try {
    localStorage.setItem(mod, mod);
    localStorage.removeItem(mod);
    return true;
  } catch (e) {
    return false;
  }
}


// User device specs detection
export function userDevice() {
  const viewport = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  };
  const touchscreen = ('ontouchstart' in window || navigator.msMaxTouchPoints > 0) && viewport.width < 951;
  let screenSize = 'xl';
  if (viewport.width < 375) {
    screenSize = 'xs';
  } else if (viewport.width < 768) {
    screenSize = 'sm';
  } else if (viewport.width < 991) {
    screenSize = 'md';
  } else if (viewport.width < 1199) {
    screenSize = 'lg';
  }
  const isLocalStorageAvailable = localStorageAvailable();
  return { viewport, screenSize, touchscreen, isLocalStorageAvailable };
}