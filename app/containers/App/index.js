/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import colors from './colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
const styles = {
  app: {
    width: '1200px',
    margin: 'auto',
    padding: '0 16px',
  },
};

import Header from 'components/Header';
import Footer from 'components/Footer';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.darkBlue,

    // primary2Color: cyan700,
    // primary3Color: grey400,
    accent1Color: colors.lightGreen,

    // accent2Color: grey100,
    // accent3Color: grey500,
    // textColor: darkBlack,
    // alternateTextColor: white,
    // canvasColor: white,
    // borderColor: grey300,
    // disabledColor: fade(darkBlack, 0.3),
    // pickerHeaderColor: cyan500,
    // clockCircleColor: fade(darkBlack, 0.07),
    // shadowColor: fullBlack,
  },
  appBar: {
    height: 50,
  },
});

function App(props) {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div style={styles.app}>
        <Helmet
          titleTemplate="%s - Ruah Logistics"
          defaultTitle="Team Ruah"
          meta={[
            { name: 'description', content: 'Team Ruah Product Management' },
          ]}
        />
        <Header />
        {React.Children.toArray(props.children)}
        <Footer />
      </div>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
