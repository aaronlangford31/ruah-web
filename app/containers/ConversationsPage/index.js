import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import moment from 'moment';
import {
  getConversations,
  setView,
} from './actions';
import {
  selectLoading,
  selectStores,
  selectConversations,
  selectUnfulfilledOrders,
  selectView,
  selectOrders,
} from './selectors';
import Body from '../../components/styled/Body';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import ShippedIcon from 'material-ui/svg-icons/maps/local-shipping';
import NewIcon from 'material-ui/svg-icons/av/new-releases';
import ProcessingIcon from 'material-ui/svg-icons/action/update';

class ConversationsPage extends Component {
  constructor(props) {
    super(props);
    this.props.getConversations();
  }

  getOrderPhase(phase) {
    switch (phase) {
      case 0:
        return (
          <div style={{ textAlign: 'center' }}>
            <NewIcon color="#04BFBF" />
            <p style={{ margin: 0 }}>New</p>
          </div>
        );
      case 1:
        return (
          <div style={{ textAlign: 'center' }}>
            <ProcessingIcon color="#F7E967" />
            <p style={{ margin: 0 }}>Processing</p>
          </div>
        );
      case 2:
        return (
          <div style={{ textAlign: 'center' }}>
            <ShippedIcon color="#A9CF54" />
            <p style={{ margin: 0 }}>Shipped</p>
          </div>
        );
      default:
        return 'Error';
    }
  }

  renderLoading() {
    return (
      <Paper style={{ margin: 'auto', textAlign: 'center', width: '500px' }}>
        <CircularProgress />
      </Paper>
    );
  }

  renderConversations() {
    return _.map(this.props.conversations, (item) =>
      <Link to={`/conversation/${item.Data.ChannelId}`} key={item.StoreId} style={{ textDecoration: 'none' }}>
        <Paper style={{ display: 'flex', flexDirection: 'row', width: '750px', margin: '5px' }}>
          <img
            src={this.props.stores[item.StoreId] && this.props.stores[item.StoreId].ProfilePicUri}
            alt={this.props.stores[item.StoreId] && this.props.stores[item.StoreId].Name}
            style={{ width: '100px', height: '100px', padding: '5px' }}
          />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div>
              <strong>{this.props.stores[item.StoreId] && this.props.stores[item.StoreId].Name}</strong> <span>{item.StoreId}</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
              {item.Data.ConversationTop &&
                <div style={{ backgroundColor: '#CAFCD8', margin: '5px', flex: 1 }}>
                  <div>
                    <strong>{item.Data.ConversationTop[0].Author}</strong>
                    &nbsp;{item.Data.ConversationTop[0].Content}
                  </div>
                  <div style={{ display: 'flex' }}>
                    <span style={{ flex: 1 }} />
                    <span>{moment(item.Data.ConversationTop[0].Timestamp).fromNow()}</span>
                  </div>
                </div>
              }
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                {(item.Data.UnfulfilledOrderIds && item.Data.UnfulfilledOrderIds.length) || 0} unfulfilled orders
              </div>&nbsp;&nbsp;
              <div>Credit: ${item.Data.Credit.toFixed(2)}</div>&nbsp;&nbsp;
              <div>Debit: ${item.Data.Debit.toFixed(2)}</div>
            </div>
          </div>
        </Paper>
      </Link>
    );
  }

  renderOrders() {
    return _.map(this.props.orders, (order) =>
      <Link to={`/fulfillment/order/${order.OrderId}`} key={order.OrderId} style={{ textDecoration: 'none' }}>
        <Paper style={{ display: 'flex', flexDirection: 'row', width: '750px', margin: '5px', padding: '5px' }}>
          <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
            <div>{order.BuyerName.substring(0, 20)}{order.BuyerName.length > 20 && <span>&hellip;</span>}</div>
            <div>{order.ShipAddress}</div>
            <div>{order.ShipAddress2}</div>
            <div>{order.ShipCity}, {order.ShipState} {order.ShipZip}</div>
          </div>
          <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
            {_.map(order.OrderItems, (item, j) => (
              <div key={j}>
                <div>
                  <strong>Item</strong> <span>{item.ProductName.substring(0, 50)}{item.ProductName.length > 50 && <span>&hellip;</span>}</span>
                </div>
                <div>
                  <strong>Qty</strong> <span>{item.Quantity}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ flex: 1 }}>{this.getOrderPhase(order.OrderPhase)}</div>
          <div style={{ flex: 1 }}>{order.OrderCreatedDate.fromNow()}</div>
        </Paper>
      </Link>
    );
  }

  renderSwitch() {
    switch (this.props.view) {
      case 'Channels':
        return this.renderConversations();
      case 'Orders':
        return this.renderOrders();
      default:
        return (<div />);
    }
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
              maxWidth: '770px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}>
              <RaisedButton
                backgroundColor={this.props.view === 'Channels' ? '#04BFBF' : '#FFFFFF'}
                style={{ marginRight: '10px', color: this.props.view === 'Channels' ? '#FFFFFF' : '#000000' }}
                onTouchTap={() => this.props.setView('Channels')}
              >
                &nbsp;Channels&nbsp;
              </RaisedButton>
              <RaisedButton
                backgroundColor={this.props.view === 'Orders' ? '#04BFBF' : '#FFFFFF'}
                style={{ marginRight: '10px', color: this.props.view === 'Orders' ? '#FFFFFF' : '#000000' }}
                onTouchTap={() => this.props.setView('Orders')}
              >
                Orders {this.props.unfulfilledOrders > 0 && <span style={{ borderRadius: '20px', backgroundColor: 'red', color: '#FFFFFF', padding: '3px' }}>&nbsp;{this.props.unfulfilledOrders}&nbsp;</span>}
              </RaisedButton>
            </div>
            {this.props.loading && this.renderLoading()}
            {!this.props.loading && this.renderSwitch()}
          </div>
        </Body>
      </article>
    );
  }
}

ConversationsPage.propTypes = {
  loading: PropTypes.bool,
  conversations: PropTypes.array,
  orders: PropTypes.array,
  stores: PropTypes.object,
  view: PropTypes.string,
  setView: PropTypes.func,
  getConversations: PropTypes.func,
  unfulfilledOrders: PropTypes.number,
};

ConversationsPage.contextTypes = {
  router: PropTypes.object,
  theme: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    getConversations: () => {
      dispatch(getConversations());
    },
    setView: (view) => {
      dispatch(setView(view));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  stores: selectStores(),
  orders: selectOrders(),
  view: selectView(),
  conversations: selectConversations(),
  unfulfilledOrders: selectUnfulfilledOrders(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ConversationsPage);
