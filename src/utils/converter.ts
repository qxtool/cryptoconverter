const CryptoConvert = require("crypto-convert").default;
const convert = new CryptoConvert(/*options?*/);
convert.addCurrency(
  "RUB", //Your custom currency symbol here
  "USD", //The quote fiat price. Must be a supported fiat currency.
  () => {
    return 0.011; // TODO: fetch real rate
  },
);

export default convert;
