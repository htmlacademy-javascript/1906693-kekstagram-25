const getRandomInteger = (min, max) => {
  let minimumInteger = Math.ceil(min);
  let maximumInteger = Math.floor(max);

  if (min < 0) {
    minimumInteger = 0;
  }

  if ((max < 0) || (max < min)) {
    maximumInteger = minimumInteger;
  }

  return Math.floor(Math.random() * (maximumInteger - minimumInteger + 1)) + minimumInteger;
};

export { getRandomInteger };
