import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import {
  getStoreById,
} from './actions';
import {
  selectCurrentStore,
  selectLoading,
} from './selectors';
import Body from '../../../components/styled/Body';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';

class StoreProfilePage extends Component {
  constructor(props) {
    super(props);
    this.props.getStore(this.props.router.params.storeId);
  }

  renderLoading() {
    return (
      <Paper style={{ margin: 'auto', textAlign: 'center', width: '500px' }}>
        <CircularProgress />
      </Paper>
    );
  }

  renderStore() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '1000px' }}>
        <div style={{ display: 'flex' }}>
          <span style={{ flex: 10 }} />
          <FlatButton
            backgroundColor={'#A9CF94'}
            color={'#FFFFFF'}
            onTouchTap={this.onEditClicked}
          >
            <span style={{ color: '#FFFFFF' }}>Edit Page</span>
          </FlatButton>
        </div>
        <Paper style={{ padding: '15px', display: 'flex' }}>
          <img style={{ width: '200px', height: '200px' }} src={this.props.store.ProfilePicUri} alt={'Profile Pic'} />
          <div style={{ padding: '0 20px' }}>
            <h1 style={{ fontWeight: '200', margin: '0', color: '#04BFBF' }}>{this.props.store.Name}</h1>
            <div style={{ color: '#BDBDBD', fontSize: '14px' }}>{this.props.store.StoreId}</div>
            <div style={{ color: '#616161', fontSize: '14px' }}>{`"${this.props.store.Slogan}"`}</div>
            <Divider />
            <div style={{ display: 'flex', marginTop: '15px' }}>
              <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>Marketplace Roles</span>
              <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>Taxonomy</span>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', width: '250px' }}>
                {_.map(this.props.store.MarketResources, (item, j) => (
                  <div key={j} style={{ backgroundColor: '#F7E967', borderRadius: '5px', padding: '1px 5px', marginRight: '5px', color: '#9E9E9E' }}>
                    {item}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', width: '250px' }}>
                {_.map(this.props.store.TaxonomicClassifications, (item, j) => (
                  <div key={j} style={{ backgroundColor: '#F7E967', borderRadius: '5px', padding: '1px 5px', marginRight: '5px', color: '#9E9E9E' }}>
                    {item}&nbsp;
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>Location</span>
              <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>On Ruah since</span>
              <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>Founded</span>
            </div>
            <div style={{ display: 'flex' }}>
              <span style={{ width: '250px' }}>{this.props.store.Locality}, {this.props.store.Sovereignty}, {this.props.store.Country}</span>
              <span style={{ width: '250px' }}>{this.props.store.Joined && this.props.store.Joined.fromNow()}</span>
              <span style={{ width: '250px' }}>{this.props.store.Founded}</span>
            </div>
          </div>
        </Paper>
        <Paper style={{ padding: '15px', marginTop: '20px' }}>
          <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>Story</span>
          <p style={{ whiteSpace: 'pre-wrap' }}>{this.props.store.Story}</p>
        </Paper>
      </div>
    );
  }

  render() {
    return (
      <article>
        <Helmet
          title={this.props.store.StoreId}
          meta={[
            { name: 'description', content: 'Product Page' },
          ]}
        />
        <Body>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 10 }}>
              {this.props.loading && this.renderLoading()}
              {!this.props.loading && this.renderStore()}
            </div>
          </div>
        </Body>
      </article>
    );
  }
}

StoreProfilePage.propTypes = {
  loading: PropTypes.bool,
  store: PropTypes.object,
  router: PropTypes.object,
  getStore: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    getStore: (id) => {
      dispatch(getStoreById(id));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  store: selectCurrentStore(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(StoreProfilePage);
