import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SignUpForm from '../../components/forms/SignUpForm/index';
import CodeForm from '../../components/forms/CodeForm/index';
import CreateStoreForm from '../../components/forms/CreateStoreForm/index';
import * as SignUpActions from './actions';
import { selectValidSignUpCode, selectError, selectLoading, selectSignUpStage, selectStoreId } from './selectors';
import ErrorBox from '../App/ErrorBox';
import Body from '../../components/styled/Body';

export class SignUpPage extends Component {
  componentWillMount() {
    if (this.props.location.query && this.props.location.query.code) {
      this.props.checkUriCode(this.props.location.query.code);
    }
  }
  renderForm = () => (
    <div>
      {this.props.signUpStage === 1 &&
        <CodeForm
          onSubmit={() => this.props.checkSignUpCode()}
          loading={this.props.loading}
        />}
      {this.props.signUpStage === 2 &&
        <SignUpForm
          initialValues={{ code: this.props.validSignUpCode }}
          onSubmit={() => this.props.submitSignUp()}
          storeId={this.props.storeId}
          loading={this.props.loading}
        />}
      {this.props.signUpStage === 3 &&
        <CreateStoreForm
          onSubmit={() => this.props.submitStore()}
        />
      }
    </div>
  );
  render() {
    return (
      <article>
        <Helmet
          title="Sign Up"
          meta={[
            { name: 'description', content: 'Sign Up Page' },
          ]}
        />
        <Body useBackground>
          {this.renderForm()}
        </Body>
        <ErrorBox error={this.props.error} show={!!this.props.error} close={this.props.close} />
      </article>
    );
  }
}

SignUpPage.propTypes = {
  checkSignUpCode: PropTypes.func,
  checkUriCode: PropTypes.func,
  submitSignUp: PropTypes.func,
  validSignUpCode: PropTypes.string,
  error: PropTypes.string,
  close: PropTypes.func,
  loading: PropTypes.bool,
  submitStore: PropTypes.func,
  signUpStage: PropTypes.number,
  storeId: PropTypes.string,
  location: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    checkSignUpCode: (values) => {
      dispatch(SignUpActions.checkSignUpCode(values));
    },
    checkUriCode: (code) => {
      dispatch(SignUpActions.checkUriCode(code));
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
  storeId: selectStoreId(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);
