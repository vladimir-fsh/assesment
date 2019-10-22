export const castStringToArray = data =>
  Array.isArray(data) ? data : data.split('.');

export const castArray = data => (Array.isArray(data) ? data : [data]);

export const isNumber = value => {
  value = String(value);

  return !isNaN(value) && value.trim() !== '';
};

export const get = (path, source) =>
  castStringToArray(path).reduce((acc, val) => acc && acc[val], source);

export const noop = () => undefined;

export const set = (path, value, source) => {
  path = castStringToArray(path);

  if (path.length > 1) {
    const p = path.shift();

    if (source[p] === null || typeof source[p] !== 'object') {
      source[p] = {};
    }
    set(path, value, source[p]);
  } else {
    source[path[0]] = value;
  }

  return source;
};
