import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SignUpForm from '../../components/forms/SignUpForm/index';
import CodeForm from '../../components/forms/CodeForm/index';
import * as SignUpActions from './actions';
import { selectValidSignUpCode, selectError, selectLoading } from './selectors';
import ErrorBox from '../App/ErrorBox';
import Body from '../../components/styled/Body';
import H2 from '../../components/styled/H2';

export const SignUpPage = ({ checkSignUpCode, submitSignUp, validSignUpCode, error, close, loading }) => (
  <article>
    <Helmet
      title="Sign Up"
      meta={[
        { name: 'description', content: 'Sign Up Page' },
      ]}
    />
    <H2>Sign Up</H2>
    <Body useBackground>
      {!validSignUpCode ? <CodeForm
        checkSignUpCode={checkSignUpCode}
        loading={loading}
      /> : <SignUpForm
        initialValues={{ code: validSignUpCode }}
        signUp={submitSignUp}
        loading={loading}
      />}
    </Body>
    <ErrorBox error={error} show={!!error} close={close} />
  </article>
);

SignUpPage.propTypes = {
  checkSignUpCode: PropTypes.func,
  submitSignUp: PropTypes.func,
  validSignUpCode: PropTypes.string,
  error: PropTypes.string,
  close: PropTypes.func,
  loading: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    checkSignUpCode: (values) => {
      dispatch(SignUpActions.checkSignUpCode(values));
    },

    submitSignUp: (values) => {
      dispatch(SignUpActions.submitSignUp(values));
    },

    close: () => {
      dispatch(SignUpActions.removeError());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  validSignUpCode: selectValidSignUpCode(),
  error: selectError(),
  loading: selectLoading(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
