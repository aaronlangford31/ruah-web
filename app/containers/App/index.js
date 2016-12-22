/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from 'components/Header';
import Footer from 'components/Footer';

function App(props) {
  return (
    <MuiThemeProvider>
      <div>
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
