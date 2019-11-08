const roundTwoNumber = number => {
  return number.toFixed(2);
};

const timeId = () => {
  return new Date().getTime();
};

export { roundTwoNumber, timeId };
