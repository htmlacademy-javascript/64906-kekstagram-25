function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

function debounce(callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

export {checkStringLength, isEscapeKey, debounce};
