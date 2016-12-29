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
import CodeForm from '../../components/forms/CodeForm/index';
import { checkSignUpCode, submitSignUp, removeError } from './actions';
import { selectValidSignUpCodeStatus, selectError } from './selectors';
import ErrorBox from '../App/ErrorBox';

export const SignUpPage = ({ checkCode, signUp, validSignUpCodeStatus, error, close }) => (
  <article>
    <Helmet
      title="Sign Up"
      meta={[
        { name: 'description', content: 'Sign Up Page' },
      ]}
    />
    <h2>Sign Up</h2>
    {!validSignUpCodeStatus ? <CodeForm
      checkCode={checkCode}
    /> : <SignUpForm
      signUp={signUp}
    />}
    <ErrorBox error={error} show={!!error} close={close} />
  </article>
);

SignUpPage.propTypes = {
  checkCode: PropTypes.func,
  signUp: PropTypes.func,
  validSignUpCodeStatus: PropTypes.bool,
  error: PropTypes.string,
  close: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    checkCode: () => {
      dispatch(checkSignUpCode());
    },

    signUp: () => {
      dispatch(submitSignUp());
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
