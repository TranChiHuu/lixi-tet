export const formatMoney = (amount: number) => {
  if (amount >= 1000) {
    if (amount % 1000 === 0) {
      return `${amount / 1000}K`;
    }
    return `${(amount / 1000).toFixed(1)}K`;
  }
  return amount.toString();
};

export const DENOMINATIONS = [
  1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000
];
