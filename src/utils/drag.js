const mousePosition = (e) => {
  const event = e || window.event;
  let xPos;
  if (event.pageX) {
    xPos = event.pageX;
  } else if ((e.clientX + document.body.scrollLeft) - document.body.clientLeft) {
    xPos = (e.clientX + document.body.scrollLeft) - document.body.clientLeft;
  } else if (e.touches[0]) {
    xPos = e.touches[0].clientX;
  } else {
    xPos = e.changedTouches[0].clientX;
  }
  let yPos;
  if (e.pageY) {
    yPos = e.pageY;
  } else if ((e.clientY + document.body.scrollTop) - document.body.clientTop) {
    yPos = (e.clientY + document.body.scrollTop) - document.body.clientTop;
  } else if (e.touches[0]) {
    yPos = e.touches[0].clientY;
  } else {
    yPos = e.changedTouches[0].clientY;
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
