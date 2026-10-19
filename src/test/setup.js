import '@testing-library/jest-dom/vitest';

// jsdom gaps that modern React apps commonly rely on.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}
if (!window.IntersectionObserver) {
  window.IntersectionObserver = class {
    observe() {}

    unobserve() {}

    disconnect() {}
  };
}
if (!window.ResizeObserver) {
  window.ResizeObserver = class {
    observe() {}

    unobserve() {}

    disconnect() {}
  };
}
window.scrollTo = window.scrollTo || (() => {});
