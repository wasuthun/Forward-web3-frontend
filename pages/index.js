import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { Grid, Modal, Container, TextField } from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useContract from '../hooks/useContract';
import VoteABI from '../src/abi/VotingABI.json';
import { voteContractAddress } from '../constant';
import { useWeb3React } from '@web3-react/core';
import { toast, ToastContainer } from 'react-nextjs-toast';
import { shortenHex } from '../util';

const Index = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputText, setInput] = useState('');
  const voteContract = useContract(voteContractAddress, VoteABI);
  const { account } = useWeb3React();
  const handleChange = (event) => {
    setInput(event.target.value);
  };

  // Can not call candidatesList from function because it require parameter of address
  // useEffect(async()=>{
  //   const data = await voteContract.candidates()
  // },[])

  return (
    <main className={classes.main}>
      <ToastContainer />
      <div className={classes.position}>
        {account ? (
          <div>
            <Typography className={classes.fontColor} variant="h3">
              Voting
            </Typography>
            <Grid className={classes.layout} container>
              <Card
                className={classes.cardStyle}
                onClick={async () => {
                  try {
                    await voteContract.candidateRegis();
                    toast.notify('Regis success', {
                      duration: 5,
                      type: 'success',
                    });
                  } catch (e) {
                    toast.notify(e.data.message, {
                      duration: 5,
                      type: 'error',
                    });
                  }
                }}
              >
                <div className={classes.textInCard}>Regis</div>
              </Card>
              <Card
                className={classes.cardStyle}
                onClick={async () => {
                  try {
                    await voteContract.startVoting();
                    toast.notify('Start voting success', {
                      duration: 5,
                      type: 'success',
                    });
                  } catch (e) {
                    toast.notify(e.data.message, {
                      duration: 5,
                      type: 'error',
                    });
                  }
                }}
              >
                <div className={classes.textInCard}>Start</div>
              </Card>
              <Card
                className={classes.cardStyle}
                onClick={async () => {
                  try {
                    await voteContract.endVoting();
                    toast.notify('End voting success', {
                      duration: 5,
                      type: 'success',
                    });
                  } catch (e) {
                    toast.notify(e.data.message, {
                      duration: 5,
                      type: 'error',
                    });
                  }
                }}
              >
                <div className={classes.textInCard}>End</div>
              </Card>
              <Card className={classes.cardStyle} onClick={handleOpen}>
                <div className={classes.textInCard}>Vote</div>
              </Card>
              <Modal
                open={open}
                onClose={handleClose}
                // aria-labelledby="modal-modal-title"
                // aria-describedby="modal-modal-description"
              >
                <Container className={classes.boxStyles}>
                  <Typography
                    className={classes.fontColor}
                    variant="h6"
                    component="h2"
                  >
                    Please input candidate address
                  </Typography>
                  <TextField
                    placeholder={'Input address'}
                    className={classes.textFieldCustom}
                    onChange={handleChange}
                  />
                  <div className={classes.dpFlex}>
                    <button
                      className={classes.customButton}
                      onClick={async () => {
                        if (inputText.match(/^0x[a-fA-F0-9]{40}$/)) {
                          const data = await voteContract.candidates(inputText);
                          if (data[0]) {
                            try {
                              await voteContract.vote(inputText);
                              toast.notify('Success vote', {
                                duration: 5,
                                type: 'success',
                              });
                              setOpen(false);
                            } catch (e) {
                              toast.notify(e.data.message, {
                                duration: 5,
                                type: 'error',
                              });
                            }
                          } else {
                            toast.notify('Input address is not candidate', {
                              duration: 5,
                              type: 'error',
                            });
                          }
                        } else {
                          toast.notify('Input is not contract address', {
                            duration: 5,
                            type: 'error',
                          });
                        }
                      }}
                    >
                      Vote
                    </button>
                  </div>
                </Container>
              </Modal>
              <Card
                className={classes.cardStyle}
                onClick={async () => {
                  try {
                    const data = await voteContract.getWinner();
                    toast.notify('winner is ' + shortenHex(data), {
                      duration: 5,
                      type: 'success',
                    });
                  } catch (e) {
                    toast.notify(e.data.message, {
                      duration: 5,
                      type: 'error',
                    });
                  }
                }}
              >
                <div className={classes.textInCard}>Result</div>
              </Card>
            </Grid>
          </div>
        ) : (
          <Typography variant="h3">Please connect wallet</Typography>
        )}
      </div>
    </main>
  );
};

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    paddingTop: '15vh',
    textAlign: 'center',
    height: '100vh',
    backgroundColor: theme.type == 'dark' ? 'black' : 'white',
    colors: theme.type == 'dark' ? 'white' : 'black',
    backgroundImage: 'url(/img/background.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: 'bottom',
  },
  text: {
    fontSize: 18,
  },
  cardStyle: {
    width: '400px',
    height: '300px',
    border: '0.1px solid',
    background: 'transparent',
    '&:hover': {
      background: 'pink',
    },
    borderColor: theme.type == 'dark' ? 'white' : 'black',
    [theme.breakpoints.down('sm')]: {
      width: '100px',
      height: '150px'
    }
  },
  textInCard: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '130px',
    color: theme.type == 'dark' ? 'white' : 'black',
    [theme.breakpoints.down('sm')]: {
      marginTop: '60px'
    }
  },
  layout: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  fontColor: {
    color: theme.type == 'dark' ? 'white' : 'black',
  },
  boxStyles: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '320px',
    backgroundColor: theme.type == 'dark' ? 'black' : 'white',
    paddingLeft: '15px',
    paddingRight: '15px',
    opacity: 0.8,
    outline: 0,
    borderRadius: '10px', // add / remove,
    border: '0.1px solid',
    borderColor: theme.type == 'dark' ? 'white' : 'black',
    paddingTop: '8px',
    paddingBottom: '8px',
    alignItems: 'center',
    // border: '3px solid #000',
  },
  textFieldCustom: {
    width: '100%',
    color: theme.type == 'dark' ? 'white' : 'black',
  },
  customButton: {
    fontWeight: 'bold',
    color: theme.type == 'dark' ? 'white' : 'black',
    backgroundColor: theme.type == 'dark' ? 'black' : 'white',
    borderRadius: '5px',
  },
  dpFlex: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '8px',
  },
}));

export default Index;
