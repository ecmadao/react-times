
import { BROWSER_COMPATIBLE } from './constant';

const getScrollPosition = () => {
  const position = {
    x: document.documentElement.scrollLeft
    || document.body.scrollLeft
    || 0,
    y: document.documentElement.scrollTop
    || document.body.scrollTop
    || 0,
  };
  return position;
};

const mousePosition = (e) => {
  const event = e || window.event;
  let xPos;
  const scrollPosition = getScrollPosition();

  if (event.pageX) {
    xPos = event.pageX;
  } else if ((event.clientX + scrollPosition.x) - document.body.clientLeft) {
    xPos = (event.clientX + scrollPosition.x) - document.body.clientLeft;
  } else if (event.touches[0]) {
    xPos = event.touches[0].clientX;
  } else {
    xPos = event.changedTouches[0].clientX;
  }
  let yPos;
  if (event.pageY) {
    yPos = event.pageY;
  } else if ((event.clientY + scrollPosition.y) - document.body.clientTop) {
    yPos = (event.clientY + scrollPosition.y) - document.body.clientTop;
  } else if (event.touches[0]) {
    yPos = event.touches[0].clientY;
  } else {
    yPos = event.changedTouches[0].clientY;
  }
  return {
    x: xPos,
    y: yPos,
  };
};

const disableMouseDown = (e) => {
  const event = e || window.event;
  event.preventDefault();
  event.stopPropagation();
};

const browserStyles = (type, style) => BROWSER_COMPATIBLE.reduce((dict, browser) => {
  const key = browser
    ? `${browser}${type[0].toUpperCase()}${type.slice(1)}`
    : type;
  dict[key] = style;
  return dict;
}, {});

const getRotateStyle = degree =>
  browserStyles('transform', `rotate(${degree}deg)`);

const getInlineRotateStyle = degree =>
  browserStyles('transform', `translateX(-50%) rotate(${degree}deg)`);

const getInitialPointerStyle = (height, top, degree) =>
  Object.assign({
    height: `${height}px`,
    top: `${top}px`,
  }, browserStyles('transform', `translateX(-50%) rotate(${degree}deg)`));

const getStandardAbsolutePosition = (position, minPosition, maxPosition) => {
  let p = position;
  if (p < minPosition) {
    p = minPosition;
  }
  if (p > maxPosition) {
    p = maxPosition;
  }
  return p;
};

const degree2Radian = degree => (degree * (2 * Math.PI)) / 360;

export default {
  degree2Radian,
  mousePosition,
  disableMouseDown,
  rotateStyle: getRotateStyle,
  inlineRotateStyle: getInlineRotateStyle,
  initialPointerStyle: getInitialPointerStyle,
  validatePosition: getStandardAbsolutePosition
};
