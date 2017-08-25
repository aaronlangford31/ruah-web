import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getStore } from './actions';
import { selectLoading } from './selectors';
import Body from '../../../components/styled/Body';
import Sidebar from '../../../components/partials/Sidebar';
import StoreProfile from './StoreProfile';
import MyStoreMenuComponent from '../MyStoreMenu';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';

class MyStorePage extends Component {
  componentWillMount() {
    this.props.getStore();
  }

  renderLoading() {
    return (
      <Paper style={{ margin: 'auto', textAlign: 'center', width: '500px' }}>
        <CircularProgress />
      </Paper>
    );
  }

  render() {
    return (
      <article>
        <Helmet
          title="My Store"
          meta={[
            { name: 'description', content: 'Product Page' },
          ]}
        />
        <Body style={{ justifyContent: 'left' }}>
          <Sidebar />
          <MyStoreMenuComponent location={window.location.pathname} />
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 10 }}>
              {this.props.loading && this.renderLoading()}
              {!this.props.loading && <StoreProfile />}
            </div>
          </div>
        </Body>
      </article>
    );
  }
}

MyStorePage.propTypes = {
  loading: PropTypes.bool,
  getStore: PropTypes.func,
};

MyStorePage.contextTypes = {
  router: PropTypes.object,
  theme: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    getStore: () => {
      dispatch(getStore());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(MyStorePage);
