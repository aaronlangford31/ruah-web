/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { submitLogin, removeError } from './actions';
import { selectError, selectAuthenticated } from './selectors';
import LoginForm from '../../components/forms/LoginForm/index';
import ErrorBox from '../App/ErrorBox';
import Body from '../../components/styled/Body';
import H2 from '../../components/styled/H2';

class LoginPage extends Component {

  static contextTypes = {
    router: PropTypes.object,
  };

  componentDidUpdate() {
    if (this.props.authenticated) {
      this.context.router.push({ pathname: '/catalog' });
    }
  }

  render() {
    const { login, error, close } = this.props;

    return (
      <article>
        <Helmet
          title="Login"
          meta={[
            { name: 'description', content: 'Login Page' },
          ]}
        />
        <H2>Login</H2>
        <Body>
          <LoginForm login={login} error={error} />
        </Body>
        <ErrorBox error={error} show={!!error} close={close} />
      </article>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func,
  error: PropTypes.string,
  close: PropTypes.func,
  authenticated: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    login: () => {
      dispatch(submitLogin());
    },

    close: () => {
      dispatch(removeError());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  error: selectError(),
  authenticated: selectAuthenticated(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
