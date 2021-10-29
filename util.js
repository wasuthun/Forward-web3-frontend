import { formatUnits } from "@ethersproject/units";

export function shortenHex(hex, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

const ETHERSCAN_PREFIXES = {
  1: "",
  3: "ropsten.",
  4: "rinkeby.",
  5: "goerli.",
  42: "kovan.",
  97: "bsc-testnet"
};

export function formatEtherscanLink(
  type,
  data
) {
  switch (type) {
    case "Account": {
      const [chainId, address] = data;
      return `https://testnet.bscscan.com/address/${address}`;
    }
    case "Transaction": {
      const [chainId, hash] = data;
      return `https://testnet.bscscan.com/tx/${hash}`;
    }
  }
}

export const parseBalance = (
  value,
  decimals = 18,
  decimalsToDisplay = 3
) => parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay);
