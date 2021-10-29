import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import {colors, Grid} from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useContract from "../hooks/useContract";
import VoteABI from "../src/abi/VotingABI.json"
import { useWeb3React } from "@web3-react/core";

const Index = () => {
  const classes = useStyles();
  const voteContract = useContract('0x625B842dD04Cf4219A69e11D5781E3d1bfaA2895',VoteABI);
  const { account } = useWeb3React();

  return (
    <main className={classes.main}>
      <div className={classes.position}>
        {account ? (
        <div>
        <Typography className={classes.fontColor} variant="h3">Voting</Typography>
        <Grid className={classes.layout} container>
        <Card className={classes.cardStyle} onClick={()=>{
            voteContract.candidateRegis()
            .then(()=>{
              alert('regis success')
            })
            .catch((e)=>{
              alert(e.data.message)
            })
          }}>
          <div className={classes.textInCard}>
            Regis
          </div>
        </Card>
        <Card className={classes.cardStyle} onClick={()=>{
          voteContract.startVoting()
          .then(()=>{
            alert('start voting success')
          })
          .catch((e)=>{
            alert(e.data.message)
          })
        }}>
          <div className={classes.textInCard}>
            Start
          </div>
        </Card>
        <Card className={classes.cardStyle} o onClick={()=>{
          voteContract.endVoting()
          .then(()=>{
            alert('end voting success')
          })
          .catch((e)=>{
            alert(e.data.message)
          })
        }}>
          <div className={classes.textInCard}>
            End
          </div>
        </Card>
        <Card className={classes.cardStyle} o onClick={()=>{
          voteContract.vote(account)
          .then(()=>{
            alert('voting success')
          })
          .catch((e)=>{
            alert(e.data.message)
          })
        }}>
          <div className={classes.textInCard}>
            Vote
          </div>
        </Card>
        <Card className={classes.cardStyle} onClick={()=>{
          voteContract.getWinner()
          .then(()=>{
            alert('get winner')
          })
          .catch((e)=>{
            alert(e.data.message)
          })
        }}>
          <div className={classes.textInCard}>
            Result
          </div>
        </Card>
        </Grid>
        </div>
        )
        :(
          <Typography variant="h3">Please connect wallet</Typography>
        )
        }
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
    backgroundColor: theme.type=='dark'? 'black': 'white',
    colors: theme.type=='dark'? 'white': 'black',
    backgroundImage: "url(/img/background.png)",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
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
      background: "pink",
   },
   borderColor: theme.type=='dark'? 'white': 'black',
  },
  textInCard: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '130px',
    color: theme.type=='dark'? 'white': 'black'
  },
  layout: {
    marginTop: '20px',
    display:'flex',
    justifyContent: 'center'
  },
  fontColor: {
    color: theme.type=='dark'? 'white': 'black'
  }
}));

export default Index;
