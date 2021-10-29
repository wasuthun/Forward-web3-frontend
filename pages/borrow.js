import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const Index = () => {
  const classes = useStyles();

  return (
    <main className={classes.main}>
      <div>
        <Typography className={classes.fontColor} variant="h6">
          Borrow
        </Typography>
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
    fontColor: {
        color: theme.type=='dark'? 'white': 'black'
    }
}));

export default Index;
