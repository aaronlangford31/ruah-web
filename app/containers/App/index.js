import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLoggedIn } from './selectors';
import { selectCartItems } from '../CheckoutPage/selectors';
import { checkLogin as actionCheckLogin, submitLogout as actionSubmitLogout } from './actions';
import getStyles from './styles';
import theme from '../../theme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Header from 'components/partials/Header';
import Footer from 'components/partials/Footer';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: theme.getIn(['colors', 'darkBlue']),

    // primary2Color: cyan700,
    // primary3Color: grey400,
    accent1Color: theme.getIn(['colors', 'lightGreen']),

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

class App extends Component {

  static propTypes = {
    children: PropTypes.node,
    loggedIn: PropTypes.bool,
    checkLogin: PropTypes.func,
    submitLogout: PropTypes.func,
    cartItems: PropTypes.array,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  static childContextTypes = {
    theme: PropTypes.object,
  };

  getChildContext() {
    return { theme };
  }

  componentWillMount() {
    const { checkLogin } = this.props;
    checkLogin();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userType && !this.props.loggedIn) {
      this.context.router.push({ pathname: '/' });
    }
  }

  render() {
    const { children, loggedIn, submitLogout } = this.props;
    const styles = getStyles();
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
          <Header loggedIn={loggedIn} submitLogout={submitLogout} location={this.context.router.location.pathname} cartCount={this.props.cartItems.length} />
          {React.Children.toArray(children)}
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    checkLogin: () => dispatch(actionCheckLogin()),
    submitLogout: () => dispatch(actionSubmitLogout()),
  };
}

const mapStateToProps = createStructuredSelector({
  loggedIn: selectLoggedIn(),
  cartItems: selectCartItems(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(App);
