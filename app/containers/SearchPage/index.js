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
import FlatButton from 'material-ui/FlatButton';
import SendIcon from 'material-ui/svg-icons/content/send';

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

  renderProduct(product) {
    const channel = _.find(this.props.currStore.MsgChannels, (val, key) => key === product.StoreId);
    return (
      <Paper
        key={product.RuahId}
        style={{ display: 'flex', flexDirection: 'row', width: '750px', margin: '10px' }}
      >
        <img
          src={product.MainImageUri}
          alt={product.SKU}
          style={{ width: '100px', height: '100px', padding: '5px' }}
        />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div>
            <strong>{product.ProductName}</strong> <span>SKU: {product.SKU}</span>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 1 }}>
              &nbsp;{product.Description}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <span style={{ flex: 1 }} />
            <Link to={`/conversation/${channel.ChannelId}`}>
              <FlatButton><SendIcon /> Chat</FlatButton>
            </Link>
          </div>
        </div>
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
          <div style={{ flex: 1 }}>
            <em style={{ flex: 1 }}>
              &nbsp;{store.Slogan}
            </em>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <span style={{ flex: 1 }} />
            <Link to={`/conversation/${channel.ChannelId}`}>
              <FlatButton><SendIcon /> Chat</FlatButton>
            </Link>
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
            <div style={{ overflowY: 'scroll', flex: 1, maxHeight: '650px' }}>
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
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
