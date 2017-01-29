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
import { selectValidSignUpCode, selectError, selectLoading } from './selectors';
import ErrorBox from '../App/ErrorBox';
import Body from '../../components/styled/Body';
import H2 from '../../components/styled/H2';

export const SignUpPage = ({ checkCode, signUp, validSignUpCode, error, close, loading }) => (
  <article>
    <Helmet
      title="Sign Up"
      meta={[
        { name: 'description', content: 'Sign Up Page' },
      ]}
    />
    <H2>Sign Up</H2>
    <Body>
      {!validSignUpCode ? <CodeForm
        checkCode={checkCode}
        loading={loading}
      /> : <SignUpForm
        signUp={signUp}
        loading={loading}
      />}
    </Body>
    <ErrorBox error={error} show={!!error} close={close} />
  </article>
);

SignUpPage.propTypes = {
  checkCode: PropTypes.func,
  signUp: PropTypes.func,
  validSignUpCode: PropTypes.string,
  error: PropTypes.string,
  close: PropTypes.func,
  loading: PropTypes.bool,
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
  validSignUpCode: selectValidSignUpCode(),
  error: selectError(),
  loading: selectLoading(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
