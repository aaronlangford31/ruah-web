import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import {
  submitSearch,
} from '../App/actions';
import { selectSearchResults, selectStore } from '../App/selectors';
import Body from '../../components/styled/Body';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import LocationIcon from 'material-ui/svg-icons/communication/location-on';
import Radium from 'radium';
import colors from '../../theme/colors';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.props.submitSearch(this.props.router.params.query);
  }

  renderLoading() {
    return (
      <Paper style={{ margin: 'auto', textAlign: 'center', width: '500px' }}>
        <CircularProgress />
      </Paper>
    );
  }

  renderSeller(storeId, channel) {
    return (
      <span>
        <Link style={{ textDecoration: 'none', color: colors.darkBlue }} to={`/marketplace/store/${storeId}`}>{storeId}</Link>
        {channel ?
          <Link to={`/conversation/${channel.ChannelId}`}>
            Go to conversation
          </Link>
          : <i style={{ color: colors.lightText }}> (no relationship)</i>
        }
      </span>
    );
  }

  renderProduct(product) {
    const channel = _.find(this.props.currStore.MsgChannels, (val, key) => key === product.StoreId);
    return (
      <Paper
        key={product.RuahId}
        style={{ maxWidth: '750px', margin: '16px', padding: '16px', overflow: 'hidden', fontSize: '13px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '150px', float: 'left', margin: '8px' }}>
          <img
            src={product.MainImageUri}
            alt={product.SKU}
            style={{ maxHeight: '150px', maxWidth: '150px' }}
          />
        </div>
        <div>
          <strong style={{ fontSize: '16px' }}>{product.ProductName.substr(0, 55)}{product.ProductName.length > 55 && '...'} </strong>
          <span style={{ display: 'inline-block' }} >
            <i style={{ color: colors.lightText }}> by </i>
            {this.renderSeller(product.StoreId)}
          </span>
        </div>
        <div style={{ fontSize: '12px', color: colors.lightText }}>
          <div>
            Ruah ID: {product.RuahId}
          </div>
          <div>
            SKU: {product.SKU}
          </div> 
        </div>
        <span>
            {product.Description.substr(0, 255)}{product.Description.length > 255 && '...'}
        </span>
      </Paper>);
  }

  renderStore(store) {
    const channel = _.find(this.props.currStore.MsgChannels, (val, key) => key === store.StoreId);
    return (
      <Paper
        key={store.StoreId}
        style={{ display: 'flex', flexDirection: 'row', width: '750px', margin: '10px' }}
      >
        <img
          src={store.ProfilePicUri}
          alt={store.StoreId}
          style={{ width: '100px', height: '100px', padding: '5px' }}
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div>
            <strong>{store.Name}</strong> <span>{store.StoreId}</span>
          </div>
          <div>
            <LocationIcon /> {store.Locality}, {store.Sovereignty}
          </div>
          <div style={{ flex: 1 }}>
            <em>
              {store.Slogan}
            </em>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <span style={{ flex: 1 }} />
            {channel ?
              <Link to={`/conversation/${channel.ChannelId}`}>
                Go to conversation
              </Link>
              : <div>
                You {"don't"} have a relationship with {store.StoreId} yet. <Link to={`/marketplace/store/${store.StoreId}`}>Click here to connect.</Link>
              </div>
            }
          </div>
        </div>
      </Paper>);
  }

  render() {
    return (
      <article>
        
        <Helmet
          title="Conversations"
          meta={[
            { name: 'description', content: 'Conversations in Ruah' },
          ]}
        />
        <Body>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '1080px',
            }}
          >
            {this.props.loading && this.renderLoading()}
            <div style={{ overflowY: 'scroll', flex: 1 }}>
              {_.map(this.props.searchResults, (item) => (item.RuahId ? this.renderProduct(item) : this.renderStore(item)))}
            </div>
          </div>
        </Body>
      </article>
    );
  }
}

SearchPage.propTypes = {
  loading: PropTypes.bool,
  searchResults: PropTypes.array,
  currStore: PropTypes.object,
  router: PropTypes.object,
  submitSearch: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    submitSearch: (query) => {
      dispatch(submitSearch(query));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  searchResults: selectSearchResults(),
  currStore: selectStore(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Radium(SearchPage));
