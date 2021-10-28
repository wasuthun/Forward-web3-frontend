import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const Index = () => {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <div>
        <Typography variant="h6">
          Farm
        </Typography>
      </div>
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
