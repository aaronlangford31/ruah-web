import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import _ from 'underscore';
import moment from 'moment';
import * as OrderActions from './actions';
import { selectOrders } from './selectors';
import Body from '../../components/styled/Body';
import H2 from '../../components/styled/H2';
import Menu from '../../components/partials/Menu';
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
      case 1:
        return 'New';
      case 2:
        return 'Processing';
      case 3:
        return 'Shipped';
      default:
        return 'Error';
    }
  }

  renderOrders = () => {
    const { orders } = this.props;
    return _.map(orders, (order, i) => (
      <TableRow key={i}>
        <TableRowColumn>{moment(order.OrderCreatedDate).fromNow()}</TableRowColumn>
        <TableRowColumn>
          {order.OrderDetails || '--'}
        </TableRowColumn>
        <TableRowColumn>{this.getOrderPhase(order.OrderPhase)}</TableRowColumn>
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
                    <TableHeaderColumn>Date of Order</TableHeaderColumn>
                    <TableHeaderColumn>Order Details</TableHeaderColumn>
                    <TableHeaderColumn>Order Status</TableHeaderColumn>
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

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
