import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import _ from 'underscore';
import {
  getStoreById,
  getStoreProductById,
  openChannelRequestModal,
  cancelChannelRequestModal,
  changeChannelRequest,
  submitChannelRequest,
} from './actions';
import {
  selectCurrentStore,
  selectLoading,
  selectCurrentStoreProducts,
  selectChannelRequest,
  selectChannelRequestModalOpen,
} from './selectors';
import {
  selectStore,
} from '../../App/selectors';
import Body from '../../../components/styled/Body';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import Divider from 'material-ui/Divider';
import ProductCard from '../../Catalog/ProductCard';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';

const PRODUCT_ROW_WIDTH = 4;

class StoreProfilePage extends Component {
  constructor(props) {
    super(props);
    this.props.getStore(this.props.router.params.storeId);
    this.props.getStoreProduct(this.props.router.params.storeId);
  }

  onChannelRequestTypeChange = (ev, val) => {
    this.props.onChannelRequestChange(val, 'RequestType');
  };

  onChannelRequestMessageChange = (ev, val) => {
    this.props.onChannelRequestChange(val, 'Message');
  };

  renderLoading() {
    return (
      <Paper style={{ margin: 'auto', textAlign: 'center', width: '500px' }}>
        <CircularProgress />
      </Paper>
    );
  }

  renderRows = () => {
    const rows = [];
    for (let i = 0; i < this.props.storeProducts.length / PRODUCT_ROW_WIDTH; i += 1) {
      rows.push(this.renderRow(i));
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {rows}
      </div>
    );
  };

  renderRow = (i) => {
    const cards = [];
    for (let j = 0; j < PRODUCT_ROW_WIDTH; j += 1) {
      if ((i * PRODUCT_ROW_WIDTH) + j < this.props.storeProducts.length) {
        const product = this.props.storeProducts[(i * PRODUCT_ROW_WIDTH) + j];
        cards.push(
          <ProductCard
            key={product.RuahId}
            product={product}
          />);
      }
    }
    return (
      <div key={i} style={{ display: 'flex', flexDirection: 'row' }}>
        {cards}
      </div>
    );
  }

  renderChannelRequestModal() {
    return (
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
    );
  }

  renderStore() {
    const channel = this.props.store.MsgChannels && this.props.store.MsgChannels[this.props.currStore.StoreId];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '1000px' }}>
        <div style={{ padding: '15px', margin: '10px', display: 'flex' }}>
          <span style={{ flex: 1 }} />
          {channel ?
            <Link to={`/conversation/${channel.ChannelId}`}>
              <RaisedButton>Go to conversation</RaisedButton>
            </Link>
            : <RaisedButton onTouchTap={() => this.props.handleOpenChannelModal(this.props.store.StoreId)}>
              Connect
            </RaisedButton>}
        </div>
        <Paper style={{ padding: '15px', margin: '10px', display: 'flex' }}>
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
        <Paper style={{ padding: '15px', margin: '10px' }}>
          <span style={{ width: '250px', fontSize: '14px', fontWeight: '600' }}>Story</span>
          <p style={{ whiteSpace: 'pre-wrap' }}>{this.props.store.Story}</p>
        </Paper>
        {this.renderRows()}
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
              {this.renderChannelRequestModal()}
            </div>
          </div>
        </Body>
      </article>
    );
  }
}

StoreProfilePage.propTypes = {
  loading: PropTypes.bool,
  currStore: PropTypes.object,
  store: PropTypes.object,
  storeProducts: PropTypes.array,
  router: PropTypes.object,
  getStore: PropTypes.func,
  getStoreProduct: PropTypes.func,
  request: PropTypes.object,
  handleSubmitChannelRequest: PropTypes.func,
  handleCancelChannelRequest: PropTypes.func,
  onChannelRequestChange: PropTypes.func,
  handleOpenChannelModal: PropTypes.func,
  channelRequestModalOpen: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    getStore: (id) => {
      dispatch(getStoreById(id));
    },
    getStoreProduct: (id) => {
      dispatch(getStoreProductById(id));
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
  store: selectCurrentStore(),
  storeProducts: selectCurrentStoreProducts(),
  currStore: selectStore(),
  request: selectChannelRequest(),
  channelRequestModalOpen: selectChannelRequestModalOpen(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(StoreProfilePage);
