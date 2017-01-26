/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserType } from './selectors';
import colors from './colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const styles = {
  app: {
    width: '1200px',
    margin: 'auto',
    padding: '0 16px',
  },
};

import Header from 'components/partials/Header';
import Footer from 'components/partials/Footer';

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

function App({ children, userType }) {
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
        <Header userType={userType} />
        {React.Children.toArray(children)}
        <Footer />
      </div>
    </MuiThemeProvider>
  );
}

App.propTypes = {
  children: PropTypes.node,
  userType: PropTypes.string,
};

export function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({
  userType: selectUserType(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(App);
