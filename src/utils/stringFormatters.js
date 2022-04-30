// eslint-disable-next-line import/prefer-default-export
export const formatDollar = (num, noDecimal = false) => {
  if (num == null || num === undefined) return num;
  let formatted = num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  // eslint-disable-next-line prefer-destructuring
  if (noDecimal) formatted = formatted.split('.')[0];
  return formatted;
};
