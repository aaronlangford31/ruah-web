import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import {
  startEditStore,
  cancelEditStore,
  saveStoreEdits,
  editStore,
  getStore,
} from './actions';
import {
  selectStore,
  selectLoading,
  selectStoreNotSetup,
  selectIsEditing,
} from './selectors';
import Body from '../../components/styled/Body';
import Menu from '../../components/partials/Menu';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';

class MyStorePage extends Component {
  constructor(props) {
    super(props);
    this.props.getStore();
  }

  renderLoading() {
    return (
      <div style={{ margin: 'auto', textAlign: 'center', width: '500px' }}>
        <CircularProgress />
      </div>
    );
  }

  renderStore() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <img src={this.props.store.ProfilePicUri} alt={'Profile Pic'} />
          <div>
            <h1>{this.props.store.Name}</h1>
            <p>{this.props.store.StoreId}</p>
            <div>
              {_.map(this.props.store.MarketplaceRoles, (item, j) => (
                <div key={j}>
                  {item}
                </div>
              ))}
            </div>
            <div>
              {_.map(this.props.store.TaxonomicClassifications, (item, j) => (
                <div key={j}>
                  {item}
                </div>
              ))}
            </div>
            <div>
              {this.props.store.City}, {this.props.store.Sovereignty}, {this.props.store.Country}
            </div>
            <div>
              Joined Ruah {this.props.store.Joined.fromNow()} | Founded {this.props.store.Founded}
            </div>
          </div>
        </div>
        <div>
          <p>{this.props.store.Story}</p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <article>
        <Helmet
          title="Product"
          meta={[
            { name: 'description', content: 'Product Page' },
          ]}
        />
        <Body>
          <div style={{ display: 'flex' }}>
            <div>
              <Menu />
            </div>
            <div style={{ flex: 10 }}>
              {this.props.loading && this.renderLoading() }
              {!this.props.loading && this.renderStore()}
            </div>
          </div>
        </Body>
      </article>
    );
  }
}

MyStorePage.propTypes = {
  loading: PropTypes.bool,
  storeNotSetup: PropTypes.bool,
  isEditing: PropTypes.bool,
  store: PropTypes.object,
  router: PropTypes.object,
  handleStartEditStore: PropTypes.func,
  handleCancelEditStore: PropTypes.func,
  handleSaveStore: PropTypes.func,
  handleEditStore: PropTypes.func,
  getStore: PropTypes.func,
};

MyStorePage.contextTypes = {
  router: PropTypes.object,
  theme: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    handleStartEditStore: () => {
      dispatch(startEditStore());
    },
    handleCancelEditStore: () => {
      dispatch(cancelEditStore());
    },
    handleSaveStore: () => {
      dispatch(saveStoreEdits());
    },
    handleEditStore: (newVal, field) => {
      dispatch(editStore(newVal, field));
    },
    getStore: () => {
      dispatch(getStore());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  store: selectStore(),
  storeNotSetup: selectStoreNotSetup(),
  isEditing: selectIsEditing(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(MyStorePage);
