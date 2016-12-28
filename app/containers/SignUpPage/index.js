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
import { checkSignUpCode, submitSignUp, removeError } from './actions';
import { selectValidSignUpCodeStatus, selectError } from './selectors';
import ErrorBox from '../App/ErrorBox';

export const SignUpPage = ({ checkCode, handleSubmit, validSignUpCodeStatus, error, close }) => (
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
    <ErrorBox error={error} show={!!error} close={close} />
  </article>
);

SignUpPage.propTypes = {
  checkCode: PropTypes.func,
  handleSubmit: PropTypes.func,
  validSignUpCodeStatus: PropTypes.bool,
  error: PropTypes.string,
  close: PropTypes.func,
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

    close: () => {
      dispatch(removeError());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  validSignUpCodeStatus: selectValidSignUpCodeStatus(),
  error: selectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
