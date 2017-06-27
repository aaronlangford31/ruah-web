import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import {
  getStores,
  openChannelRequestModal,
  cancelChannelRequestModal,
  changeChannelRequest,
  submitChannelRequest,
} from './actions';
import {
  selectStores,
  selectLoading,
  selectChannelRequest,
  selectChannelRequestModalOpen,
} from './selectors';
import Body from '../../../components/styled/Body';
import MarketplaceMenu from '../MarketplaceMenu';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TradeIcon from 'material-ui/svg-icons/action/compare-arrows';
import Dialog from 'material-ui/Dialog';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';

class DiscoverPage extends Component {
  constructor(props) {
    super(props);
    this.props.getStores();

    this.onChannelRequestTypeChange = this.onChannelRequestTypeChange.bind(this);
    this.onChannelRequestMessageChange = this.onChannelRequestMessageChange.bind(this);
  }

  onChannelRequestTypeChange = (ev, val) => {
    this.props.onChannelRequestChange(val, 'RequestType');
  };

  onChannelRequestMessageChange = (ev, val) => {
    this.props.onChannelRequestChange(val, 'Message');
  };

  renderLoading() {
    return (
      <Paper style={{ margin: 'auto', textAlign: 'center', width: '500px', height: '500px' }}>
        <CircularProgress />
      </Paper>
    );
  }

  renderStore({ store }) {
    return (
      <div
        key={store.StoreId}
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '10px 0',
          maxWidth: '1000px',
        }}
      >
        <Paper style={{ padding: '15px', display: 'flex' }}>
          <img
            style={{ width: '200px', height: '200px' }}
            src={store.ProfilePicUri}
            alt={'Profile Pic'}
          />
          <div style={{ padding: '0 0 0 20px' }}>
            <div style={{ display: 'flex' }}>
              <Link to={`/marketplace/store/${store.StoreId}`} style={{ margin: '0', color: '#04BFBF', textDecoration: 'none' }}>{store.Name}</Link>
              &nbsp;
              <div style={{ color: '#BDBDBD' }}>{store.StoreId}</div>
            </div>
            <div style={{ display: 'flex', marginTop: '15px' }}>
              <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>Marketplace Roles</span>
              <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>Taxonomy</span>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ display: 'flex', width: '250px' }}>
                {_.map(store.MarketResources, (item, j) => (
                  <div key={j} style={{ backgroundColor: '#F7E967', borderRadius: '5px', padding: '1px 5px', marginRight: '5px', color: '#9E9E9E' }}>
                    {item}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', width: '250px' }}>
                {_.map(store.TaxonomicClassifications, (item, j) => (
                  <div key={j} style={{ backgroundColor: '#F7E967', borderRadius: '5px', padding: '1px 5px', marginRight: '5px', color: '#9E9E9E' }}>
                    {item}&nbsp;
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>Location</span>
              <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>On Ruah since</span>
            </div>
            <div style={{ display: 'flex' }}>
              <span style={{ width: '250px' }}>{store.Locality}, {store.Sovereignty}, {store.Country}</span>
              <span style={{ width: '250px' }}>{store.Joined && store.Joined.fromNow()}</span>
            </div>
            <div style={{ display: 'flex', marginTop: '10px' }}>
              <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>Buying Channels</span>
              <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>Selling Channels</span>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '250px', fontSize: '2em' }}>{ (store.BuysFrom && store.BuysFrom.length) || 0 } </div>
              <div style={{ width: '250px', fontSize: '2em' }}>{ (store.SellsTo && store.SellsTo.length) || 0}</div>
            </div>
            <div style={{ display: 'flex' }}>
              <span style={{ flex: 10 }}>&nbsp;</span>
              &nbsp;
              &nbsp;
              <FlatButton
                name={store.StoreId}
                onTouchTap={() => { this.props.handleOpenChannelModal(store.StoreId); }}
                style={{ padding: '0 5px' }}
                backgroundColor={'#A9CF54'}
              >
                <TradeIcon color={'#FFFFFF'} /> <span style={{ color: '#FFFFFF' }}> Open a Channel</span>
              </FlatButton>
            </div>
          </div>
        </Paper>
      </div>
    );
  }

  render() {
    return (
      <article>
        <Helmet
          title="Discover"
          meta={[
            { name: 'description', content: 'Find other businesses to connect with.' },
          ]}
        />
        <div style={{ display: 'flex' }}>
          <MarketplaceMenu location={'/marketplace/discover'} />
          <Body>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 10 }}>
                {this.props.loading && this.renderLoading()}
                {!this.props.loading && _.map(this.props.stores, (item) => this.renderStore({ store: item }))}
                <RaisedButton onTouchTap={() => this.props.getStores()} backgroundColor={'#FFFFFF'}>
                  See more
                </RaisedButton>
                <br />
                <br />
                <br />
              </div>
            </div>
            <Dialog
              title={`Send a Channel Request to ${this.props.request.StoreId}`}
              actions={[
                <FlatButton
                  onTouchTap={() => this.props.handleCancelChannelRequest()}
                >
                  Cancel
                </FlatButton>,
                <FlatButton
                  onTouchTap={() => this.props.handleSubmitChannelRequest()}
                  disabled={!this.props.request.RequestType && !this.props.request.Message}
                  style={{ padding: '0 5px' }}
                  backgroundColor={'#A9CF54'}
                >
                  <span style={{ color: '#FFFFFF' }}> Send Request </span>
                </FlatButton>,
              ]}
              modal={false}
              open={this.props.channelRequestModalOpen}
            >
              <div>
                Do you want to <strong>buy from</strong> or <strong>sell to</strong> {this.props.request.StoreId}?
              </div>
              <RadioButtonGroup name={'RequestType'} onChange={this.onChannelRequestTypeChange}>
                <RadioButton value={'Buying'} label={'Buy from'} />
                <RadioButton value={'Selling'} label={'Sell to'} />
              </RadioButtonGroup>
              <div>Write a personalized message to go along with your request:</div>
              <TextField
                name={'Message'}
                onChange={this.onChannelRequestMessageChange}
                multiLine
                fullWidth
              />
            </Dialog>
          </Body>
        </div>
      </article>
    );
  }
}

DiscoverPage.propTypes = {
  loading: PropTypes.bool,
  stores: PropTypes.array,
  getStores: PropTypes.func,
  request: PropTypes.object,
  handleSubmitChannelRequest: PropTypes.func,
  handleCancelChannelRequest: PropTypes.func,
  onChannelRequestChange: PropTypes.func,
  handleOpenChannelModal: PropTypes.func,
  channelRequestModalOpen: PropTypes.bool,
};

DiscoverPage.contextTypes = {
  router: PropTypes.object,
  theme: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    getStores: () => {
      dispatch(getStores());
    },
    handleOpenChannelModal: (storeId) => {
      dispatch(openChannelRequestModal(storeId));
    },
    handleCancelChannelRequest: () => {
      dispatch(cancelChannelRequestModal());
    },
    onChannelRequestChange: (newVal, field) => {
      dispatch(changeChannelRequest(newVal, field));
    },
    handleSubmitChannelRequest: () => {
      dispatch(submitChannelRequest());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  stores: selectStores(),
  request: selectChannelRequest(),
  channelRequestModalOpen: selectChannelRequestModalOpen(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(DiscoverPage);
