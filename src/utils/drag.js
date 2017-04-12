export const mousePosition = (e) => {
  e = e || window.event;
  const xPos = e.pageX
    ? e.pageX
    : e.clientX + document.body.scrollLeft - document.body.clientLeft;
  const yPos = e.pageY
    ? e.pageY
    : e.clientY + document.body.scrollTop - document.body.clientTop;
  return {
    x: xPos,
    y: yPos
  };
};

export const disableMouseDown = (e) => {
  const event = e || window.event;
  event.preventDefault();
  event.stopPropagation();
};

export const getRotateStyle = (degree) => {
  return {
    'transform': `rotate(${degree}deg)`,
    'OTransform': `rotate(${degree}deg)`,
    'MozTransform': `rotate(${degree}deg)`,
    'mstransform': `rotate(${degree}deg)`,
    'WebkitTransform': `rotate(${degree}deg)`
  };
};

export const getInlineRotateStyle = (degree) => {
  return {
    'transform': `translateX(-50%) rotate(${degree}deg)`,
    'OTransform': `translateX(-50%) rotate(${degree}deg)`,
    'MozTransform': `translateX(-50%) rotate(${degree}deg)`,
    'mstransform': `translateX(-50%) rotate(${degree}deg)`,
    'WebkitTransform': `translateX(-50%) rotate(${degree}deg)`
  };
};

export const getInitialPointerStyle = (height, top, degree) => {
  return {
    'height': `${height}px`,
    'top': `${top}px`,
    'transform': `translateX(-50%) rotate(${degree}deg)`,
    'OTransform': `translateX(-50%) rotate(${degree}deg)`,
    'MozTransform': `translateX(-50%) rotate(${degree}deg)`,
    'mstransform': `translateX(-50%) rotate(${degree}deg)`,
    'WebkitTransform': `translateX(-50%) rotate(${degree}deg)`
  };
};

export const getStandardAbsolutePosition = (position, minPosition, maxPosition) => {
  if (position < minPosition) {
    position = minPosition;
  }
  if (position > maxPosition) {
    position = maxPosition;
  }
  return position;
};

export const degree2Radian = (degree) => degree * (2 * Math.PI) / 360;
