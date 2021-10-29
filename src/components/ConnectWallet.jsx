import React, { useEffect, useState } from 'react';
import Blockies from 'react-blockies';
import { Contract } from "@ethersproject/contracts";

import { makeStyles } from '@material-ui/core/styles';

import { useWeb3Modal } from '../hooks/web3';
import BusdAbi from '../abi/busdABi.json'
import { ethers } from 'ethers';

const truncateAddress = (address) => {
  return address.slice(0, 6) + '...' + address.slice(-4);
};

const ConnectWallet = () => {
  const classes = useStyles();

  const [signerAddress, setSignerAddress] = useState('');
  const [balance, setBalance] = useState(); 
  // const [isWaiting, setWaiting] = useState(false)
  // const [isSent, setSent] = useState(false)
  // const [walletNotDetected, setWalletNotDetected] = useState(false)

  const { connectWallet, disconnectWallet, provider, error } = useWeb3Modal();

  useEffect(() => {
    const getAddress = async () => {
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setSignerAddress(address);
    };
    if (provider) getAddress();
    else setSignerAddress('');
  }, [provider]);

  const handleClickConnect = async () => {
    await connectWallet();
  };

  const handleClickAddress = () => {
    disconnectWallet();
  };

  useEffect(async() => {
    if(provider && signerAddress) {
      const contract = new Contract('0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee', BusdAbi, provider)
      const data = await contract.functions.balanceOf(signerAddress).then(({ balance }) => {
        setBalance(balance)
        console.log(balance,'2')
      })
      console.log(data,'3');
    }
  })

  return (
    <button
      className={classes.btn}
      onClick={signerAddress ? handleClickAddress : handleClickConnect}
    >
      {signerAddress &&
        (
          <div className={classes.imgLayout}>
            <img 
              src="/icons/Ellipse.png"
              className={classes.iconEclipes}
            />
            <img 
              src="/icons/MetaMaskLogo.png" 
              alt="logo" 
              className={classes.img}
              />
          </div>
        )
      }
      <div className={classes.font}>
        {signerAddress ? truncateAddress(signerAddress) : 'Connect Wallet'}
      </div>
    </button>
  );
};

const useStyles = makeStyles((theme) => ({
  btn: {
    background: 'black',
    cursor: 'pointer',
    border: 0,
    outline: 'none',
    borderRadius: 9999,
    height: 35,
    display: 'flex',
    alignItems: 'center',
    marginRight: 20,
    [theme.breakpoints.down('xs')]: {
      marginRight: 5,
    },
  },
  img: {
    borderRadius: 999,
    marginRight: 5,
    width: "100px"
  },
  imgLayout: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center"
  },
  iconEclipes: {
    height: '10px',
    width: '10px',
    marginLeft: '5px',
    marginRight: '5px'
  },
  font: {
    color: 'white'
  }
}));

export default ConnectWallet;
