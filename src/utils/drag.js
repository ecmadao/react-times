const mousePosition = (e) => {
  const event = e || window.event;
  let xPos;
  if (event.pageX) {
    xPos = event.pageX;
  } else if ((event.clientX + document.body.scrollLeft) - document.body.clientLeft) {
    xPos = (event.clientX + document.body.scrollLeft) - document.body.clientLeft;
  } else if (event.touches[0]) {
    xPos = event.touches[0].clientX;
  } else {
    xPos = event.changedTouches[0].clientX;
  }
  let yPos;
  if (event.pageY) {
    yPos = event.pageY;
  } else if ((event.clientY + document.body.scrollTop) - document.body.clientTop) {
    yPos = (event.clientY + document.body.scrollTop) - document.body.clientTop;
  } else if (event.touches[0]) {
    yPos = event.touches[0].clientY;
  } else {
    yPos = event.changedTouches[0].clientY;
  }
  return {
    x: xPos + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
    y: yPos + Math.max(document.documentElement.scrollTop, document.body.scrollTop)
  };
};

const disableMouseDown = (e) => {
  const event = e || window.event;
  event.preventDefault();
  event.stopPropagation();
};

const getRotateStyle = degree => ({
  transform: `rotate(${degree}deg)`,
  OTransform: `rotate(${degree}deg)`,
  MozTransform: `rotate(${degree}deg)`,
  mstransform: `rotate(${degree}deg)`,
  WebkitTransform: `rotate(${degree}deg)`
});

const getInlineRotateStyle = degree => ({
  transform: `translateX(-50%) rotate(${degree}deg)`,
  OTransform: `translateX(-50%) rotate(${degree}deg)`,
  MozTransform: `translateX(-50%) rotate(${degree}deg)`,
  mstransform: `translateX(-50%) rotate(${degree}deg)`,
  WebkitTransform: `translateX(-50%) rotate(${degree}deg)`
});

const getInitialPointerStyle = (height, top, degree) => ({
  height: `${height}px`,
  top: `${top}px`,
  transform: `translateX(-50%) rotate(${degree}deg)`,
  OTransform: `translateX(-50%) rotate(${degree}deg)`,
  MozTransform: `translateX(-50%) rotate(${degree}deg)`,
  mstransform: `translateX(-50%) rotate(${degree}deg)`,
  WebkitTransform: `translateX(-50%) rotate(${degree}deg)`
});

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
