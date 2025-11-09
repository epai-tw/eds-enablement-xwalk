export function isAuthorEnvironment() {
  if (window?.location?.origin?.includes('author')) {
    return true;
  }
  return false;
}

export function whatBlockIsThis(element) {
  let currentElement = element;

  while (currentElement.parentElement) {
    if (currentElement.parentElement.classList.contains('block')) return currentElement.parentElement;
    currentElement = currentElement.parentElement;
    if (currentElement.classList.length > 0) return currentElement.classList[0];
  }
  return null;
}
