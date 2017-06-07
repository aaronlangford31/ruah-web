import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import _ from 'underscore';
import * as OrderActions from './actions';
import { selectOrders } from './selectors';
import Body from '../../components/styled/Body';
import Divider from 'material-ui/Divider';
import ShippedIcon from 'material-ui/svg-icons/maps/local-shipping';
import NewIcon from 'material-ui/svg-icons/av/new-releases';
import ProcessingIcon from 'material-ui/svg-icons/action/update';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class OrdersPage extends Component {

  static propTypes = {
    orders: PropTypes.array,
    getOrders: PropTypes.func,
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

  renderOrders = () => {
    const { orders } = this.props;
    return _.map(orders, (order, i) => (
      <TableRow key={i}>
        <TableRowColumn style={{ width: '15%' }}>{order.OrderCreatedDate.fromNow()}</TableRowColumn>
        <TableRowColumn style={{ width: '20%' }}>
          <div>{order.BuyerName}</div>
          <div>{order.ShipAddress}</div>
          <div>{order.ShipAddress2}</div>
          <div>{order.ShipCity}, {order.ShipState} {order.ShipZip}</div>
        </TableRowColumn>
        <TableRowColumn style={{ width: '40%' }}>
          {_.map(order.OrderItems, (item, j) => (
            <div key={j}>
              <div>
                <strong>Product</strong> <span>{item.ProductName}</span>
              </div>
              <div>
                <strong>Quantity</strong> <span>{item.Quantity}</span>
              </div>
              {(j < order.OrderItems.length - 1) && <Divider />}
            </div>
          ))}
        </TableRowColumn>
        <TableRowColumn style={{ width: '10%' }}>{this.getOrderPhase(order.OrderPhase)}</TableRowColumn>
        <TableRowColumn>
          <Link to={`/order/${order.OrderId}`}>
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
        <Body>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 10 }}>
              <Table selectable={false}>
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
                <TableBody displayRowCheckbox={false}>
                  {this.renderOrders()}
                </TableBody>
              </Table>
            </div>
          </div>
        </Body>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
