const changeDecimals = (value, decimalCount) => {
  if (!value) return 0;
  if (!isNaN(Number(value))) {
    value = Number(value).toFixed(decimalCount);
    return value;
  }
};

export { changeDecimals };
