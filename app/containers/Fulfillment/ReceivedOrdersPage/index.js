import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import _ from 'underscore';
import * as OrderActions from './actions';
import { selectOrders, selectLoading } from './selectors';
import { selectStore } from '../../App/selectors';
import Body from '../../../components/styled/Body';
import Sidebar from '../../../components/partials/Sidebar';
import FulfillmentMenu from '../FulfillmentMenu';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import Divider from 'material-ui/Divider';
import ShippedIcon from 'material-ui/svg-icons/maps/local-shipping';
import NewIcon from 'material-ui/svg-icons/av/new-releases';
import ProcessingIcon from 'material-ui/svg-icons/action/update';
import UnhappyFaceIcon from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class OrdersPage extends Component {

  static propTypes = {
    orders: PropTypes.array,
    loading: PropTypes.bool,
    getOrders: PropTypes.func,
    currStore: PropTypes.object,
  };

  componentDidMount() {
    this.props.getOrders();
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
      <Paper style={{ margin: 'auto', textAlign: 'center', width: '1000px' }}>
        <CircularProgress />
      </Paper>
    );
  }

  renderOrders = () => {
    const { orders } = this.props;
    return _.map(orders, (order, i) => (
      <TableRow key={i}>
        <TableRowColumn style={{ width: '15%' }}>{order.OrderCreatedDate.fromNow()}</TableRowColumn>
        <TableRowColumn style={{ width: '20%' }}>
          <div>{order.BuyerName.substring(0, 20)}{order.BuyerName.length > 20 && <span>&hellip;</span>}</div>
          <div>{order.ShipAddress}</div>
          <div>{order.ShipAddress2}</div>
          <div>{order.ShipCity}, {order.ShipState} {order.ShipZip}</div>
        </TableRowColumn>
        <TableRowColumn style={{ width: '40%' }}>
          {_.map(order.OrderItems, (item, j) => (
            <div key={j}>
              <div>
                <strong>Item</strong> <span>{item.ProductName.substring(0, 50)}{item.ProductName.length > 50 && <span>&hellip;</span>}</span>
              </div>
              <div>
                <strong>Qty</strong> <span>{item.Quantity}</span>
              </div>
              {(j < order.OrderItems.length - 1) && <Divider />}
            </div>
          ))}
        </TableRowColumn>
        <TableRowColumn style={{ width: '10%' }}>{this.getOrderPhase(order.OrderPhase)}</TableRowColumn>
        <TableRowColumn>
          <Link to={`/fulfillment/order/${order.OrderId}`}>
            View
          </Link>
        </TableRowColumn>
      </TableRow>
    ));
  };

  render() {
    return (
      <article>
        <Helmet
          title="Orders"
          meta={[
            { name: 'description', content: 'Orders' },
          ]}
        />
        <div style={{ display: 'flex' }}>
          <Sidebar
            storeImageUri={this.props.currStore.ProfilePicUri}
            unfulfilledOrders={0}
            currView={window.location.pathname}
          />
          <FulfillmentMenu location={'/fulfillment/received'} />
          <Body style={{ width: '100%' }}>
            <Paper style={{ display: 'flex' }}>
              <div style={{ flex: 10 }}>
                <Table height={this.props.orders.length && '600px'} selectable={false}>
                  <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                    enableSelectAll={false}
                  >
                    <TableRow>
                      <TableHeaderColumn style={{ width: '15%' }}>Date of Order</TableHeaderColumn>
                      <TableHeaderColumn style={{ width: '20%' }}>Shipping To</TableHeaderColumn>
                      <TableHeaderColumn style={{ width: '40%' }}>Order Details</TableHeaderColumn>
                      <TableHeaderColumn style={{ width: '10%' }}>Order Status</TableHeaderColumn>
                      <TableHeaderColumn>Actions</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody style={{ overflowY: 'scroll', maxHeight: '650px' }} displayRowCheckbox={false}>
                    {this.renderOrders()}
                  </TableBody>
                </Table>
                {this.props.loading && this.renderLoading() }
                {!this.props.loading && this.props.orders.length === 0 &&
                  <div style={{ display: 'flex', flexDirection: 'row', padding: '5px', width: '1000px', backgroundColor: 'white' }}>
                    <span style={{ flex: 5 }} />
                    <div style={{ textAlign: 'center' }}>
                      <UnhappyFaceIcon color={'#BDBDBD'} />
                      <div>{'You haven\'t received any orders yet.'}</div>
                      <div>{'Open selling channels in the marketplace to allow more buyers to order your product.'}</div>
                    </div>
                    <span style={{ flex: 5 }} />
                  </div>
                }
              </div>
            </Paper>
          </Body>
        </div>
      </article>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getOrders: () => {
      dispatch(OrderActions.getOrders());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  orders: selectOrders(),
  loading: selectLoading(),
  currStore: selectStore(),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
