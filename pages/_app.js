import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { darkTheme, lightTheme } from '../src/utils/theme';
import Header from '../src/components/Header';
import { Web3ReactProvider } from '@web3-react/core';
import getLibrary from '../getLibrary';
import { makeStyles } from '@material-ui/core/styles';

const App = ({ Component, pageProps }) => {
  const [darkMode, setDarkMode] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    // Setup darkmode
    setDarkMode(
      localStorage.getItem('mode') ? parseInt(localStorage.getItem('mode')) : 0,
    );
    // Naive check for mobile
    setIsMobile(
      navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i),
    );
  }, []);

  const toggleMode = () => {
    localStorage.setItem('mode', (1 - darkMode).toString());
    setDarkMode(1 - darkMode);
  };

  const muiTheme = darkMode ? lightTheme : darkTheme;

  return (
    <React.Fragment>
      <Head>
        <title>Forward Market</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <Web3ReactProvider getLibrary={getLibrary}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <Header {...pageProps} darkMode={darkMode} toggleMode={toggleMode} />
          <Component {...pageProps} isMobile={isMobile} />
        </ThemeProvider>
      </Web3ReactProvider>
    </React.Fragment>
  );
};

export default App;
