import ERC20_ABI from '../src/abi/busdABi.json';
import useContract from './useContract';

export default function useTokenContract(tokenAddress) {
  return useContract(tokenAddress, ERC20_ABI);
}
