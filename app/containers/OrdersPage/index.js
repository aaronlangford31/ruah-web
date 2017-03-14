import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import _ from 'underscore';
import moment from 'moment';
import { getOrders } from './actions';
import { selectOrders } from './selectors';
import Body from '../../components/styled/Body';
import Divider from 'material-ui/Divider';
import H2 from '../../components/styled/H2';
import Menu from '../../components/partials/Menu';
import ShippedIcon from 'material-ui/svg-icons/maps/local-shipping';
import NewIcon from 'material-ui/svg-icons/av/fiber-new';
import ProcessingIcon from 'material-ui/svg-icons/action/update';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class OrdersPage extends Component {

  componentDidMount() {
    if (this.props.orders.length === 0) {
      this.props.getOrders();
    }
  }

  getOrderPhase(phase) {
    switch (phase) {
      case 0:
        return (<div><p>New</p><NewIcon /></div>);
      case 1:
        return (<div><p>Processing</p><ProcessingIcon /></div>);
      case 2:
        return (<div><p>Shipped</p><ShippedIcon /></div>);
      default:
        return 'Error';
    }
  }

  renderOrders = () => {
    const { orders } = this.props;
    return _.map(orders, (order, i) => (
      <TableRow key={i}>
        <TableRowColumn style={{ width: '15%' }}>{moment(order.OrderCreatedDate).fromNow()}</TableRowColumn>
        <TableRowColumn style={{ width: '20%' }}>
          <div>{order.BuyerName}</div>
          <div>{order.ShipAddress}</div>
          <div>{order.ShipAddress2}</div>
          <div>{order.ShipCity}, {order.ShipState} {order.ShipZip}</div>
        </TableRowColumn>
        <TableRowColumn style={{ width: '40%' }}>
          {_.map(order.OrderItems, (item) => (
            <div>
              <div>
                <strong>Product</strong> <span>{item.ProductName}</span>
              </div>
              <div>
                <strong>Quantity</strong> <span>{item.Quantity}</span>
              </div>
              <Divider />
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
        <H2>Orders</H2>
        <Body>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 3, marginRight: 24 }}>
              <Menu />
            </div>
            <div style={{ flex: 9 }}>
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

OrdersPage.propTypes = {
  orders: PropTypes.array,
  getOrders: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    getOrders: () => {
      dispatch(getOrders());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  orders: selectOrders(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
