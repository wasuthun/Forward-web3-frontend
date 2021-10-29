import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useContract from "../hooks/useContract";
import VoteABI from "../src/abi/VotingABI.json"
import { useWeb3React } from "@web3-react/core";

const Index = () => {
  const classes = useStyles();
  const voteContract = useContract('0x625B842dD04Cf4219A69e11D5781E3d1bfaA2895',VoteABI);
  const { account } = useWeb3React();
  console.log('vote', voteContract)

  useEffect(()=> {

  },[]) 

  return (
    <main className={classes.main}>
      <div>
        <Typography variant="h3">Voting</Typography>
        <Typography variant="h6">
            Home
        </Typography>
        <button onClick={()=>{
          voteContract.candidateRegis()
          .then(()=>{
            alert('regis success')
          })
          .catch((e)=>{
            alert(e.data.message)
          })
        }}>
          Regis
        </button>
        <button onClick={()=>{
          voteContract.startVoting()
          .then(()=>{
            alert('start voting success')
          })
          .catch((e)=>{
            alert(e.data.message)
          })
        }}>
          Start
        </button>
        <button onClick={()=>{
          voteContract.endVoting()
          .then(()=>{
            alert('end voting success')
          })
          .catch((e)=>{
            alert(e.data.message)
          })
        }}>
          End
        </button>
        <button onClick={()=>{
          voteContract.vote(account)
          .then(()=>{
            alert('voting success')
          })
          .catch((e)=>{
            alert(e.data.message)
          })
        }}>
          Vote
        </button>
        <button onClick={()=>{
          voteContract.getWinner()
          .then(()=>{
            alert('get winner')
          })
          .catch((e)=>{
            alert(e.data.message)
          })
        }}>
          Result
        </button>
      </div>
      <Link href="/about">
        <a className={classes.text}>About</a>
      </Link>
    </main>
  );
};

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    marginTop: '15vh',
    textAlign: 'center',
    height: '100vh'
  },
  text: {
    fontSize: 18,
  }
}));

export default Index;
