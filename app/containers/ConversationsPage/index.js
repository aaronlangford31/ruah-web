import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import moment from 'moment';
import {
  getConversations,
  getConversation,
} from './actions';
import {
  selectLoading,
  selectStores,
  selectConversations,
  selectUnfulfilledOrders,
  selectOrders,
  selectConversationId,
} from './selectors';
import { selectStore } from '../App/selectors';
import Body from '../../components/styled/Body';
import Sidebar from '../../components/partials/Sidebar';
import Conversation from './Conversation';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import { List, ListItem } from 'material-ui/List';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import ShippedIcon from 'material-ui/svg-icons/maps/local-shipping';
import NewIcon from 'material-ui/svg-icons/av/new-releases';
import MoneyIcon from 'material-ui/svg-icons/editor/attach-money';
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
    const convs = _.map(this.props.conversations, (item) =>
      <ListItem
        key={item.StoreId}
        leftAvatar={<Avatar src={this.props.stores[item.StoreId] && this.props.stores[item.StoreId].ProfilePicUri} />}
        primaryText={
          <div>
            <strong>{this.props.stores[item.StoreId] && this.props.stores[item.StoreId].Name}</strong> <span>{item.StoreId}</span>
            {this.props.currStore.BuysFrom && this.props.currStore.BuysFrom.find((a) => a === item.StoreId) && <MoneyIcon color={'#04BFBF'} /> }
          </div>
        }
        secondaryText={
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 1 }}>
              <strong>{item.Data.ConversationTop[0].Author}</strong>
              &nbsp;{item.Data.ConversationTop[0].Content}
            </div>
            <div style={{ textAlign: 'right' }}>
              {moment(item.Data.ConversationTop[0].Timestamp).fromNow()}
            </div>
          </div>
        }
        secondaryTextLines={2}
        onTouchTap={() => this.props.setConversation(item.Data.ChannelId)}
      />
    );
    return (
      <Paper style={{ overflowY: 'scroll', height: '650px' }}>
        <List>
          {convs}
        </List>
      </Paper>
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

  render() {
    return (
      <article>
        <Helmet
          title="Conversations"
          meta={[
            { name: 'description', content: 'Conversations in Ruah' },
          ]}
        />
        <Body style={{ justifyContent: 'left' }}>
          <Sidebar
            storeImageUri={this.props.currStore.ProfilePicUri}
            unfulfilledOrders={this.props.unfulfilledOrders}
            currView={window.location.pathname}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 2,
            }}
          >
            {this.props.loading && this.renderLoading()}
            {!this.props.loading && this.renderConversations()}
          </div>
          <Paper
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 3,
              padding: '5px',
            }}
          >
            { this.props.currChannelId && <Conversation stores={this.props.stores} /> }
            { !this.props.currChannelId &&
              <div style={{ margin: 'auto', color: '#616161' }}>
                No conversation selected.
              </div>
            }
          </Paper>
        </Body>
      </article>
    );
  }
}

ConversationsPage.propTypes = {
  loading: React.PropTypes.bool,
  conversations: React.PropTypes.array,
  orders: React.PropTypes.array,
  stores: React.PropTypes.object,
  getConversations: React.PropTypes.func,
  unfulfilledOrders: React.PropTypes.number,
  currStore: React.PropTypes.object,
  currChannelId: React.PropTypes.string,
  setConversation: React.PropTypes.func,
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
    setConversation: (channelId) => {
      dispatch(getConversation(channelId));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  currStore: selectStore(),
  currChannelId: selectConversationId(),
  stores: selectStores(),
  orders: selectOrders(),
  conversations: selectConversations(),
  unfulfilledOrders: selectUnfulfilledOrders(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(ConversationsPage);
