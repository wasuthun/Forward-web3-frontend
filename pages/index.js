import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import {Grid} from '@material-ui/core';

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
        <Typography variant="h3">Voting</Typography>
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
    </main>
  );
};

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    marginTop: '15vh',
    textAlign: 'center',
    height: '100vh',
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
   }
  },
  textInCard: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '130px'
  },
  layout: {
    marginTop: '20px',
    display:'flex',
    justifyContent: 'center'
  },
}));

export default Index;
