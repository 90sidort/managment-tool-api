const cleanObject = async function (obj) {
  const propNames = Object.getOwnPropertyNames(obj);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < propNames.length; i++) {
    const propName = propNames[i];
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
      // eslint-disable-next-line no-param-reassign
      delete obj[propName];
    }
  }
  return { ...obj };
};

module.exports = cleanObject;
