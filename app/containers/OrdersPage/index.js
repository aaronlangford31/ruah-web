import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import { getOrders } from './actions';
import { selectOrders } from './selectors';
import Body from '../../components/styled/Body';
import H2 from '../../components/styled/H2';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class OrdersPage extends Component {

  componentDidMount() {
    if (this.props.orders.length === 0) {
      this.props.getOrders();
    }
  }

  renderOrders = () => {
    const { orders } = this.props;
    return _.map(orders, (order, i) => (
      <TableRow key={i}>
        <TableRowColumn>{order.OrderCreatedDate}</TableRowColumn>
        <TableRowColumn>{order.OrderDetails}</TableRowColumn>
        <TableRowColumn>{order.OrderPhaseLog[0].Phase}</TableRowColumn>
        <TableRowColumn>Action!</TableRowColumn>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Date of Order</TableHeaderColumn>
                <TableHeaderColumn>Order Details</TableHeaderColumn>
                <TableHeaderColumn>Order Status</TableHeaderColumn>
                <TableHeaderColumn>Actions</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {this.renderOrders()}
            </TableBody>
          </Table>
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
  products: selectOrders(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
