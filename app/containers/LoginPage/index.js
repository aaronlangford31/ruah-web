/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoginForm from '../../components/forms/LoginForm/index';
import { submitLogin } from './actions';
import { selectError } from './selectors';

export const LoginPage = ({ handleSubmit, error }) => (
  <article>
    <Helmet
      title="Login"
      meta={[
        { name: 'description', content: 'Login Page' },
      ]}
    />
    <h2>Login</h2>
    <LoginForm handleSubmit={handleSubmit} error={error} />
  </article>
);

LoginPage.propTypes = {
  handleSubmit: PropTypes.func,
  error: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: (e) => {
      dispatch(submitLogin());
      e.preventDefault();
    },
  };
}

const mapStateToProps = createStructuredSelector({
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
