import { useWeb3React } from '@web3-react/core';
import { UserRejectedRequestError } from '@web3-react/injected-connector';
import { useEffect, useState } from 'react';
import { injected } from '../../connector';
import useENSName from '../../hooks/useENSName';
import useMetaMaskOnboarding from '../../hooks/useMetaMaskOnboarding';
import { formatEtherscanLink, shortenHex } from '../../util';
import { makeStyles } from '@material-ui/core/styles';
import useTokenBalance from '../../hooks/useTokenBalance';
import { parseBalance } from '../../util';
import { busdContractAddress } from '../../constant';

const Account = ({ triedToEagerConnect }) => {
  const {
    active,
    error,
    activate,
    chainId,
    account,
    setError,
    deactivate,
  } = useWeb3React();
  const classes = useStyles();
  const [balance, setBalance] = useState(0);
  const { data } = useTokenBalance(
    account,
    busdContractAddress,
  );

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  useEffect(async () => {
    if (data) setBalance(parseBalance(data));
  }, [data]);

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  const ENSName = useENSName(account);

  if (error) {
    return null;
  }

  if (typeof account !== 'string') {
    return (
      <div>
        {isWeb3Available ? (
          <button
            disabled={connecting}
            className={classes.btn}
            onClick={() => {
              setConnecting(true);

              activate(injected, undefined, true).catch((error) => {
                // ignore the error if it's a user rejected request
                if (error instanceof UserRejectedRequestError) {
                  setConnecting(false);
                } else {
                  setError(error);
                }
              });
            }}
          >
            {isMetaMaskInstalled ? 'Connect to MetaMask' : 'Connect to Wallet'}
          </button>
        ) : (
          <button onClick={startOnboarding}>Install Metamask</button>
        )}
      </div>
    );
  }

  return (
    <button className={classes.btn}>
      {account && (
        <div
          onClick={() => {
            setConnecting(false);
            deactivate();
          }}
          className={classes.imgLayout}
        >
          <img src="/icons/Ellipse.png" className={classes.iconEclipes} />
          <img
            src="/icons/MetaMaskLogo.png"
            alt="logo"
            className={classes.img}
          />
        </div>
      )}
      <div>
        <a
          className={classes.fontLayout}
          {...{
            href: formatEtherscanLink('Account', [chainId, account]),
            target: '_blank',
            rel: 'noopener noreferrer',
          }}
        >
          {ENSName || `${shortenHex(account, 4)}`}
        </a>
      </div>
      <div>{`${balance} BUSD`}</div>
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
    color: 'white',
  },
  img: {
    borderRadius: 999,
    marginRight: 5,
    width: '100px',
  },
  imgLayout: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconEclipes: {
    height: '10px',
    width: '10px',
    marginLeft: '5px',
    marginRight: '5px',
  },
  font: {
    color: 'white',
  },
  fontLayout: {
    color: 'white',
    marginRight: '10px',
    marginLeft: '15px',
  },
}));

export default Account;
