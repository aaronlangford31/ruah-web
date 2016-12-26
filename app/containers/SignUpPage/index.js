/*
 * SignUpPage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SignUpForm from '../../components/forms/SignUpForm/index';
import { checkSignUpCode, submitSignUp } from './actions';
import { selectValidSignUpCodeStatus, selectError } from './selectors';

export const SignUpPage = ({ checkCode, handleSubmit, validSignUpCodeStatus, error }) => (
  <article>
    <Helmet
      title="Sign Up"
      meta={[
        { name: 'description', content: 'Sign Up Page' },
      ]}
    />
    <h2>Sign Up</h2>
    <SignUpForm
      checkCode={checkCode}
      handleSubmit={handleSubmit}
      validSignUpCodeStatus={validSignUpCodeStatus}
      error={error}
    />
  </article>
);

SignUpPage.propTypes = {
  checkCode: PropTypes.func,
  handleSubmit: PropTypes.func,
  validSignUpCodeStatus: PropTypes.bool,
  error: PropTypes.string,
};

export function mapDispatchToProps(dispatch) {
  return {
    checkCode: (e) => {
      dispatch(checkSignUpCode());
      e.preventDefault();
    },

    handleSubmit: (e) => {
      dispatch(submitSignUp());
      e.preventDefault();
    },
  };
}

const mapStateToProps = createStructuredSelector({
  validSignUpCodeStatus: selectValidSignUpCodeStatus(),
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
