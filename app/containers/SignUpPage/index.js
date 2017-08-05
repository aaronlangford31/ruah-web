import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SignUpForm from '../../components/forms/SignUpForm/index';
import CodeForm from '../../components/forms/CodeForm/index';
import CreateStoreForm from '../../components/forms/CreateStoreForm/index';
import * as SignUpActions from './actions';
import { selectValidSignUpCode, selectError, selectLoading, selectSignUpStage } from './selectors';
import ErrorBox from '../App/ErrorBox';
import Body from '../../components/styled/Body';


export const SignUpPage = ({ signUpStage, checkSignUpCode, submitStore, submitSignUp, validSignUpCode, error, close, loading }) => {
  const renderForm = () => {
    switch (signUpStage) {
      case 1:
        return (
          <div>
            <CodeForm
              checkSignUpCode={checkSignUpCode}
              loading={loading}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <SignUpForm
              initialValues={{ code: validSignUpCode }}
              signUp={submitSignUp}
              loading={loading}
            />
          </div>
        );
      case 3:
        return (
          <div>
            <CreateStoreForm
              handleSubmit={submitStore}
            />
          </div>
        );
      case 4:
        return (
          <div></div>
        );
      default:
        return 'oops';
    }
  };
  return (
    <article>
      <Helmet
        title="Sign Up"
        meta={[
          { name: 'description', content: 'Sign Up Page' },
        ]}
      />
      <Body useBackground>
        {renderForm()}
      </Body>
      <ErrorBox error={error} show={!!error} close={close} />
    </article>
  );
};

SignUpPage.propTypes = {
  checkSignUpCode: PropTypes.func,
  submitSignUp: PropTypes.func,
  validSignUpCode: PropTypes.string,
  error: PropTypes.string,
  close: PropTypes.func,
  loading: PropTypes.bool,
  submitStore: PropTypes.func,
  signUpStage: PropTypes.number,
};

export function mapDispatchToProps(dispatch) {
  return {
    checkSignUpCode: (values) => {
      dispatch(SignUpActions.checkSignUpCode(values));
    },
    submitSignUp: (values) => {
      dispatch(SignUpActions.submitSignUp(values));
    },
    submitStore: () => {
      dispatch(SignUpActions.submitStore());
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
  signUpStage: selectSignUpStage(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
