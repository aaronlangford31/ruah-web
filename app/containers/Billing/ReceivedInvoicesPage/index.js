import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'underscore';
import moment from 'moment';
import { getReceivedInvoices } from './actions';
import { selectInvoices, selectLoading } from './selectors';
import { selectStore } from '../../App/selectors';
import Body from '../../../components/styled/Body';
import Sidebar from '../../../components/partials/Sidebar';
import FulfillmentMenu from '../BillingMenu';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress/CircularProgress';
import UnhappyFaceIcon from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class ReceivedInvoicesPage extends Component {

  static propTypes = {
    invoices: PropTypes.array,
    loading: PropTypes.bool,
    getReceivedInvoices: PropTypes.func,
    currStore: PropTypes.object,
  };

  componentDidMount() {
    this.props.getReceivedInvoices();
  }

  renderLoading() {
    return (
      <Paper style={{ margin: 'auto', textAlign: 'center', width: '1000px' }}>
        <CircularProgress />
      </Paper>
    );
  }

  renderInvoices = () => {
    const { invoices } = this.props;
    return _.map(invoices, (invoice, i) => (
      <TableRow key={i}>
        <TableRowColumn style={{ width: '15%' }}>{moment(invoice.Timestamp).fromNow()}</TableRowColumn>
        <TableRowColumn style={{ width: '40%' }}>
          {_.map(invoice.Items, (item, j) => (
            <div key={j}>
              <div>
                <strong>Order ID:</strong> <span>{item}</span>
              </div>
            </div>
          ))}
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
                <Table height={this.props.invoices.length && '600px'} selectable={false}>
                  <TableHeader
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                    enableSelectAll={false}
                  >
                    <TableRow>
                      <TableHeaderColumn style={{ width: '15%' }}>Date of Invoice</TableHeaderColumn>
                      <TableHeaderColumn style={{ width: '40%' }}>Order IDs</TableHeaderColumn>
                      <TableHeaderColumn>Actions</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody style={{ overflowY: 'scroll', maxHeight: '650px' }} displayRowCheckbox={false}>
                    {this.renderInvoices()}
                  </TableBody>
                </Table>
                {this.props.loading && this.renderLoading() }
                {!this.props.loading && this.props.invoices.length === 0 &&
                  <div style={{ display: 'flex', flexDirection: 'row', padding: '5px', width: '1000px', backgroundColor: 'white' }}>
                    <span style={{ flex: 5 }} />
                    <div style={{ textAlign: 'center' }}>
                      <UnhappyFaceIcon color={'#BDBDBD'} />
                      <div>{'You haven\'t received any invoices yet.'}</div>
                      <div>{'When a seller sends you an invoice, it will show up here.'}</div>
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
    getInvoices: () => {
      dispatch(getReceivedInvoices());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  invoices: selectInvoices(),
  loading: selectLoading(),
  currStore: selectStore(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedInvoicesPage);
