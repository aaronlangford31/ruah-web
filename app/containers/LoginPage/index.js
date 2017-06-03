import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as AppActions from '../App/actions';
import { selectError, selectLoggedIn, selectLoading } from '../App/selectors';
import LoginForm from '../../components/forms/LoginForm';
import ErrorBox from '../App/ErrorBox';
import Body from '../../components/styled/Body';

class LoginPage extends Component {

  static propTypes = {
    login: PropTypes.func,
    error: PropTypes.string,
    close: PropTypes.func,
    authenticated: PropTypes.bool,
    loading: PropTypes.bool,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  componentDidUpdate() {
    if (this.props.authenticated) {
      this.context.router.push({ pathname: '/catalog' });
    }
  }

  render() {
    const { login, error, close, loading } = this.props;

    return (
      <article>
        <Helmet
          title="Login"
          meta={[
            { name: 'description', content: 'Login Page' },
          ]}
        />
        <Body useBackground>
          <LoginForm login={login} error={error} loading={loading} />
        </Body>
        <ErrorBox error={error} show={!!error} close={close} />
      </article>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    login: (values) => {
      dispatch(AppActions.login(values));
    },

    close: () => {
      dispatch(AppActions.removeError());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  error: selectError(),
  authenticated: selectLoggedIn(),
  loading: selectLoading(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
