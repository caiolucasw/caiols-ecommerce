export const transformNumberToCurrency = (
  num: number,
  countryFormat = "pt-BR"
) => {
  return num.toLocaleString(countryFormat, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
};
