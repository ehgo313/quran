export function debounce(func, wait = 500) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => func.call(this, ...args), wait);
  };
}
